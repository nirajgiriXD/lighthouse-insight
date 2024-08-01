"use client";

/**
 * External dependencies.
 */
import { useContext } from "react";
import { useRouter } from "next/navigation";

/**
 * Internal dependencies.
 */
import { ReportContext } from "../../contexts/reportContext";

const Report = () => {
  const { reports } = useContext(ReportContext);
  const router = useRouter();

  if (reports.single.length === 0) {
    router.replace("/single-page");
  }

  return (
    <div className="w-[100vw] h-[100vh] m-0 overflow-hidden">
      <iframe
        srcDoc={reports.single}
        title="Lighthouse Report"
        className="w-full h-full m-0"
      />
    </div>
  );
};

export default Report;
