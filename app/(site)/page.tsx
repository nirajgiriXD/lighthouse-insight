/**
 * External dependencies.
 */
import Link from "next/link";
import type { Metadata } from "next";

/**
 * Internal dependencies.
 */
import { Badge, ButtonLink, Card, ScoreRing } from "../../components/UI";
import { CATEGORY_LABELS, CATEGORY_ORDER, NAV_ITEMS, getSiteUrl, siteConfig } from "../../utils";

export const metadata: Metadata = {
  // Absolute so the site-name template is not appended to a title that
  // already carries it.
  title: { absolute: `${siteConfig.name} — Lighthouse audits and score comparison` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const TOOL_ICONS = [
  <path key="single" d="M5 5h14v14H5zM9 10h6M9 14h4" />,
  <path key="multiple" d="M4 6h11M4 12h16M4 18h9M19 6h1M19 18h1" />,
  <path key="compare" d="M6 20V10m6 10V4m6 16v-7" />,
];

const STEPS = [
  {
    title: "Paste your URLs",
    body: "One address or a whole sitemap's worth, one per line. Invalid lines are flagged before you run anything.",
  },
  {
    title: "Lighthouse runs locally",
    body: "Each page is audited by the Lighthouse CLI in headless Chrome on your own machine. No data leaves it.",
  },
  {
    title: "Read and compare",
    body: "Reports stream in as they finish. Switch between pages, or chart two of them against each other.",
  },
];

/** Illustrative figures for the preview panel — not a real audit. */
const SAMPLE_SCORES = [98, 100, 92, 91];

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${getSiteUrl()}/#website`,
        url: getSiteUrl(),
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        name: siteConfig.name,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Windows, macOS, Linux",
        description: siteConfig.description,
        url: getSiteUrl(),
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero ------------------------------------------------------------ */}
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-field opacity-70" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 size-[46rem] -translate-x-1/2
            rounded-full opacity-[0.13] blur-3xl beam-gradient"
        />

        <div className="shell relative grid gap-14 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-28">
          <div className="max-w-2xl animate-rise space-y-7">
            <Badge tone="accent">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              Powered by the Lighthouse CLI
            </Badge>

            <h1 className="text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
              Audit, compare,
              <br className="hidden sm:block" /> <span className="beam-text">decide.</span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-ink-muted">
              Run Google Lighthouse across one page or an entire list, watch reports land as they
              finish, and put two pages side by side to see exactly where the difference is.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/single-page" size="lg">
                Audit a page
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  aria-hidden="true"
                  className="size-4"
                >
                  <path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </ButtonLink>
              <ButtonLink href="/reports-comparision" size="lg" variant="secondary">
                Compare two pages
              </ButtonLink>
            </div>

            <dl className="grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
              {[
                { term: "Categories", detail: "4 scored" },
                { term: "Batch size", detail: "Unlimited" },
                { term: "Your data", detail: "Stays local" },
              ].map((item) => (
                <div key={item.term} className="space-y-1">
                  <dt className="text-xs uppercase tracking-[0.1em] text-ink-faint">{item.term}</dt>
                  <dd className="text-sm font-medium text-ink">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Preview panel ------------------------------------------------ */}
          <Card className="animate-fade overflow-hidden rounded-panel shadow-float">
            <div className="flex items-center gap-2 border-b border-line bg-surface-sunken/70 px-5 py-3">
              <span aria-hidden="true" className="size-2.5 rounded-full bg-poor/60" />
              <span aria-hidden="true" className="size-2.5 rounded-full bg-average/60" />
              <span aria-hidden="true" className="size-2.5 rounded-full bg-good/60" />
              <p className="ml-2 truncate font-mono text-xs text-ink-faint">
                lighthouse-report · example.com
              </p>
            </div>

            <div className="space-y-6 px-5 py-7 sm:px-7">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {CATEGORY_ORDER.map((category, index) => (
                  <ScoreRing
                    key={category}
                    score={SAMPLE_SCORES[index] ?? null}
                    label={CATEGORY_LABELS[category]}
                    size="sm"
                  />
                ))}
              </div>

              <p className="border-t border-line pt-4 text-center text-xs text-ink-faint">
                Example output. Your own scores appear here after a run.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Tools ------------------------------------------------------------ */}
      <section aria-labelledby="tools-heading" className="shell py-16 sm:py-20">
        <div className="max-w-2xl space-y-3">
          <h2 id="tools-heading" className="text-2xl font-semibold text-ink sm:text-3xl">
            Three ways to run an audit
          </h2>
          <p className="text-base text-ink-muted">
            Same engine underneath — pick the shape that matches the question you are asking.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {NAV_ITEMS.map((item, index) => (
            <li key={item.href}>
              <Card as="article" interactive className="group h-full">
                <Link href={item.href} className="flex h-full flex-col gap-4 p-6">
                  <span className="flex size-11 items-center justify-center rounded-control border border-line bg-surface-sunken text-accent">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="size-5"
                    >
                      {TOOL_ICONS[index]}
                    </svg>
                  </span>

                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold text-ink">{item.label}</h3>
                    <p className="text-sm leading-relaxed text-ink-muted">{item.description}</p>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    Open
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      aria-hidden="true"
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      <path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works ----------------------------------------------------- */}
      <section aria-labelledby="how-heading" className="border-y border-line bg-surface-sunken/40">
        <div className="shell grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="space-y-3">
            <h2 id="how-heading" className="text-2xl font-semibold text-ink sm:text-3xl">
              How a run works
            </h2>
            <p className="text-base text-ink-muted">
              No accounts, no queues, no third-party service in the middle.
            </p>
          </div>

          <ol className="space-y-6">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-5">
                <span
                  data-numeric
                  aria-hidden="true"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-accent-line bg-surface text-sm font-semibold text-accent"
                >
                  {index + 1}
                </span>
                <div className="space-y-1 pt-1">
                  <h3 className="text-base font-semibold text-ink">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Categories ------------------------------------------------------- */}
      <section aria-labelledby="categories-heading" className="shell py-16 sm:py-20">
        <h2 id="categories-heading" className="text-2xl font-semibold text-ink sm:text-3xl">
          What every report scores
        </h2>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_ORDER.map((category) => (
            <Card key={category} className="space-y-2 p-5">
              <dt className="text-sm font-semibold text-ink">{CATEGORY_LABELS[category]}</dt>
              <dd className="text-sm leading-relaxed text-ink-muted">
                {
                  {
                    performance: "Loading speed, responsiveness and layout stability, weighted into one score.",
                    accessibility: "Automated checks for contrast, labels, roles and keyboard reachability.",
                    "best-practices": "Security, correctness and modern-web hygiene of the page as shipped.",
                    seo: "Whether crawlers can find, read and index the page as intended.",
                  }[category]
                }
              </dd>
            </Card>
          ))}
        </dl>

        <p className="mt-8 text-sm text-ink-muted">
          Scores follow Lighthouse&rsquo;s own bands: 90–100 good, 50–89 needs improvement, 0–49
          poor.
        </p>
      </section>
    </>
  );
}
