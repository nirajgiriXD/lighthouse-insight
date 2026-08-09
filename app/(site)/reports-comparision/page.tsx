/**
 * External dependencies.
 */
import type { Metadata } from "next";

/**
 * Internal dependencies.
 */
import { ReportsComparision } from "../../../components";
import { PageHeader } from "../../../components/UI";

export const metadata: Metadata = {
  title: "Compare Lighthouse reports",
  description:
    "Audit several pages and chart any two of them side by side across performance, accessibility, best practices and SEO.",
  alternates: { canonical: "/reports-comparision" },
  openGraph: {
    title: "Compare Lighthouse reports · Lighthouse Insight",
    description: "Chart two pages side by side across all four Lighthouse categories.",
    url: "/reports-comparision",
  },
};

export default function ReportsComparisionRoute() {
  return (
    <div className="shell space-y-10 py-10 sm:py-14">
      <PageHeader
        eyebrow="Reports comparison"
        title="Compare two pages"
        description="Audit a list of pages, then chart any two of them against each other on a single 0–100 scale."
      />

      <ReportsComparision />
    </div>
  );
}
