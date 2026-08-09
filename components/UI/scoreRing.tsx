/**
 * Internal dependencies.
 */
import { cn, getScoreBand, SCORE_BAND_LABELS } from "../../utils";
import type { ScoreBand } from "../../utils";

const BAND_STROKE: Record<ScoreBand, string> = {
  good: "stroke-good",
  average: "stroke-average",
  poor: "stroke-poor",
  unknown: "stroke-ink-faint",
};

const BAND_TEXT: Record<ScoreBand, string> = {
  good: "text-good-strong",
  average: "text-average-strong",
  poor: "text-poor-strong",
  unknown: "text-ink-faint",
};

const SIZES = {
  sm: { box: 56, stroke: 5, value: "text-base" },
  md: { box: 84, stroke: 6, value: "text-2xl" },
  lg: { box: 116, stroke: 8, value: "text-4xl" },
} as const;

export type ScoreRingProps = {
  /** 0–100, or null when Lighthouse could not produce a score. */
  score: number | null;
  label: string;
  size?: keyof typeof SIZES;
  className?: string;
};

/**
 * A bounded 0–100 readout drawn as an arc — the idiom Lighthouse users already
 * read. Colour repeats what the number and band label already say, so meaning
 * never rests on hue alone.
 */
export const ScoreRing = ({ score, label, size = "md", className }: ScoreRingProps) => {
  const { box, stroke, value } = SIZES[size];
  const band = getScoreBand(score);
  const radius = (box - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = typeof score === "number" ? Math.max(0, Math.min(100, score)) : 0;

  return (
    <div className={cn("flex flex-col items-center gap-2 text-center", className)}>
      <div className="relative" style={{ width: box, height: box }}>
        <svg
          width={box}
          height={box}
          viewBox={`0 0 ${box} ${box}`}
          role="img"
          aria-label={`${label}: ${
            typeof score === "number" ? `${score} out of 100` : "no score"
          }. ${SCORE_BAND_LABELS[band]}.`}
          className="-rotate-90"
        >
          <circle
            cx={box / 2}
            cy={box / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            className="stroke-line"
          />
          <circle
            cx={box / 2}
            cy={box / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (filled / 100) * circumference}
            className={cn(
              "transition-[stroke-dashoffset] duration-700 ease-out",
              BAND_STROKE[band],
            )}
          />
        </svg>
        <span
          data-numeric
          aria-hidden="true"
          className={cn(
            "absolute inset-0 flex items-center justify-center font-semibold",
            value,
            BAND_TEXT[band],
          )}
        >
          {typeof score === "number" ? score : "—"}
        </span>
      </div>

      <div className="space-y-0.5">
        <p className="text-xs font-medium text-ink">{label}</p>
        <p className={cn("text-[0.6875rem]", BAND_TEXT[band])}>{SCORE_BAND_LABELS[band]}</p>
      </div>
    </div>
  );
};
