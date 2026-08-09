"use client";

/**
 * Internal dependencies.
 */
import { AuditAside, UrlListForm } from "../AuditForm";
import { useBatchAudit } from "../../hooks";

const ASIDE_POINTS = [
  {
    title: "Reports stream in",
    body: "The viewer opens immediately and each page becomes selectable the moment its audit finishes.",
  },
  {
    title: "Three at a time",
    body: "Runs are pooled so the machine is not overloaded — which would distort the timings being measured.",
  },
  {
    title: "Failures stay visible",
    body: "A page that cannot be audited is listed with its reason instead of silently disappearing.",
  },
];

export const MultiplePages = () => {
  const { run, setUrls, isLoading } = useBatchAudit({
    type: "html",
    resultsPath: "/multiple-pages/report",
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-8">
      <UrlListForm
        title="Pages to audit"
        description="Paste every page you want measured. Each one gets its own full Lighthouse report."
        submitLabel="Run audits"
        onSubmit={(urls) => void run(urls)}
        onUrlsChange={setUrls}
        isSubmitting={isLoading}
        footnote="Larger lists take a while — the viewer fills in as results arrive."
      />

      <AuditAside heading="How the batch runs" points={ASIDE_POINTS} />
    </div>
  );
};

export default MultiplePages;
