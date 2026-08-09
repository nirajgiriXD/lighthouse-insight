/**
 * External dependencies.
 */
import type { ReactNode } from "react";

/**
 * Internal dependencies.
 */
import { cn } from "../../utils";

export type PageHeaderProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

/**
 * The single H1 for a tool page, with an optional eyebrow that names the
 * section. Kept identical across tools so the pages feel like one product.
 */
export const PageHeader = ({
  eyebrow,
  title,
  description,
  actions,
  className,
}: PageHeaderProps) => (
  <header className={cn("flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between", className)}>
    <div className="max-w-2xl space-y-3">
      {eyebrow ? (
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          <span aria-hidden="true" className="h-px w-6 beam-gradient" />
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-3xl font-semibold leading-[1.1] text-ink sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h1>
      {description ? (
        <p className="text-base leading-relaxed text-ink-muted">{description}</p>
      ) : null}
    </div>
    {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
  </header>
);
