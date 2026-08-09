"use client";

/**
 * External dependencies.
 */
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

/**
 * Internal dependencies.
 */
import { Alert, BeamLoader, Card, CardBody, CardHeader, EmptyState, Progress, ScoreRing } from "../UI";
import { ReportSelect } from "../ReportSelect";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  cn,
  formatUrlLabel,
  getCategoryScore,
  shortenUrlLabel,
  isJsonReport,
} from "../../utils";
import type { LighthouseJsonReport, ReportMap } from "../../utils";

const ComparisonChart = dynamic(() => import("./chart"), {
  ssr: false,
  loading: () => (
    <div className="flex h-72 items-center justify-center sm:h-80 lg:h-96">
      <BeamLoader className="max-w-xs" />
    </div>
  ),
});

const PageScores = ({
  url,
  report,
  swatchClassName,
}: {
  url: string;
  report: LighthouseJsonReport;
  swatchClassName: string;
}) => (
  <Card>
    <div className="flex items-center gap-2.5 border-b border-line px-5 py-4">
      <span aria-hidden="true" className={cn("size-2.5 shrink-0 rounded-full", swatchClassName)} />
      <h3 className="truncate-url font-mono text-sm font-medium text-ink" title={url}>
        {shortenUrlLabel(url)}
      </h3>
    </div>
    <CardBody>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        {CATEGORY_ORDER.map((category) => (
          <ScoreRing
            key={category}
            score={getCategoryScore(report, category)}
            label={CATEGORY_LABELS[category]}
            size="sm"
          />
        ))}
      </div>
    </CardBody>
  </Card>
);

const DeltaCell = ({ from, to }: { from: number | null; to: number | null }) => {
  if (from === null || to === null) {
    return <span className="text-ink-faint">—</span>;
  }

  const delta = to - from;

  if (delta === 0) {
    return (
      <span className="text-ink-muted">
        <span aria-hidden="true">±</span>0<span className="sr-only"> no difference</span>
      </span>
    );
  }

  const isHigher = delta > 0;

  return (
    <span className={cn("font-medium", isHigher ? "text-good-strong" : "text-poor-strong")}>
      <span aria-hidden="true">{isHigher ? "▲" : "▼"}</span> {Math.abs(delta)}
      <span className="sr-only">
        {` ${Math.abs(delta) === 1 ? "point" : "points"} ${isHigher ? "higher" : "lower"}`}
      </span>
    </span>
  );
};

export type ComparisonPanelProps = {
  urls: string[];
  reports: ReportMap;
  isLoading: boolean;
};

/**
 * Everything that happens after a comparison run: pick two audited pages,
 * see their scores, the chart, and the exact numbers.
 */
export const ComparisonPanel = ({ urls, reports, isLoading }: ComparisonPanelProps) => {
  const readyUrls = useMemo(
    () => urls.filter((url) => isJsonReport(reports[url]?.report)),
    [reports, urls],
  );

  const [chosenOne, setChosenOne] = useState<string | null>(null);
  const [chosenTwo, setChosenTwo] = useState<string | null>(null);

  // Derived rather than stored, so the selectors seed themselves from the
  // first pages that finish without ever overriding an explicit choice.
  const urlOne = chosenOne && readyUrls.includes(chosenOne) ? chosenOne : (readyUrls[0] ?? "");
  const urlTwo =
    chosenTwo && readyUrls.includes(chosenTwo)
      ? chosenTwo
      : (readyUrls[1] ?? readyUrls[0] ?? "");

  const completed = Object.keys(reports).length;
  const failedCount = urls.filter((url) => reports[url]?.error).length;

  const reportOne = reports[urlOne]?.report;
  const reportTwo = reports[urlTwo]?.report;
  const hasPair = isJsonReport(reportOne) && isJsonReport(reportTwo);

  return (
    <div className="space-y-6">
      <Card as="section">
        <CardHeader
          title="Pages to compare"
          description="Every finished page stays selectable — including comparing a page with itself."
          actions={
            <span className="whitespace-nowrap text-sm text-ink-muted">
              <span data-numeric className="font-medium text-ink">
                {completed}
              </span>
              <span aria-hidden="true"> / </span>
              <span data-numeric>{urls.length}</span> audited
            </span>
          }
        />

        <CardBody className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <ReportSelect
              label="First page"
              urls={urls}
              reports={reports}
              value={urlOne}
              onChange={setChosenOne}
            />
            <ReportSelect
              label="Second page"
              urls={urls}
              reports={reports}
              value={urlTwo}
              onChange={setChosenTwo}
            />
          </div>

          {isLoading ? (
            <div role="status" aria-live="polite" className="space-y-2">
              <Progress value={completed} max={urls.length} label="Comparison run progress" />
              <p className="text-xs text-ink-muted">
                Auditing the queue — pages become selectable as they finish.
              </p>
            </div>
          ) : null}

          {failedCount > 0 ? (
            <Alert
              tone="warning"
              title={`${failedCount} ${failedCount === 1 ? "page" : "pages"} could not be audited`}
            >
              <ul className="mt-1 space-y-1 text-xs">
                {urls
                  .filter((url) => reports[url]?.error)
                  .slice(0, 4)
                  .map((url) => (
                    <li key={url} className="truncate-url">
                      <span className="font-mono">{formatUrlLabel(url)}</span> —{" "}
                      {reports[url]?.error}
                    </li>
                  ))}
              </ul>
            </Alert>
          ) : null}
        </CardBody>
      </Card>

      {hasPair ? (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            <PageScores url={urlOne} report={reportOne} swatchClassName="bg-series-1" />
            <PageScores url={urlTwo} report={reportTwo} swatchClassName="bg-series-2" />
          </div>

          <Card as="section">
            <CardHeader
              title="Category scores"
              description="Higher is better. Bands follow Lighthouse: 90+ good, 50–89 needs improvement, below 50 poor."
            />
            <CardBody className="space-y-6">
              <ComparisonChart
                reportOne={reportOne}
                reportTwo={reportTwo}
                urlOne={urlOne}
                urlTwo={urlTwo}
              />

              <details className="group rounded-control border border-line bg-surface-sunken/50">
                <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-ink marker:hidden">
                  <span className="inline-flex items-center gap-2">
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      aria-hidden="true"
                      className="size-4 text-ink-faint transition-transform group-open:rotate-90"
                    >
                      <path d="m8 6 4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    View the numbers as a table
                  </span>
                </summary>

                <div className="overflow-x-auto border-t border-line">
                  <table className="w-full min-w-120 border-collapse text-sm">
                    <caption className="sr-only">
                      Lighthouse category scores for {shortenUrlLabel(urlOne)} and{" "}
                      {shortenUrlLabel(urlTwo)}, with the difference between them.
                    </caption>
                    <thead>
                      <tr className="border-b border-line text-left">
                        <th scope="col" className="px-4 py-3 font-medium text-ink-muted">
                          Category
                        </th>
                        <th scope="col" className="px-4 py-3 font-medium text-ink-muted">
                          <span className="inline-flex items-center gap-2">
                            <span aria-hidden="true" className="size-2 rounded-full bg-series-1" />
                            <span className="truncate-url max-w-40">
                              {shortenUrlLabel(urlOne)}
                            </span>
                          </span>
                        </th>
                        <th scope="col" className="px-4 py-3 font-medium text-ink-muted">
                          <span className="inline-flex items-center gap-2">
                            <span aria-hidden="true" className="size-2 rounded-full bg-series-2" />
                            <span className="truncate-url max-w-40">
                              {shortenUrlLabel(urlTwo)}
                            </span>
                          </span>
                        </th>
                        <th scope="col" className="px-4 py-3 font-medium text-ink-muted">
                          Difference
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {CATEGORY_ORDER.map((category) => {
                        const scoreOne = getCategoryScore(reportOne, category);
                        const scoreTwo = getCategoryScore(reportTwo, category);

                        return (
                          <tr key={category} className="border-b border-line last:border-0">
                            <th scope="row" className="px-4 py-3 text-left font-medium text-ink">
                              {CATEGORY_LABELS[category]}
                            </th>
                            <td data-numeric className="px-4 py-3 text-ink">
                              {scoreOne ?? "—"}
                            </td>
                            <td data-numeric className="px-4 py-3 text-ink">
                              {scoreTwo ?? "—"}
                            </td>
                            <td data-numeric className="px-4 py-3">
                              <DeltaCell from={scoreOne} to={scoreTwo} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </details>
            </CardBody>
          </Card>
        </>
      ) : (
        <EmptyState
          title={isLoading ? "Waiting for the first two results" : "Nothing to compare yet"}
          description={
            isLoading
              ? "Charts appear as soon as two pages have finished auditing."
              : "No page in this run produced a score. Check the addresses and try again."
          }
        />
      )}
    </div>
  );
};
