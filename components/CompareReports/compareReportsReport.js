"use client";

/**
 * External dependencies.
 */
import { useState } from "react";
import { BarLoader } from "react-spinners";

/**
 * Internal dependencies.
 */
import CompareReportsChart from "./compareReportsChart";

const CompareReportsReport = ({ reports, urls, isLoading }) => {
  const [selectedUrlOne, setSelectedUrlOne] = useState(urls[0]);
  const [selectedUrlTwo, setSelectedUrlTwo] = useState(urls[0]);

  return (
    <div className="w-[100vw] h-[calc(100vh-3.5rem-72px)] max-w-screen-2xl mx-auto overflow-hidden my-6">
      <div className="flex flex-col h-full w-full gap-6">
        <div className="flex gap-4">
          <div className="whitespace-nowrap flex justify-center items-center border border-gray-300 px-4 rounded-md text-gray-800">
            {Object.keys(reports).length} / {urls.length}
          </div>

          <select
            onChange={(e) => setSelectedUrlOne(e.target.value)}
            value={selectedUrlOne}
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

          <select
            onChange={(e) => setSelectedUrlTwo(e.target.value)}
            value={selectedUrlTwo}
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

        {reports?.[selectedUrlOne]?.report &&
          reports?.[selectedUrlTwo]?.report && (
            <CompareReportsChart
              reportOne={reports[selectedUrlOne].report}
              reportTwo={reports[selectedUrlTwo].report}
            />
          )}
      </div>
    </div>
  );
};

export default CompareReportsReport;
