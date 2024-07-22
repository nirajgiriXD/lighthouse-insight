"use client";

/**
 * Internal dependencies.
 */
import useMultiplePages from "./useMultiplePages";
import MultiplePagesReport from "./multiplePagesReport";
import MultiplePagesForm from "./multiplePagesForm";

const MultplePages = () => {
  const { handleSubmit, isLoading, reports, showReport, urls, setUrls } =
    useMultiplePages();

  return showReport ? (
    <MultiplePagesReport reports={reports} urls={urls} />
  ) : (
    <MultiplePagesForm
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      urls={urls}
      setUrls={setUrls}
    />
  );
};

export default MultplePages;
