/**
 * External dependencies.
 */
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

/**
 * Internal dependencies.
 */
import { cn } from "../../utils";

type CardProps = ComponentPropsWithoutRef<"div"> & {
  as?: ElementType;
  /** Lifts the card off the canvas on hover — only for cards that are links. */
  interactive?: boolean;
};

export const Card = ({ as, className, interactive = false, ...props }: CardProps) => {
  const Component = as ?? "div";

  return (
    <Component
      className={cn(
        "rounded-card border border-line bg-surface shadow-soft",
        interactive &&
          "transition-[transform,box-shadow,border-color] duration-300 ease-out " +
            "hover:-translate-y-0.5 hover:border-accent-line hover:shadow-card",
        className,
      )}
      {...props}
    />
  );
};

export const CardHeader = ({
  title,
  description,
  actions,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "flex flex-col gap-3 border-b border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6",
      className,
    )}
  >
    <div className="min-w-0 space-y-1">
      <h2 className="text-base font-semibold tracking-tight text-ink">{title}</h2>
      {description ? <p className="text-sm text-ink-muted">{description}</p> : null}
    </div>
    {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
  </div>
);

export const CardBody = ({ className, ...props }: ComponentPropsWithoutRef<"div">) => (
  <div className={cn("px-5 py-5 sm:px-6", className)} {...props} />
);
