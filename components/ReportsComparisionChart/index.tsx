"use client";

/**
 * Internal dependencies.
 */
import { ButtonLink, EmptyState, PageHeader } from "../UI";
import { ComparisonPanel } from "./comparisonPanel";
import { useReportContext } from "../../contexts/reportContext";
import { useRequireReports } from "../../hooks";

export const ReportsComparisionChart = () => {
  const { reports, urls, isLoading } = useReportContext();

  const hasData = isLoading || Object.keys(reports.multiple).length > 0;

  useRequireReports({ hasData, fallbackPath: "/reports-comparision" });

  if (!hasData) {
    return (
      <EmptyState
        title="Nothing to show yet"
        description="Comparison results are held for the current session only. Taking you back to start a new run."
        action={
          <ButtonLink href="/reports-comparision" variant="secondary" size="sm">
            Start a comparison
          </ButtonLink>
        }
      />
    );
  }

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Reports comparison"
        title="Results"
        description="Two pages, four categories, one scale. Pick the pair you want to look at."
        actions={
          <ButtonLink href="/reports-comparision" variant="secondary">
            New comparison
          </ButtonLink>
        }
      />

      <ComparisonPanel urls={urls} reports={reports.multiple} isLoading={isLoading} />
    </div>
  );
};

export default ReportsComparisionChart;
