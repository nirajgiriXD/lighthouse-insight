"use client";

/**
 * External dependencies.
 */
import { useContext } from "react";
import { useRouter } from "next/navigation";

/**
 * Internal dependencies.
 */
import { isValidURL } from "../../utils";
import { ReportContext } from "../../contexts/reportContext";

const useCompareReports = () => {
  const { reports, setReports, isLoading, setIsLoading, urls, setUrls } =
    useContext(ReportContext);

  const router = useRouter();

  const handleSubmit = async (_urls) => {
    setIsLoading(true);
    setReports((prev) => ({
      single: prev.single,
      multiple: {},
    }));

    router.push("/reports-comparision/results");

    // Create an array of promises for fetching data
    const fetchPromises = _urls.map(async (url) => {
      if (!isValidURL(url)) {
        setReports((prev) => ({
          single: prev.single,
          multiple: {
            ...prev.multiple,
            [url]: {
              report: "",
              error: "Invalid URL",
            },
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
            type: "json",
          }),
        });

        if (!response.ok) {
          const error = await response.text();
          setReports((prev) => ({
            single: prev.single,
            multiple: {
              ...prev.multiple,
              [url]: {
                report: "",
                error: error,
              },
            },
          }));
          return;
        }

        const data = await response.json();
        setReports((prev) => ({
          single: prev.single,
          multiple: {
            ...prev.multiple,
            [url]: {
              report: data.report,
              error: "",
            },
          },
        }));
      } catch (error) {
        setReports((prev) => ({
          single: prev.single,
          multiple: {
            ...prev.multiple,
            [url]: {
              report: "",
              error: error.message,
            },
          },
        }));
      }
    });

    // Wait for all fetch operations to complete
    await Promise.all(fetchPromises);

    setIsLoading(false);
  };

  return { handleSubmit, isLoading, reports, urls, setUrls };
};

export default useCompareReports;
