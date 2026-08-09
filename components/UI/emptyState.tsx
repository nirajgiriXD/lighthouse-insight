/**
 * External dependencies.
 */
import type { ReactNode } from "react";

/**
 * Internal dependencies.
 */
import { cn } from "../../utils";

export type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export const EmptyState = ({ icon, title, description, action, className }: EmptyStateProps) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center gap-4 rounded-card border border-dashed border-line " +
        "bg-surface-sunken/60 px-6 py-14 text-center",
      className,
    )}
  >
    {icon ? (
      <span className="flex size-12 items-center justify-center rounded-full border border-line bg-surface text-accent shadow-soft">
        {icon}
      </span>
    ) : null}
    <div className="max-w-md space-y-1.5">
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      {description ? <p className="text-sm text-ink-muted">{description}</p> : null}
    </div>
    {action}
  </div>
);
