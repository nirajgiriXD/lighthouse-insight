/**
 * External dependencies.
 */
import type { ReactNode } from "react";

/**
 * Internal dependencies.
 */
import { Card } from "../UI";

export type AuditAsideProps = {
  heading: string;
  points: { title: string; body: ReactNode }[];
};

/**
 * The reassurance column that sits beside every audit form: what will happen,
 * how long it takes, and what the result looks like.
 */
export const AuditAside = ({ heading, points }: AuditAsideProps) => (
  <Card as="aside" className="h-fit lg:sticky lg:top-24">
    <div className="border-b border-line px-5 py-4">
      <h2 className="text-sm font-semibold tracking-tight text-ink">{heading}</h2>
    </div>

    <ul className="divide-y divide-line">
      {points.map((point) => (
        <li key={point.title} className="space-y-1.5 px-5 py-4">
          <p className="flex items-center gap-2 text-sm font-medium text-ink">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              aria-hidden="true"
              className="size-4 shrink-0 text-accent"
            >
              <path d="m4.5 10.5 3.5 3.5 7.5-8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {point.title}
          </p>
          <p className="pl-6 text-sm leading-relaxed text-ink-muted">{point.body}</p>
        </li>
      ))}
    </ul>
  </Card>
);
