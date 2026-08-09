/**
 * External dependencies.
 */
import type { ReactNode } from "react";

/**
 * Internal dependencies.
 */
import { cn } from "../../utils";
import type { ScoreBand } from "../../utils";

type Tone = "neutral" | "accent" | ScoreBand;

const TONES: Record<Tone, string> = {
  neutral: "border-line bg-surface-sunken text-ink-muted",
  accent: "border-accent-line bg-accent-soft text-accent",
  good: "border-transparent bg-good-soft text-good-strong",
  average: "border-transparent bg-average-soft text-average-strong",
  poor: "border-transparent bg-poor-soft text-poor-strong",
  unknown: "border-line bg-surface-sunken text-ink-faint",
};

export const Badge = ({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
      TONES[tone],
      className,
    )}
  >
    {children}
  </span>
);

/** A small state dot; the meaning is always carried by adjacent text too. */
export const StatusDot = ({ tone = "neutral", className }: { tone?: Tone; className?: string }) => {
  const color =
    tone === "good"
      ? "bg-good"
      : tone === "average"
        ? "bg-average"
        : tone === "poor"
          ? "bg-poor"
          : tone === "accent"
            ? "bg-accent"
            : "bg-ink-faint";

  return <span aria-hidden="true" className={cn("size-2 shrink-0 rounded-full", color, className)} />;
};
