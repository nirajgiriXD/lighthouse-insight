"use client";

/**
 * External dependencies.
 */
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Internal dependencies.
 */
import { isValidURL } from "../utils";
import { useReportContext } from "../contexts/reportContext";

/**
 * Runs one audit and, only once it has actually succeeded, moves to the
 * viewer. A failed run keeps the user on the form with the reason.
 */
export const useSingleAudit = () => {
  const router = useRouter();
  const { setReports } = useReportContext();
  const [isRunning, setIsRunning] = useState(false);
  /** Something wrong with the input — shown on the field itself. */
  const [validationError, setValidationError] = useState("");
  /** The run reached Lighthouse and failed — shown as an alert. */
  const [runError, setRunError] = useState("");

  const clearErrors = useCallback(() => {
    setValidationError("");
    setRunError("");
  }, []);

  const run = useCallback(
    async (url: string) => {
      const trimmed = url.trim();

      if (!isValidURL(trimmed)) {
        setRunError("");
        setValidationError("Enter a full URL including http:// or https://");
        return;
      }

      clearErrors();
      setIsRunning(true);

      try {
        const response = await fetch("/api/lighthouse", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: trimmed, type: "html" }),
        });

        if (!response.ok) {
          const reason = await response.text();

          setReports((previous) => ({ ...previous, single: "" }));
          setRunError(reason || "The audit could not be completed. Please try again.");
          return;
        }

        const data = (await response.json()) as { report: string };

        setReports((previous) => ({ ...previous, single: data.report }));
        router.push("/single-page/report");
      } catch (error) {
        setReports((previous) => ({ ...previous, single: "" }));
        setRunError(error instanceof Error ? error.message : "The audit could not be completed.");
      } finally {
        setIsRunning(false);
      }
    },
    [clearErrors, router, setReports],
  );

  return { run, isRunning, validationError, runError, clearErrors };
};
