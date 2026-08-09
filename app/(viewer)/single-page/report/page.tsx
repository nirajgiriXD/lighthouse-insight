/**
 * External dependencies.
 */
import type { Metadata } from "next";

/**
 * Internal dependencies.
 */
import { SingleReport } from "../../../../components";

export const metadata: Metadata = {
  title: "Report",
  description: "The Lighthouse report generated in this session.",
  robots: { index: false, follow: false },
};

export default function SingleReportRoute() {
  return <SingleReport />;
}
