"use client";

/**
 * Internal dependencies.
 */
import { RedirectNotice, ReportFrame, ViewerToolbar } from "../ReportViewer";
import { useReportContext } from "../../contexts/reportContext";
import { useRequireReports } from "../../hooks";

export const SingleReport = () => {
  const { reports } = useReportContext();
  const hasReport = reports.single.length > 0;

  useRequireReports({ hasData: hasReport, fallbackPath: "/single-page" });

  if (!hasReport) {
    return <RedirectNotice fallbackPath="/single-page" fallbackLabel="Start a new audit" />;
  }

  return (
    <>
      <ViewerToolbar
        backHref="/single-page"
        backLabel="New audit"
        title="Lighthouse report"
        status={<span>Run complete</span>}
      />
      <ReportFrame html={reports.single} title="Lighthouse report" />
    </>
  );
};

export default SingleReport;
