/**
 * Internal dependencies.
 */
import { ButtonLink, Spinner } from "../UI";
import type { Route } from "next";

/**
 * Shown for the moment between "this page has no report to display" and the
 * redirect landing, so a refreshed tab never looks broken.
 */
export const RedirectNotice = ({
  fallbackPath,
  fallbackLabel,
}: {
  fallbackPath: Route;
  fallbackLabel: string;
}) => (
  <div className="flex flex-1 items-center justify-center px-6 py-16">
    <div className="max-w-sm space-y-4 text-center">
      <Spinner className="mx-auto size-6 text-accent" />
      <h1 className="text-lg font-semibold text-ink">Nothing to show yet</h1>
      <p className="text-sm leading-relaxed text-ink-muted">
        Reports are held for the current session only, so a refresh or a direct visit has no data
        to display. Taking you back to start a new run.
      </p>
      <ButtonLink href={fallbackPath} variant="secondary" size="sm">
        {fallbackLabel}
      </ButtonLink>
    </div>
  </div>
);
