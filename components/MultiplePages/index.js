"use client";

/**
 * Internal dependencies.
 */
import useMultiplePages from "./useMultiplePages";
import MultiplePagesReport from "./multiplePagesReport";
import MultiplePagesForm from "./multiplePagesForm";

const MultplePagesForm = () => {
  const { handleSubmit, errorMsg, isLoading, report } = useMultiplePages();

  return report ? (
    <MultiplePagesReport report={report} />
  ) : (
    <MultiplePagesForm
      handleSubmit={handleSubmit}
      errorMsg={errorMsg}
      isLoading={isLoading}
    />
  );
};

export default MultplePagesForm;
