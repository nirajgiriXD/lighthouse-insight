/**
 * Internal dependencies.
 */
import { Skeleton } from "../../components/UI";

export default function SiteLoading() {
  return (
    <div className="shell space-y-10 py-10 sm:py-14" aria-hidden="true">
      <div className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-2/3 max-w-md" />
        <Skeleton className="h-5 w-full max-w-xl" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-8">
        <Skeleton className="h-96 rounded-card" />
        <Skeleton className="hidden h-64 rounded-card lg:block" />
      </div>
    </div>
  );
}
