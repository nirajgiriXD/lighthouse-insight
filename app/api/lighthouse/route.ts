/**
 * External dependencies.
 */
import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

/**
 * Internal dependencies.
 */
import { isValidURL, urlToFilename } from "../../../utils";
import type { LighthouseJsonReport } from "../../../utils";

const execFileAsync = promisify(execFile);

// Lighthouse drives a real browser; give it room, but never hang forever.
const RUN_TIMEOUT_MS = Number(process.env.LIGHTHOUSE_TIMEOUT_MS ?? 240_000);
const MAX_BUFFER = 32 * 1024 * 1024;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ReportType = "html" | "json";

const isReportType = (value: unknown): value is ReportType => value === "html" || value === "json";

// Kept as path segments rather than a module specifier: importing it by name
// would make the bundler pull the entire CLI into the server bundle.
const CLI_SEGMENTS = ["node_modules", "lighthouse", "cli", "index.js"];

let cachedCliPath: string | null = null;

/**
 * Locate the Lighthouse CLI entry point so it can be run through the current
 * Node binary. Walking up from the working directory covers hoisted installs
 * (workspaces, pnpm) and avoids depending on `lighthouse` being on PATH.
 */
const resolveLighthouseCli = (): string => {
  if (cachedCliPath) return cachedCliPath;

  let directory = process.cwd();

  while (true) {
    // The bundler cannot know this path statically; it is resolved against
    // the real filesystem at request time and must not be traced.
    const candidate = path.join(/* turbopackIgnore: true */ directory, ...CLI_SEGMENTS);

    if (existsSync(candidate)) {
      cachedCliPath = candidate;
      return candidate;
    }

    const parent = path.dirname(directory);

    if (parent === directory) break;

    directory = parent;
  }

  throw new Error(
    "The Lighthouse CLI could not be found. Run `npm install` before starting an audit.",
  );
};

/** True when the file exists and was (re)written during the current run. */
const wasWrittenBy = async (filePath: string, startedAt: number): Promise<boolean> => {
  try {
    const { mtimeMs } = await stat(filePath);

    // A second of slack: filesystem timestamps are not always fine grained.
    return mtimeMs >= startedAt - 1000;
  } catch {
    return false;
  }
};

const getLighthouseReport = async (
  url: string,
  type: ReportType,
): Promise<string | LighthouseJsonReport> => {
  const outputDirectory = path.join(process.cwd(), "reports");
  const outputPath = path.join(outputDirectory, `${urlToFilename(url)}.${type}`);

  await mkdir(outputDirectory, { recursive: true });

  const startedAt = Date.now();

  try {
    // Arguments are passed as an array — never interpolated into a shell — so
    // a hostile URL cannot escape into a command.
    await execFileAsync(
      process.execPath,
      [
        resolveLighthouseCli(),
        url,
        "--chrome-flags=--headless",
        "--output",
        type,
        `--output-path=${outputPath}`,
      ],
      { timeout: RUN_TIMEOUT_MS, maxBuffer: MAX_BUFFER, windowsHide: true },
    );
  } catch (error) {
    // The CLI can fail during teardown — most often chrome-launcher being
    // unable to remove its temp profile on Windows — long after the report
    // itself was written. Accept a report this run actually produced;
    // anything else is a genuine failure.
    if ((error as { killed?: boolean }).killed || !(await wasWrittenBy(outputPath, startedAt))) {
      throw error;
    }

    console.warn(
      `Lighthouse exited with an error after writing ${outputPath}; using the report it produced.`,
    );
  }

  const data = await readFile(outputPath, "utf-8");

  return type === "json" ? (JSON.parse(data) as LighthouseJsonReport) : data;
};

export const POST = async (request: Request): Promise<Response> => {
  let url: unknown;
  let type: unknown;

  try {
    ({ url, type } = (await request.json()) as { url?: unknown; type?: unknown });
  } catch {
    return new Response("Request body must be JSON.", { status: 400 });
  }

  if (typeof url !== "string" || !isValidURL(url)) {
    return new Response("Provide an http(s) URL to audit.", { status: 400 });
  }

  if (!isReportType(type)) {
    return new Response(`Invalid type: ${String(type)}`, { status: 400 });
  }

  try {
    const report = await getLighthouseReport(url, type);

    return Response.json({ report }, { status: 200 });
  } catch (error) {
    const cause = error as NodeJS.ErrnoException & { killed?: boolean; stderr?: string };

    console.error("Error generating Lighthouse report: ", cause);

    if (cause?.killed) {
      return new Response(
        `Lighthouse timed out after ${Math.round(RUN_TIMEOUT_MS / 1000)}s for ${url}.`,
        { status: 504 },
      );
    }

    return new Response(
      cause?.stderr?.trim().split("\n").at(-1) ?? cause?.message ?? "Something went wrong.",
      { status: 500 },
    );
  }
};
