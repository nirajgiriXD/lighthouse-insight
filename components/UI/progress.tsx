/**
 * Internal dependencies.
 */
import { cn } from "../../utils";

export type ProgressProps = {
  value: number;
  max: number;
  label: string;
  className?: string;
};

/**
 * Determinate progress for batch runs. The caller always renders the counts as
 * text too, so this is decorative reinforcement rather than the only signal.
 */
export const Progress = ({ value, max, label, className }: ProgressProps) => {
  const safeMax = Math.max(max, 1);
  const percent = Math.round((Math.min(value, safeMax) / safeMax) * 100);

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={value}
      aria-label={label}
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken hairline", className)}
    >
      <div
        className="h-full rounded-full beam-gradient transition-[width] duration-500 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};
