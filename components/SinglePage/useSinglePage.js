"use client";

/**
 * External dependencies.
 */
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";

/**
 * Internal dependencies.
 */
import { ReportContext } from "../../contexts/reportContext";

const useSinglePage = () => {
  const router = useRouter();
  const { reports, setReports } = useContext(ReportContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

      setReports((prev) => ({
        single: data.report,
        multiple: prev.multiple,
      }));
    } catch (e) {
      setReports((prev) => ({
        single: "",
        multiple: prev.multiple,
      }));
      setErrorMsg(e.message);
    } finally {
      setIsLoading(false);

      if (!errorMsg) {
        router.push("/single-page/report");
      }
    }
  };

  return { handleSubmit, errorMsg, isLoading, reports };
};

export default useSinglePage;
