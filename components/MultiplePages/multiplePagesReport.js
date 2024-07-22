"use client";

/**
 * External dependencies.
 */
import { useState, useEffect } from "react";

const MultiplePagesReport = ({ reports, urls }) => {
  const [selectedUrl, setSelectedUrl] = useState(urls[0]);

  const handleUrlChange = (event) => {
    const newUrl = event.target.value;
    setSelectedUrl(newUrl);
  };

  useEffect(() => {}, []);

  return (
    <div className="w-[100vw] h-[calc(100vh-3.5rem-72px)]">
      <div className="flex justify-end my-4 max-w-screen-2xl">
        <select
          onChange={handleUrlChange}
          value={selectedUrl}
          className="peer h-full min-w-fit rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        >
          {urls.map((url, key) => (
            <option key={key} value={url}>
              {url}
            </option>
          ))}
        </select>
      </div>

      {reports && reports[selectedUrl] && reports[selectedUrl].report && (
        <iframe
          srcDoc={reports[selectedUrl].report}
          title="Lighthouse Report"
          className="w-full h-full"
        />
      )}
    </div>
  );
};

export default MultiplePagesReport;
