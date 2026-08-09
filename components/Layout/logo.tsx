/**
 * External dependencies.
 */
import Link from "next/link";

/**
 * Internal dependencies.
 */
import { cn, siteConfig } from "../../utils";

/**
 * The brand mark: a lamp and its beam, drawn as an expanding signal.
 */
export const LogoMark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={cn("size-8", className)}>
    <defs>
      <linearGradient id="li-beam" x1="2" y1="28" x2="30" y2="4" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--beam-a)" />
        <stop offset="0.5" stopColor="var(--beam-b)" />
        <stop offset="1" stopColor="var(--beam-c)" />
      </linearGradient>
    </defs>
    <circle cx="8.5" cy="16" r="3.75" fill="url(#li-beam)" />
    <path
      d="M15.5 9.5a9 9 0 0 1 0 13"
      stroke="url(#li-beam)"
      strokeWidth="2.6"
      strokeLinecap="round"
      opacity="0.85"
    />
    <path
      d="M21.5 5.5a15 15 0 0 1 0 21"
      stroke="url(#li-beam)"
      strokeWidth="2.6"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

export const Logo = ({ className }: { className?: string }) => (
  <Link
    href="/"
    className={cn(
      "group inline-flex items-center gap-2.5 rounded-control py-1 pr-2 transition-opacity hover:opacity-90",
      className,
    )}
    aria-label={`${siteConfig.name} — home`}
  >
    <LogoMark className="size-7 transition-transform duration-500 ease-out group-hover:scale-105" />
    <span className="font-display text-[0.9375rem] font-semibold tracking-tight text-ink">
      Lighthouse <span className="text-ink-muted">Insight</span>
    </span>
  </Link>
);
