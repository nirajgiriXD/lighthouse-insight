"use client";

/**
 * Internal dependencies.
 */
import useSinglePage from "./useSinglePage";
import SinglePageReport from "./singlePageReport";
import SinglePageForm from "./singlePageForm";

const SinglePage = () => {
  const { handleSubmit, errorMsg, isLoading, report } = useSinglePage();

  return report ? (
    <SinglePageReport report={report} />
  ) : (
    <SinglePageForm
      handleSubmit={handleSubmit}
      errorMsg={errorMsg}
      isLoading={isLoading}
    />
  );
};

export default SinglePage;
