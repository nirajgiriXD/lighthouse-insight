import type { Route } from "next";

/**
 * Single source of truth for anything that has to agree across metadata,
 * navigation, the sitemap and structured data.
 */
export const siteConfig = {
  name: "Lighthouse Insight",
  shortName: "Insight",
  tagline: "Audit, compare, decide.",
  description:
    "Run Google Lighthouse audits on one page or hundreds, then compare performance, accessibility, best-practices and SEO scores side by side.",
  locale: "en_US",
  twitter: "@nirajgiriXD",
  repository: "https://github.com/nirajgiriXD/lighthouse-insight",
} as const;

/**
 * Absolute origin used for canonical URLs, Open Graph images and the sitemap.
 * Set NEXT_PUBLIC_SITE_URL in the deployment environment.
 */
export const getSiteUrl = (): string => {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL;

  if (!fromEnv) return "http://localhost:3000";

  return fromEnv.startsWith("http") ? fromEnv.replace(/\/$/, "") : `https://${fromEnv}`;
};

export type NavItem = {
  href: Route;
  label: string;
  description: string;
};

/** Primary navigation, also used to build the sitemap. */
export const NAV_ITEMS: NavItem[] = [
  {
    href: "/single-page",
    label: "Single page",
    description: "Run one audit and read the full Lighthouse report.",
  },
  {
    href: "/multiple-pages",
    label: "Multiple pages",
    description: "Queue a list of URLs and browse each report as it lands.",
  },
  {
    href: "/reports-comparision",
    label: "Comparison",
    description: "Chart two pages against each other, category by category.",
  },
];

/** Routes that must never be indexed: they only render transient, in-memory state. */
export const PRIVATE_ROUTES = [
  "/single-page/report",
  "/multiple-pages/report",
  "/reports-comparision/results",
  "/compare-reports",
] as const;
