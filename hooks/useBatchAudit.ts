"use client";

/**
 * External dependencies.
 */
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";

/**
 * Internal dependencies.
 */
import { isValidURL } from "../utils";
import type { LighthouseJsonReport } from "../utils";
import { useReportContext } from "../contexts/reportContext";

/**
 * Concurrent Lighthouse runs compete for CPU, which skews the very timings
 * being measured. A small pool keeps a long list moving without turning the
 * numbers into noise.
 */
const CONCURRENCY = 3;

type BatchAuditOptions = {
  /** "html" for the report viewer, "json" for the comparison charts. */
  type: "html" | "json";
  /** Where to send the user while the batch runs. */
  resultsPath: Route;
};

const runWithPool = async <T,>(items: T[], limit: number, worker: (item: T) => Promise<void>) => {
  let cursor = 0;

  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const item = items[cursor++];

      if (item !== undefined) await worker(item);
    }
  });

  await Promise.all(runners);
};

/**
 * Audits a list of URLs, publishing each result to context the moment it
 * lands so the results screen fills in progressively.
 */
export const useBatchAudit = ({ type, resultsPath }: BatchAuditOptions) => {
  const router = useRouter();
  const { reports, setReports, isLoading, setIsLoading, urls, setUrls } = useReportContext();

  const recordResult = useCallback(
    (url: string, report: string | LighthouseJsonReport | "", error: string) => {
      setReports((previous) => ({
        single: previous.single,
        multiple: { ...previous.multiple, [url]: { report, error } },
      }));
    },
    [setReports],
  );

  const run = useCallback(
    async (targetUrls: string[]) => {
      if (targetUrls.length === 0) return;

      setIsLoading(true);
      setReports((previous) => ({ single: previous.single, multiple: {} }));

      router.push(resultsPath);

      await runWithPool(targetUrls, CONCURRENCY, async (url) => {
        if (!isValidURL(url)) {
          recordResult(url, "", "Invalid URL");
          return;
        }

        try {
          const response = await fetch("/api/lighthouse", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url, type }),
          });

          if (!response.ok) {
            recordResult(url, "", (await response.text()) || "The audit failed.");
            return;
          }

          const data = (await response.json()) as { report: string | LighthouseJsonReport };

          recordResult(url, data.report, "");
        } catch (error) {
          recordResult(
            url,
            "",
            error instanceof Error ? error.message : "The audit could not be completed.",
          );
        }
      });

      setIsLoading(false);
    },
    [recordResult, resultsPath, router, setIsLoading, setReports, type],
  );

  return { run, reports, isLoading, urls, setUrls };
};
