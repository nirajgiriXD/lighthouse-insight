/**
 * The subset of the Lighthouse JSON result this app renders. The full result
 * is far larger; typing only what is read keeps the contract honest.
 */
export type LighthouseCategoryId =
  | "performance"
  | "accessibility"
  | "best-practices"
  | "seo";

export type LighthouseCategory = {
  id: string;
  title: string;
  score: number | null;
};

export type LighthouseJsonReport = {
  requestedUrl?: string;
  finalDisplayedUrl?: string;
  fetchTime?: string;
  lighthouseVersion?: string;
  categories: Record<LighthouseCategoryId, LighthouseCategory | undefined>;
  audits?: Record<string, { title?: string; displayValue?: string; score?: number | null }>;
};

export type ReportEntry = {
  /** HTML string for viewer routes, parsed JSON for comparison routes. */
  report: string | LighthouseJsonReport | "";
  error: string;
};

export type ReportMap = Record<string, ReportEntry>;

export type ScoreBand = "good" | "average" | "poor" | "unknown";

export const CATEGORY_ORDER: LighthouseCategoryId[] = [
  "performance",
  "accessibility",
  "best-practices",
  "seo",
];

export const CATEGORY_LABELS: Record<LighthouseCategoryId, string> = {
  performance: "Performance",
  accessibility: "Accessibility",
  "best-practices": "Best Practices",
  seo: "SEO",
};

/** Lighthouse's own thresholds: 0–49 poor, 50–89 average, 90–100 good. */
export const getScoreBand = (score: number | null | undefined): ScoreBand => {
  if (typeof score !== "number" || Number.isNaN(score)) return "unknown";
  if (score >= 90) return "good";
  if (score >= 50) return "average";
  return "poor";
};

export const SCORE_BAND_LABELS: Record<ScoreBand, string> = {
  good: "Good",
  average: "Needs improvement",
  poor: "Poor",
  unknown: "Not available",
};

/** Category score as 0–100, or null when Lighthouse could not compute it. */
export const getCategoryScore = (
  report: LighthouseJsonReport | undefined,
  category: LighthouseCategoryId,
): number | null => {
  const score = report?.categories?.[category]?.score;

  return typeof score === "number" ? Math.round(score * 100) : null;
};

export const isJsonReport = (
  report: ReportEntry["report"] | undefined,
): report is LighthouseJsonReport =>
  typeof report === "object" && report !== null && "categories" in report;

export const isHtmlReport = (report: ReportEntry["report"] | undefined): report is string =>
  typeof report === "string" && report.length > 0;
