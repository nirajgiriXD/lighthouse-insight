"use client";

/**
 * External dependencies.
 */
import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";

/**
 * Internal dependencies.
 */
import { Alert, Badge, Button, Card, CardBody, CardHeader, TextareaField } from "../UI";
import { findInvalidLines, formatUrlLabel, parseUrlList } from "../../utils";

const EXAMPLE_URLS = ["https://example.com", "https://developer.chrome.com", "https://web.dev"];

export type UrlListFormProps = {
  title: string;
  description: string;
  submitLabel: string;
  /** Called with the parsed, de-duplicated, sorted list of valid URLs. */
  onSubmit: (urls: string[]) => void;
  /** Keeps shared context in step with what has been typed. */
  onUrlsChange: (urls: string[]) => void;
  isSubmitting?: boolean;
  footnote?: ReactNode;
};

export const UrlListForm = ({
  title,
  description,
  submitLabel,
  onSubmit,
  onUrlsChange,
  isSubmitting = false,
  footnote,
}: UrlListFormProps) => {
  const [text, setText] = useState("");
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const urls = useMemo(() => parseUrlList(text), [text]);
  const invalidLines = useMemo(() => findInvalidLines(text), [text]);

  const updateText = (value: string) => {
    setText(value);
    onUrlsChange(parseUrlList(value));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasAttemptedSubmit(true);

    if (urls.length === 0) return;

    onSubmit(urls);
  };

  const showEmptyError = hasAttemptedSubmit && urls.length === 0;

  return (
    <Card as="section" className="overflow-hidden">
      <CardHeader
        title={title}
        description={description}
        actions={
          <Button
            variant="ghost"
            size="sm"
            onClick={() => updateText(EXAMPLE_URLS.join("\n"))}
            disabled={isSubmitting}
          >
            Use an example
          </Button>
        }
      />

      <CardBody>
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <TextareaField
            label="Site URLs"
            value={text}
            onChange={(event) => updateText(event.target.value)}
            rows={10}
            spellCheck={false}
            autoCapitalize="none"
            autoCorrect="off"
            placeholder={"https://example.com\nhttps://example.com/pricing"}
            hint="One URL per line. Duplicates are removed and the list is sorted before the run."
            error={showEmptyError ? "Add at least one valid http(s) URL to start a run." : undefined}
            trailing={
              <Badge tone={urls.length > 0 ? "accent" : "neutral"}>
                <span data-numeric>{urls.length}</span>
                {urls.length === 1 ? "URL ready" : "URLs ready"}
              </Badge>
            }
          />

          {invalidLines.length > 0 ? (
            <Alert
              tone="warning"
              title={`${invalidLines.length} ${
                invalidLines.length === 1 ? "line is" : "lines are"
              } not a valid URL and will be skipped`}
            >
              <ul className="mt-1 space-y-0.5 font-mono text-xs">
                {invalidLines.slice(0, 4).map((line) => (
                  <li key={line} className="truncate-url">
                    {line}
                  </li>
                ))}
                {invalidLines.length > 4 ? <li>…and {invalidLines.length - 4} more</li> : null}
              </ul>
            </Alert>
          ) : null}

          {urls.length > 0 ? (
            <details className="group rounded-control border border-line bg-surface-sunken/60 px-4 py-3">
              <summary className="cursor-pointer list-none text-sm font-medium text-ink marker:hidden">
                <span className="inline-flex items-center gap-2">
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    aria-hidden="true"
                    className="size-4 text-ink-faint transition-transform group-open:rotate-90"
                  >
                    <path d="m8 6 4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Review the queue
                </span>
              </summary>
              <ol className="mt-3 space-y-1.5 border-t border-line pt-3">
                {urls.map((url, index) => (
                  <li key={url} className="flex items-baseline gap-3 text-xs">
                    <span data-numeric className="w-6 shrink-0 text-right text-ink-faint">
                      {index + 1}
                    </span>
                    <span className="truncate-url font-mono text-ink-muted" title={url}>
                      {formatUrlLabel(url)}
                    </span>
                  </li>
                ))}
              </ol>
            </details>
          ) : null}

          <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
            {footnote ? <p className="text-xs text-ink-muted">{footnote}</p> : <span />}

            <Button
              type="submit"
              size="lg"
              isLoading={isSubmitting}
              loadingLabel="Starting…"
              disabled={urls.length === 0}
              className="w-full sm:w-auto"
            >
              {submitLabel}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
