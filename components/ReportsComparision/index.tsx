"use client";

/**
 * Internal dependencies.
 */
import { AuditAside, UrlListForm } from "../AuditForm";
import { useBatchAudit } from "../../hooks";

const ASIDE_POINTS = [
  {
    title: "Two pages at a time",
    body: "Pick any two audited pages and their four category scores are charted against each other.",
  },
  {
    title: "Scores, not raw reports",
    body: "This run collects the JSON result, so comparisons stay fast and the numbers are exact.",
  },
  {
    title: "Change the pair freely",
    body: "Every finished page stays available in both selectors for as long as the session lasts.",
  },
];

export const ReportsComparision = () => {
  const { run, setUrls, isLoading } = useBatchAudit({
    type: "json",
    resultsPath: "/reports-comparision/results",
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-8">
      <UrlListForm
        title="Pages to compare"
        description="Add two or more pages. Every page is audited, then you choose which pair to chart."
        submitLabel="Run and compare"
        onSubmit={(urls) => void run(urls)}
        onUrlsChange={setUrls}
        isSubmitting={isLoading}
        footnote="Add at least two URLs to get a meaningful comparison."
      />

      <AuditAside heading="How comparison works" points={ASIDE_POINTS} />
    </div>
  );
};

export default ReportsComparision;
