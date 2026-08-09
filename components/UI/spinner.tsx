/**
 * Internal dependencies.
 */
import { cn } from "../../utils";

/**
 * Small inline activity indicator. Decorative by default — pair it with a
 * text status so screen readers get the message rather than a lone spinner.
 */
export const Spinner = ({ className, label }: { className?: string; label?: string }) => (
  <span className="inline-flex items-center gap-2">
    <svg
      className={cn("size-5 animate-spin text-current", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.22" strokeWidth="2.5" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
    {label ? <span className="text-sm text-ink-muted">{label}</span> : null}
  </span>
);

/**
 * The signature beam: a light sweeping across a rail. Used whenever an audit
 * is running and there is no meaningful percentage to show yet.
 */
export const BeamLoader = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "relative h-1 w-full overflow-hidden rounded-full bg-surface-sunken hairline",
      className,
    )}
  >
    <div className="absolute inset-y-0 left-0 w-1/3 animate-beam-sweep rounded-full beam-gradient" />
  </div>
);
