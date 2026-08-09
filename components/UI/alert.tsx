/**
 * External dependencies.
 */
import type { ReactNode } from "react";

/**
 * Internal dependencies.
 */
import { cn } from "../../utils";

type Tone = "info" | "warning" | "danger" | "success";

const TONES: Record<Tone, string> = {
  info: "border-accent-line bg-accent-soft text-ink",
  warning: "border-average/35 bg-average-soft text-ink",
  danger: "border-poor/35 bg-poor-soft text-ink",
  success: "border-good/35 bg-good-soft text-ink",
};

const ICON_TONES: Record<Tone, string> = {
  info: "text-accent",
  warning: "text-average",
  danger: "text-poor",
  success: "text-good",
};

const ICONS: Record<Tone, ReactNode> = {
  info: <path d="M12 8h.01M11 12h1v4h1" strokeLinecap="round" strokeLinejoin="round" />,
  warning: <path d="M12 8.5v4.5M12 16.5h.01" strokeLinecap="round" />,
  danger: <path d="m9 9 6 6m0-6-6 6" strokeLinecap="round" />,
  success: <path d="m8.5 12.5 2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />,
};

export const Alert = ({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: Tone;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}) => (
  <div
    role={tone === "danger" ? "alert" : "status"}
    className={cn("flex gap-3 rounded-card border px-4 py-3.5", TONES[tone], className)}
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
      className={cn("mt-0.5 size-5 shrink-0", ICON_TONES[tone])}
    >
      <circle cx="12" cy="12" r="9" strokeOpacity="0.35" />
      {ICONS[tone]}
    </svg>
    <div className="min-w-0 space-y-1 text-sm">
      {title ? <p className="font-semibold text-ink">{title}</p> : null}
      {children ? <div className="text-ink-muted">{children}</div> : null}
    </div>
  </div>
);
