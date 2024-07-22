"use client";

/**
 * External dependencies.
 */
import { useState } from "react";

const useSinglePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [report, setReport] = useState("");

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

  return { handleSubmit, errorMsg, isLoading, report };
};

export default useSinglePage;
