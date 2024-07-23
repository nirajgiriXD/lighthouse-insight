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
    <MultiplePagesReport reports={reports} urls={urls} isLoading={isLoading} />
  ) : (
    <MultiplePagesForm
      handleSubmit={handleSubmit}
      urls={urls}
      setUrls={setUrls}
    />
  );
};

export default MultplePages;
