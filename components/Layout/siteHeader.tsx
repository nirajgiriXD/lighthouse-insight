"use client";

/**
 * External dependencies.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Internal dependencies.
 */
import { cn, NAV_ITEMS, siteConfig } from "../../utils";
import { Logo } from "./logo";
import { ThemeToggle } from "./themeToggle";

const isActiveRoute = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

const GitHubLink = ({ className }: { className?: string }) => (
  <a
    href={siteConfig.repository}
    target="_blank"
    rel="noreferrer noopener"
    className={cn(
      "inline-flex size-9 items-center justify-center rounded-full text-ink-faint " +
        "transition-colors hover:bg-surface-sunken hover:text-ink",
      className,
    )}
  >
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4.5">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
    <span className="sr-only">{siteConfig.name} on GitHub</span>
  </a>
);

export const SiteHeader = () => {
  const pathname = usePathname();
  // Storing the route the menu was opened on means a navigation closes it
  // without an effect: the panel is only open for the current path.
  const [openedOnPath, setOpenedOnPath] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const isMenuOpen = openedOnPath === pathname;
  const setIsMenuOpen = (open: boolean) => setOpenedOnPath(open ? pathname : null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setOpenedOnPath(null);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-xl">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = isActiveRoute(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative rounded-control px-3 py-2 text-sm font-medium transition-colors duration-200",
                  isActive ? "text-ink" : "text-ink-muted hover:text-ink",
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-3 -bottom-px h-0.5 rounded-full beam-gradient transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />
          <GitHubLink className="hidden sm:inline-flex" />

          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-control border border-line",
              "bg-surface text-ink shadow-soft transition-colors hover:bg-surface-raised md:hidden",
            )}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              aria-hidden="true"
              className="size-5"
            >
              {isMenuOpen ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
            <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        hidden={!isMenuOpen}
        className="border-t border-line bg-canvas md:hidden"
      >
        <nav aria-label="Primary mobile" className="shell flex flex-col gap-1 py-4">
          {NAV_ITEMS.map((item) => {
            const isActive = isActiveRoute(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex min-h-12 flex-col justify-center rounded-control px-3 py-2 transition-colors",
                  isActive ? "bg-accent-soft text-ink" : "text-ink hover:bg-surface-sunken",
                )}
              >
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-xs text-ink-muted">{item.description}</span>
              </Link>
            );
          })}

          <div className="mt-3 flex items-center justify-between border-t border-line pt-4">
            <ThemeToggle />
            <GitHubLink />
          </div>
        </nav>
      </div>
    </header>
  );
};
