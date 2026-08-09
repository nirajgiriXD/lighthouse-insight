/**
 * External dependencies.
 */
import type { Metadata } from "next";

/**
 * Internal dependencies.
 */
import { MultiplePages } from "../../../components";
import { PageHeader } from "../../../components/UI";

export const metadata: Metadata = {
  title: "Multiple page audits",
  description:
    "Queue a list of URLs and generate a full Google Lighthouse report for each one, browsing results as they finish.",
  alternates: { canonical: "/multiple-pages" },
  openGraph: {
    title: "Multiple page audits · Lighthouse Insight",
    description: "Queue a list of URLs and generate a Lighthouse report for each one.",
    url: "/multiple-pages",
  },
};

export default function MultiplePagesRoute() {
  return (
    <div className="shell space-y-10 py-10 sm:py-14">
      <PageHeader
        eyebrow="Multiple pages"
        title="Audit a list of pages"
        description="Paste as many URLs as you need. Each page gets its own report, and the viewer fills in as runs complete."
      />

      <MultiplePages />
    </div>
  );
}
