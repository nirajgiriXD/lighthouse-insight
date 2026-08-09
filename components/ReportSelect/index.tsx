"use client";

/**
 * Internal dependencies.
 */
import { SelectField } from "../UI";
import { formatUrlLabel } from "../../utils";
import type { ReportMap } from "../../utils";

export type ReportSelectProps = {
  label: string;
  urls: string[];
  reports: ReportMap;
  value: string;
  onChange: (url: string) => void;
  hideLabel?: boolean;
  className?: string;
};

const getState = (entry: ReportMap[string] | undefined) => {
  if (entry?.report) return { prefix: "✓", suffix: "", ready: true };
  if (entry?.error) return { prefix: "✕", suffix: " — failed", ready: false };

  return { prefix: "·", suffix: " — running", ready: false };
};

/**
 * Picks one audited page out of a batch. Options that are still running or
 * failed stay listed — and disabled — so progress is legible at a glance.
 */
export const ReportSelect = ({
  label,
  urls,
  reports,
  value,
  onChange,
  hideLabel = false,
  className,
}: ReportSelectProps) => (
  <SelectField
    label={label}
    hideLabel={hideLabel}
    value={value}
    onChange={(event) => onChange(event.target.value)}
    className={className}
    selectClassName="font-mono text-xs sm:text-sm"
  >
    {urls.length === 0 ? <option value="">No pages queued</option> : null}

    {urls.map((url) => {
      const { prefix, suffix, ready } = getState(reports[url]);

      return (
        <option key={url} value={url} disabled={!ready}>
          {`${prefix} ${formatUrlLabel(url)}${suffix}`}
        </option>
      );
    })}
  </SelectField>
);

export default ReportSelect;
