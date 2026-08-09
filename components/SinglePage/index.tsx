"use client";

/**
 * External dependencies.
 */
import { useState } from "react";
import type { FormEvent } from "react";

/**
 * Internal dependencies.
 */
import { Alert, BeamLoader, Button, Card, CardBody, CardHeader, InputField } from "../UI";
import { AuditAside } from "../AuditForm";
import { useSingleAudit } from "../../hooks";

const ASIDE_POINTS = [
  {
    title: "One page, full report",
    body: "You get the complete Lighthouse HTML report — every audit, opportunity and diagnostic.",
  },
  {
    title: "Usually under a minute",
    body: "Chrome is launched headless and the page is loaded on a simulated mobile connection.",
  },
  {
    title: "Kept on this machine",
    body: "The report is written to the local reports folder and shown straight back to you.",
  },
];

export const SinglePage = () => {
  const { run, isRunning, validationError, runError, clearErrors } = useSingleAudit();
  const [url, setUrl] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void run(url);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-8">
      <Card as="section" className="overflow-hidden">
        <CardHeader
          title="Page to audit"
          description="Enter the full address of the page you want Lighthouse to measure."
        />

        <CardBody>
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <InputField
              label="Site URL"
              type="url"
              inputMode="url"
              autoComplete="url"
              spellCheck={false}
              autoCapitalize="none"
              placeholder="https://example.com"
              value={url}
              onChange={(event) => {
                setUrl(event.target.value);
                if (validationError || runError) clearErrors();
              }}
              disabled={isRunning}
              hint="Include the protocol, for example https://example.com/pricing"
              error={validationError || undefined}
              inputClassName="font-mono"
            />

            {isRunning ? (
              <div
                role="status"
                aria-live="polite"
                className="space-y-3 rounded-control border border-line bg-surface-sunken/60 px-4 py-4"
              >
                <p className="text-sm font-medium text-ink">Running Lighthouse…</p>
                <BeamLoader />
                <p className="text-xs text-ink-muted">
                  Headless Chrome is loading the page and collecting metrics. This usually takes
                  20–60 seconds.
                </p>
              </div>
            ) : null}

            <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-ink-muted">
                The report opens full screen when the run finishes.
              </p>

              <Button
                type="submit"
                size="lg"
                isLoading={isRunning}
                loadingLabel="Auditing…"
                disabled={url.trim().length === 0}
                className="w-full sm:w-auto"
              >
                Run audit
              </Button>
            </div>
          </form>

          {!isRunning && runError ? (
            <Alert tone="danger" title="The audit did not complete" className="mt-5">
              {runError}
            </Alert>
          ) : null}
        </CardBody>
      </Card>

      <AuditAside heading="What to expect" points={ASIDE_POINTS} />
    </div>
  );
};

export default SinglePage;
