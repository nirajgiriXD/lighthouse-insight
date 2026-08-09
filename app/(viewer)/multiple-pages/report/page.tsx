/**
 * External dependencies.
 */
import type { Metadata } from "next";

/**
 * Internal dependencies.
 */
import { MultipleReports } from "../../../../components";

export const metadata: Metadata = {
  title: "Reports",
  description: "The Lighthouse reports generated in this session.",
  robots: { index: false, follow: false },
};

export default function MultipleReportsRoute() {
  return <MultipleReports />;
}
