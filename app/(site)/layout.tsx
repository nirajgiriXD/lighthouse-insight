/**
 * Internal dependencies.
 */
import { SiteFooter, SiteHeader } from "../../components/Layout";

/**
 * Chrome shared by every browsable page. Report viewers live in the
 * (viewer) group instead, where the report owns the whole window.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]
          focus:rounded-control focus:bg-accent focus:px-4 focus:py-2 focus:text-sm
          focus:font-medium focus:text-accent-ink"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main" className="flex-1">
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}
