"use client";

/**
 * External dependencies.
 */
import { useState } from "react";
import { BarLoader } from "react-spinners";

const MultiplePagesReport = ({ reports, urls, isLoading }) => {
  const [selectedUrl, setSelectedUrl] = useState(urls[0]);

  const handleUrlChange = (event) => {
    const newUrl = event.target.value;
    setSelectedUrl(newUrl);
  };

  return (
    <div className="w-[100vw] h-[calc(100vh-3.5rem-72px)] max-w-screen-2xl mx-auto overflow-hidden my-6">
      <div className="flex flex-col h-full gap-6">
        <div className="flex gap-2">
          <div className="whitespace-nowrap flex justify-center items-center border border-gray-300 px-4 rounded-md text-gray-800">
            {Object.keys(reports).length} / {urls.length}
          </div>
          <select
            onChange={handleUrlChange}
            value={selectedUrl}
            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {urls.map((url, key) => {
              const hasReport = reports && reports[url] && reports[url].report;
              return (
                <option
                  key={key}
                  value={url}
                  disabled={!hasReport}
                  className={hasReport ? "text-green-600" : "text-red-600"}
                >
                  {hasReport ? "✔" : "✖"} {url}
                </option>
              );
            })}
          </select>
        </div>

        {isLoading && (
          <BarLoader
            color="#36D7B7"
            cssOverride={{
              display: "block",
              margin: "0 auto",
              borderColor: "red",
              width: "100%",
            }}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
            className="w-full"
          />
        )}

        {reports?.[selectedUrl]?.report && (
          <iframe
            srcDoc={reports[selectedUrl].report}
            title="Lighthouse Report"
            className="w-full h-full"
          />
        )}
      </div>
    </div>
  );
};

export default MultiplePagesReport;
