"use client";

/**
 * External dependencies.
 */
import { useCallback, useState } from "react";

/**
 * Internal dependencies.
 */
import { isValidURL } from "../../utils";
import type { LighthouseJsonReport, ReportMap } from "../../utils";

const CONCURRENCY = 3;

/**
 * The self-contained variant of the comparison flow: form and results live on
 * one route, with the run held in local state rather than shared context.
 */
export const useCompareReports = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState<ReportMap>({});
  const [showReport, setShowReport] = useState(false);
  const [urls, setUrls] = useState<string[]>([]);

  const recordResult = useCallback(
    (url: string, report: string | LighthouseJsonReport | "", error: string) => {
      setReports((previous) => ({ ...previous, [url]: { report, error } }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (targetUrls: string[]) => {
      if (targetUrls.length === 0) return;

      setIsLoading(true);
      setShowReport(true);
      setReports({});

      let cursor = 0;

      const auditOne = async (url: string) => {
        if (!isValidURL(url)) {
          recordResult(url, "", "Invalid URL");
          return;
        }

        try {
          const response = await fetch("/api/lighthouse", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url, type: "json" }),
          });

          if (!response.ok) {
            recordResult(url, "", (await response.text()) || "The audit failed.");
            return;
          }

          const data = (await response.json()) as { report: LighthouseJsonReport };

          recordResult(url, data.report, "");
        } catch (error) {
          recordResult(
            url,
            "",
            error instanceof Error ? error.message : "The audit could not be completed.",
          );
        }
      };

      await Promise.all(
        Array.from({ length: Math.min(CONCURRENCY, targetUrls.length) }, async () => {
          while (cursor < targetUrls.length) {
            const url = targetUrls[cursor++];

            if (url !== undefined) await auditOne(url);
          }
        }),
      );

      setIsLoading(false);
    },
    [recordResult],
  );

  return { handleSubmit, isLoading, reports, showReport, setShowReport, urls, setUrls };
};

export default useCompareReports;
