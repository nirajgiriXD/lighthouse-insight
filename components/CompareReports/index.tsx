"use client";

/**
 * Internal dependencies.
 */
import { Button, PageHeader } from "../UI";
import { UrlListForm } from "../AuditForm";
import { ComparisonPanel } from "../ReportsComparisionChart/comparisonPanel";
import useCompareReports from "./useCompareReports";

/**
 * A single-route version of the comparison tool: the form is replaced by the
 * results in place, and the run is not shared with the rest of the app.
 */
export const CompareReports = () => {
  const { handleSubmit, isLoading, reports, showReport, setShowReport, urls, setUrls } =
    useCompareReports();

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Compare reports"
        title={showReport ? "Comparison results" : "Compare reports"}
        description={
          showReport
            ? "This run stays on this page — it is not shared with the other tools."
            : "Audit a list of pages and chart any two of them against each other, all on one screen."
        }
        actions={
          showReport ? (
            <Button variant="secondary" onClick={() => setShowReport(false)} disabled={isLoading}>
              Back to the list
            </Button>
          ) : null
        }
      />

      {showReport ? (
        <ComparisonPanel urls={urls} reports={reports} isLoading={isLoading} />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-8">
          <UrlListForm
            title="Pages to compare"
            description="Add two or more pages. Results replace this form once the run starts."
            submitLabel="Run and compare"
            onSubmit={(nextUrls) => {
              setUrls(nextUrls);
              void handleSubmit(nextUrls);
            }}
            onUrlsChange={setUrls}
            isSubmitting={isLoading}
            footnote="Everything here stays on this page for the current session."
          />
        </div>
      )}
    </div>
  );
};

export default CompareReports;
