/**
 * External dependencies.
 */
import { useId } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";

/**
 * Internal dependencies.
 */
import { cn } from "../../utils";

const CONTROL =
  "w-full rounded-control border border-line bg-surface text-ink shadow-soft " +
  "transition-[border-color,box-shadow,background-color] duration-200 " +
  "placeholder:text-ink-faint " +
  "hover:border-line-strong " +
  "focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15 " +
  "disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:text-ink-faint " +
  "aria-[invalid=true]:border-poor aria-[invalid=true]:ring-poor/15";

type FieldShellProps = {
  id: string;
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  trailing?: ReactNode;
  children: ReactNode;
  className?: string;
};

const FieldShell = ({
  id,
  label,
  hint,
  error,
  trailing,
  children,
  className,
}: FieldShellProps) => (
  <div className={cn("space-y-2", className)}>
    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      {trailing}
    </div>

    {children}

    {hint && !error ? (
      <p id={`${id}-hint`} className="text-xs text-ink-muted">
        {hint}
      </p>
    ) : null}

    {error ? (
      <p id={`${id}-error`} className="flex items-start gap-1.5 text-xs font-medium text-poor">
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="mt-px size-3.5">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0v-4.5ZM10 14.75a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8Z"
            clipRule="evenodd"
          />
        </svg>
        <span>{error}</span>
      </p>
    ) : null}
  </div>
);

export type InputFieldProps = Omit<ComponentPropsWithRef<"input">, "id" | "className"> & {
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  trailing?: ReactNode;
  className?: string;
  inputClassName?: string;
};

export const InputField = ({
  label,
  hint,
  error,
  trailing,
  className,
  inputClassName,
  ...props
}: InputFieldProps) => {
  const id = useId();

  return (
    <FieldShell id={id} label={label} hint={hint} error={error} trailing={trailing} className={className}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(CONTROL, "h-11 px-3.5 text-sm", inputClassName)}
        {...props}
      />
    </FieldShell>
  );
};

export type TextareaFieldProps = Omit<ComponentPropsWithRef<"textarea">, "id" | "className"> & {
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  trailing?: ReactNode;
  className?: string;
  textareaClassName?: string;
};

export const TextareaField = ({
  label,
  hint,
  error,
  trailing,
  className,
  textareaClassName,
  ...props
}: TextareaFieldProps) => {
  const id = useId();

  return (
    <FieldShell id={id} label={label} hint={hint} error={error} trailing={trailing} className={className}>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(
          CONTROL,
          "min-h-40 resize-y px-3.5 py-3 font-mono text-[0.8125rem] leading-6",
          textareaClassName,
        )}
        {...props}
      />
    </FieldShell>
  );
};

export type SelectFieldProps = Omit<ComponentPropsWithRef<"select">, "id" | "className"> & {
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  /** Renders the label for sighted users or keeps it for assistive tech only. */
  hideLabel?: boolean;
  className?: string;
  selectClassName?: string;
};

export const SelectField = ({
  label,
  hint,
  error,
  hideLabel = false,
  className,
  selectClassName,
  children,
  ...props
}: SelectFieldProps) => {
  const id = useId();

  const control = (
    <div className="relative">
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(
          CONTROL,
          "h-11 cursor-pointer appearance-none truncate py-0 pl-3.5 pr-10 text-sm",
          selectClassName,
        )}
        {...props}
      >
        {children}
      </select>
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint"
      >
        <path d="m6 8 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );

  if (hideLabel) {
    return (
      <div className={cn("space-y-2", className)}>
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        {control}
        {error ? (
          <p id={`${id}-error`} className="text-xs font-medium text-poor">
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <FieldShell id={id} label={label} hint={hint} error={error} className={className}>
      {control}
    </FieldShell>
  );
};
