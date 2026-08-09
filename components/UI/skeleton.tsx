/**
 * Internal dependencies.
 */
import { cn } from "../../utils";

export const Skeleton = ({ className }: { className?: string }) => (
  <div
    aria-hidden="true"
    className={cn("animate-pulse-soft rounded-control bg-surface-sunken", className)}
  />
);

/**
 * Placeholder that matches the shape of a full-page report viewer, so the
 * layout does not jump when the real report arrives.
 */
export const ReportSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("flex h-full w-full flex-col gap-4 p-6", className)}>
    <div className="flex flex-wrap gap-4">
      {[0, 1, 2, 3].map((index) => (
        <Skeleton key={index} className="size-24 rounded-full" />
      ))}
    </div>
    <Skeleton className="h-8 w-2/3 max-w-md" />
    <Skeleton className="h-4 w-1/2 max-w-sm" />
    <Skeleton className="min-h-40 flex-1" />
  </div>
);
