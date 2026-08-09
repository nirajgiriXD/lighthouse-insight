"use client";

/**
 * External dependencies.
 */
import Link from "next/link";
import type { ReactNode } from "react";
import type { Route } from "next";

/**
 * Internal dependencies.
 */
import { cn } from "../../utils";
import { LogoMark } from "../Layout/logo";
import { Spinner } from "../UI";

export type ViewerToolbarProps = {
  backHref: Route;
  backLabel: string;
  title: ReactNode;
  /** Selector or other controls that belong to this viewer. */
  controls?: ReactNode;
  status?: ReactNode;
  isBusy?: boolean;
  className?: string;
};

/**
 * A slim bar above the report. It keeps a way back and the run status in
 * view while giving the report itself the rest of the window.
 */
export const ViewerToolbar = ({
  backHref,
  backLabel,
  title,
  controls,
  status,
  isBusy = false,
  className,
}: ViewerToolbarProps) => (
  <div
    className={cn(
      "z-10 shrink-0 border-b border-line bg-canvas/85 backdrop-blur-xl",
      className,
    )}
  >
    <div className="flex flex-col gap-2 px-3 py-2.5 sm:px-5 lg:flex-row lg:items-center lg:gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <Link
          href={backHref}
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-control px-2.5 text-sm
            font-medium text-ink-muted transition-colors hover:bg-surface-sunken hover:text-ink"
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden="true"
            className="size-4"
          >
            <path d="M16 10H5m4.5-4.5L5 10l4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="hidden sm:inline">{backLabel}</span>
          <span className="sm:hidden">Back</span>
        </Link>

        <span aria-hidden="true" className="hidden h-5 w-px bg-line sm:block" />

        <div className="flex min-w-0 items-center gap-2">
          <LogoMark className="hidden size-5 shrink-0 sm:block" />
          <div className="min-w-0 text-sm font-medium text-ink">{title}</div>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-3 lg:justify-end">
        {controls}

        {status || isBusy ? (
          <div
            role="status"
            aria-live="polite"
            className="flex shrink-0 items-center gap-2 text-xs text-ink-muted"
          >
            {isBusy ? <Spinner className="size-3.5 text-accent" /> : null}
            {status}
          </div>
        ) : null}
      </div>
    </div>
  </div>
);
