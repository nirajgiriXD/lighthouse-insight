/**
 * External dependencies.
 */
import type { Metadata } from "next";

/**
 * Internal dependencies.
 */
import { CompareReports } from "../../../components";

export const metadata: Metadata = {
  title: "Compare reports",
  description: "Audit a list of pages and compare any two of them without leaving the page.",
  // Form and results share one route and hold no shared state, so keep this
  // variant out of the index in favour of /reports-comparision.
  robots: { index: false, follow: false },
};

export default function CompareReportsRoute() {
  return (
    <div className="shell py-10 sm:py-14">
      <CompareReports />
    </div>
  );
}
