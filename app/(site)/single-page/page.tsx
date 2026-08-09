/**
 * External dependencies.
 */
import type { Metadata } from "next";

/**
 * Internal dependencies.
 */
import { SinglePage } from "../../../components";
import { PageHeader } from "../../../components/UI";

export const metadata: Metadata = {
  title: "Single page audit",
  description:
    "Run a Google Lighthouse audit on one URL and read the complete report — performance, accessibility, best practices and SEO.",
  alternates: { canonical: "/single-page" },
  openGraph: {
    title: "Single page audit · Lighthouse Insight",
    description: "Run a Lighthouse audit on one URL and read the complete report.",
    url: "/single-page",
  },
};

export default function SinglePageRoute() {
  return (
    <div className="shell space-y-10 py-10 sm:py-14">
      <PageHeader
        eyebrow="Single page"
        title="Audit one page"
        description="Point Lighthouse at a single URL and get the full report back, exactly as the CLI produces it."
      />

      <SinglePage />
    </div>
  );
}
