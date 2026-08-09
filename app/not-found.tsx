/**
 * External dependencies.
 */
import Link from "next/link";
import type { Metadata } from "next";

/**
 * Internal dependencies.
 */
import { ButtonLink } from "../components/UI";
import { SiteFooter, SiteHeader } from "../components/Layout";
import { NAV_ITEMS } from "../utils";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />

      <main className="flex flex-1 items-center">
        <div className="shell py-20 sm:py-28">
          <div className="max-w-xl space-y-6">
            <p data-numeric className="text-sm font-semibold tracking-[0.2em] text-accent">
              404
            </p>

            <h1 className="text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              That page isn&rsquo;t on the map.
            </h1>

            <p className="text-base leading-relaxed text-ink-muted">
              The address you followed doesn&rsquo;t match any page here. It may have moved, or the
              link may have a typo.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/">Back to home</ButtonLink>
              <ButtonLink href="/single-page" variant="secondary">
                Audit a page
              </ButtonLink>
            </div>

            <nav aria-label="Tools" className="border-t border-line pt-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint">
                Or jump to a tool
              </h2>
              <ul className="mt-3 space-y-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-ink-muted transition-colors hover:text-accent"
                    >
                      {item.label} — {item.description}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
