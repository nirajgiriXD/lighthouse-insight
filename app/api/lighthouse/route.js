/**
 * External dependencies.
 */
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import { readFile } from "fs/promises";

const execAsync = promisify(exec);

const urlToFilename = (url) => {
  let filename = url.replace(/(^\w+:|^)\/\//, ""); // Remove protocol
  filename = filename.replace(/[\/\\:*?"<>|]/g, "."); // Replace invalid characters
  return filename;
};

const getLighthouseReport = async (url, type) => {
  if (type !== "html" && type !== "json") {
    throw new Error(`Invalid type: ${type}`);
  }

  const filename = urlToFilename(url);
  const outputPath = path.join(process.cwd(), "reports", `${filename}.${type}`);
  const command = `lighthouse ${url} --chrome-flags="--headless" --output ${type} --output-path=${outputPath}`;

  try {
    await execAsync(command);

    const data = await readFile(outputPath, "utf-8");

    if (type === "json") {
      return JSON.parse(data);
    }

    return data;
  } catch (error) {
    console.error("Error generating Lighthouse report: ", error);
    return null;
  }
};

export const POST = async (req, res) => {
  try {
    const param = await req.json();
    const type = param.type;
    const url = param.url;

    const report = await getLighthouseReport(url, type);

    if (!report) {
      return new Response("Something went wrong.", {
        status: 500,
      });
    }

    // Send the reports as the response
    return new Response(JSON.stringify({ report }), {
      status: 200,
    });
  } catch (error) {
    // Handle any errors that occurred during the process
    return new Response(error.message, {
      status: 500,
    });
  }
};
