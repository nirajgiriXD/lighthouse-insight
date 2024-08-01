"use client";

/**
 * External dependencies.
 */
import { useState, useContext, useEffect, useRef } from "react";
import { HashLoader } from "react-spinners";
import { useRouter } from "next/navigation";

/**
 * Internal dependencies.
 */
import { ReportContext } from "../../contexts/reportContext";

const MultiplePagesReport = () => {
  const { reports, urls, isLoading } = useContext(ReportContext);
  const [selectedUrl, setSelectedUrl] = useState(urls[0]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const iframeRef = useRef(null);
  const router = useRouter();

  const handleUrlChange = (event) => {
    const newUrl = event.target.value;
    setSelectedUrl(newUrl);
  };

  if (Object.keys(reports.multiple).length === 0 && !isLoading) {
    router.replace("/multiple-pages");
  }

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.onload = () => {
        const iframeDoc =
          iframeRef.current.contentDocument ||
          iframeRef.current.contentWindow.document;

        if (iframeDoc) {
          const lhTopbar = iframeDoc.querySelector(".lh-topbar");
          const urlElement = iframeDoc.querySelector(".lh-topbar__url");

          if (urlElement) {
            urlElement.remove();
          }

          if (lhTopbar) {
            const _isDarkMode =
              window.getComputedStyle(lhTopbar).backgroundColor ===
              "rgb(0, 0, 0)";
            setIsDarkMode(_isDarkMode);
          }
        }
      };
    }
  }, [selectedUrl, reports, isLoading]);

  return (
    <div className="w-[100vw] h-[100vh]">
      {!reports?.multiple?.[selectedUrl]?.report && isLoading ? (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
          <HashLoader
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
        </div>
      ) : (
        <div className="absolute top-0 left-10 z-50 text-xs">
          <div className="flex items-center gap-2 h-[28px] xs:h-[32px]">
            {/* <p
              className={`whitespace-nowrap rounded-full ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {Object.keys(reports.multiple).length} / {urls.length}
            </p> */}

            <select
              onChange={handleUrlChange}
              value={selectedUrl}
              className={`bg-transparent rounded-md shadow-sm focus:outline-none ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {urls.map((url, key) => {
                const hasReport = reports?.multiple?.[url]?.report;
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

            {isLoading && (
              <div className="pl-2">
                <HashLoader
                  color="#36D7B7"
                  cssOverride={{
                    display: "block",
                    margin: "0 auto",
                    borderColor: "red",
                    width: "100%",
                  }}
                  size={16}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {reports?.multiple?.[selectedUrl]?.report && (
        <iframe
          srcDoc={reports.multiple[selectedUrl].report}
          title="Lighthouse Report"
          className="w-full h-full"
          ref={iframeRef}
        />
      )}
    </div>
  );
};

export default MultiplePagesReport;
