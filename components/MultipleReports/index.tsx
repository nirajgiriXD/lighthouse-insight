"use client";

/**
 * External dependencies.
 */
import { useMemo, useState } from "react";

/**
 * Internal dependencies.
 */
import { Alert, BeamLoader, EmptyState, Progress } from "../UI";
import { RedirectNotice, ReportFrame, ViewerToolbar } from "../ReportViewer";
import { ReportSelect } from "../ReportSelect";
import { formatUrlLabel, isHtmlReport } from "../../utils";
import { useReportContext } from "../../contexts/reportContext";
import { useRequireReports } from "../../hooks";

export const MultipleReports = () => {
  const { reports, urls, isLoading } = useReportContext();
  const [chosenUrl, setChosenUrl] = useState<string | null>(null);

  const completed = Object.keys(reports.multiple).length;
  const hasData = isLoading || completed > 0;

  useRequireReports({ hasData, fallbackPath: "/multiple-pages" });

  const readyUrls = useMemo(
    () => urls.filter((url) => isHtmlReport(reports.multiple[url]?.report)),
    [reports.multiple, urls],
  );

  // Derived rather than stored: the viewer lands on the first finished page
  // and stays there until the reader picks another one.
  const selectedUrl =
    chosenUrl && readyUrls.includes(chosenUrl) ? chosenUrl : (readyUrls[0] ?? "");

  if (!hasData) {
    return <RedirectNotice fallbackPath="/multiple-pages" fallbackLabel="Start a new batch" />;
  }

  const selectedEntry = reports.multiple[selectedUrl];
  const selectedReport = selectedEntry?.report;
  const failedCount = urls.filter((url) => reports.multiple[url]?.error).length;

  return (
    <>
      <ViewerToolbar
        backHref="/multiple-pages"
        backLabel="New batch"
        title={
          <span className="truncate-url block max-w-56 sm:max-w-xs">
            {selectedUrl ? formatUrlLabel(selectedUrl) : "Batch report"}
          </span>
        }
        controls={
          <ReportSelect
            label="Report to view"
            hideLabel
            urls={urls}
            reports={reports.multiple}
            value={selectedUrl}
            onChange={setChosenUrl}
            className="min-w-0 flex-1 lg:max-w-lg"
          />
        }
        isBusy={isLoading}
        status={
          <span className="whitespace-nowrap">
            <span data-numeric>{completed}</span>
            <span aria-hidden="true"> / </span>
            <span data-numeric>{urls.length}</span>
            <span className="sr-only"> of {urls.length} audits finished</span>
            {failedCount > 0 ? (
              <span className="ml-1.5 text-poor-strong">({failedCount} failed)</span>
            ) : null}
          </span>
        }
      />

      {isLoading ? <Progress value={completed} max={urls.length} label="Batch progress" /> : null}

      {isHtmlReport(selectedReport) ? (
        <ReportFrame html={selectedReport} title={`Lighthouse report for ${selectedUrl}`} />
      ) : (
        <div className="flex flex-1 items-center justify-center overflow-auto p-6">
          <div className="w-full max-w-lg space-y-5">
            {selectedEntry?.error ? (
              <Alert tone="danger" title={`Could not audit ${formatUrlLabel(selectedUrl)}`}>
                {selectedEntry.error}
              </Alert>
            ) : (
              <>
                <EmptyState
                  title={isLoading ? "Waiting for the first report" : "No report to display"}
                  description={
                    isLoading
                      ? "Lighthouse is working through the queue. The first finished page will open here automatically."
                      : "None of the queued pages produced a report. Check the addresses and try again."
                  }
                />
                {isLoading ? <BeamLoader /> : null}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MultipleReports;
