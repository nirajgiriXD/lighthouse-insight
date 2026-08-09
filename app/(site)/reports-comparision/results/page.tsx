/**
 * External dependencies.
 */
import type { Metadata } from "next";

/**
 * Internal dependencies.
 */
import { ReportsComparisionChart } from "../../../../components";

export const metadata: Metadata = {
  title: "Comparison results",
  description: "Lighthouse category scores for the pages audited in this session.",
  // Session-only output: there is nothing stable here for a crawler.
  robots: { index: false, follow: false },
};

export default function ReportsComparisionResultsRoute() {
  return (
    <div className="shell py-10 sm:py-14">
      <ReportsComparisionChart />
    </div>
  );
}
