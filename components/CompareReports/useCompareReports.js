"use client";

/**
 * External dependencies.
 */
import { useState } from "react";

/**
 * Internal dependencies.
 */
import { isValidURL } from "../../utils";

const useCompareReports = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState({});
  const [showReport, setShowReport] = useState(false);
  const [urls, setUrls] = useState([]);

  const handleSubmit = async (_urls) => {
    setIsLoading(true);
    setShowReport(true);

    // Create an array of promises for fetching data
    const fetchPromises = _urls.map(async (url) => {
      if (!isValidURL(url)) {
        setReports((prev) => ({
          ...prev,
          [url]: {
            report: "",
            error: "Invalid URL",
          },
        }));
        return;
      }

      try {
        const response = await fetch("/api/lighthouse", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url,
            type: "html",
          }),
        });

        if (!response.ok) {
          const error = await response.text();
          setReports((prev) => ({
            ...prev,
            [url]: {
              report: "",
              error: error,
            },
          }));
          return;
        }

        const data = await response.json();
        setReports((prev) => ({
          ...prev,
          [url]: {
            report: data.report,
            error: "",
          },
        }));
      } catch (error) {
        setReports((prev) => ({
          ...prev,
          [url]: {
            report: "",
            error: error.message,
          },
        }));
      }
    });

    // Wait for all fetch operations to complete
    await Promise.all(fetchPromises);

    setIsLoading(false);
  };

  return { handleSubmit, isLoading, reports, showReport, urls, setUrls };
};

export default useCompareReports;
