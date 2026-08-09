/**
 * External dependencies.
 */
import Link from "next/link";

/**
 * Internal dependencies.
 */
import { NAV_ITEMS, siteConfig } from "../../utils";
import { LogoMark } from "./logo";

export const SiteFooter = () => (
  <footer className="mt-16 border-t border-line bg-surface-sunken/50">
    <div className="shell flex flex-col gap-10 py-12 lg:flex-row lg:justify-between">
      <div className="max-w-sm space-y-3">
        <div className="flex items-center gap-2.5">
          <LogoMark className="size-6" />
          <span className="font-display text-sm font-semibold tracking-tight text-ink">
            {siteConfig.name}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-ink-muted">{siteConfig.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:gap-16">
        <nav aria-label="Tools" className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint">
            Tools
          </h2>
          <ul className="space-y-2.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ink-muted transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Project" className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint">
            Project
          </h2>
          <ul className="space-y-2.5">
            <li>
              <a
                href={siteConfig.repository}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-ink-muted transition-colors hover:text-accent"
              >
                Source on GitHub
              </a>
            </li>
            <li>
              <a
                href={`${siteConfig.repository}/discussions`}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-ink-muted transition-colors hover:text-accent"
              >
                Discussions and feedback
              </a>
            </li>
            <li>
              <a
                href="https://developer.chrome.com/docs/lighthouse/overview"
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-ink-muted transition-colors hover:text-accent"
              >
                About Google Lighthouse
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div className="border-t border-line">
      <div className="shell flex flex-col gap-2 py-5 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Released under the MIT licence.
        </p>
        <p>Audits run locally with the Lighthouse CLI — nothing is sent to a third party.</p>
      </div>
    </div>
  </footer>
);
