"use client";

/**
 * External dependencies.
 */
import { useEffect } from "react";

/**
 * Internal dependencies.
 */
import { Button, ButtonLink } from "../components/UI";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-dvh items-center">
      <div className="shell py-20">
        <div className="max-w-xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-poor-strong">
            Something broke
          </p>

          <h1 className="text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            This screen couldn&rsquo;t be rendered.
          </h1>

          <p className="text-base leading-relaxed text-ink-muted">
            The error has been logged to the console. Trying again is usually enough; if it keeps
            happening, start a fresh run from the home page.
          </p>

          {error.digest ? (
            <p className="font-mono text-xs text-ink-faint">Reference: {error.digest}</p>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button onClick={reset}>Try again</Button>
            <ButtonLink href="/" variant="secondary">
              Back to home
            </ButtonLink>
          </div>
        </div>
      </div>
    </main>
  );
}
