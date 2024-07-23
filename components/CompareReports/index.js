"use client";

/**
 * Internal dependencies.
 */
import useCompareReports from "./useCompareReports";
import CompareReportsReport from "./compareReportsReport";
import CompareReportsForm from "./compareReportsForm";

const MultplePages = () => {
  const { handleSubmit, isLoading, reports, showReport, urls, setUrls } =
    useCompareReports();

  return showReport ? (
    <CompareReportsReport reports={reports} urls={urls} isLoading={isLoading} />
  ) : (
    <CompareReportsForm
      handleSubmit={handleSubmit}
      urls={urls}
      setUrls={setUrls}
    />
  );
};

export default MultplePages;
