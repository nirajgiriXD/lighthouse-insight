"use client";

/**
 * External dependencies.
 */
import { useState, useRef } from "react";

const useMultiplePages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [report, setReport] = useState("");
  const reportRef = useRef(null);

  const handleSubmit = async (url) => {
    try {
      setIsLoading(true);

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
        console.log("Something went wrong.");
        return;
      }

      const data = await response.json();

      setReport(data.report);
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, errorMsg, isLoading, report, reportRef };
};

export default useMultiplePages;
