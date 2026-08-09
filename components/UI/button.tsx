/**
 * External dependencies.
 */
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { Route } from "next";

/**
 * Internal dependencies.
 */
import { cn } from "../../utils";
import { Spinner } from "./spinner";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const BASE =
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control font-medium " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
  "disabled:pointer-events-none disabled:opacity-55 active:translate-y-px";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink shadow-soft hover:bg-accent-hover hover:shadow-card " +
    "border border-transparent",
  secondary:
    "border border-line bg-surface text-ink shadow-soft hover:border-line-strong " +
    "hover:bg-surface-raised",
  ghost: "border border-transparent text-ink-muted hover:bg-surface-sunken hover:text-ink",
  danger: "border border-transparent bg-poor text-white shadow-soft hover:opacity-90",
};

// Minimum 44px tall from `md` up, so touch targets stay comfortable.
const SIZES: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export type ButtonProps = SharedProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    isLoading?: boolean;
    loadingLabel?: string;
  };

export const Button = ({
  variant = "primary",
  size = "md",
  className,
  children,
  isLoading = false,
  loadingLabel,
  disabled,
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    type={type}
    disabled={disabled ?? isLoading}
    aria-busy={isLoading || undefined}
    className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
    {...props}
  >
    {isLoading ? (
      <>
        <Spinner className="size-4" />
        <span>{loadingLabel ?? children}</span>
      </>
    ) : (
      children
    )}
  </button>
);

export type ButtonLinkProps = SharedProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children" | "href"> & {
    href: Route | URL;
  };

export const ButtonLink = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) => (
  <Link className={cn(BASE, VARIANTS[variant], SIZES[size], className)} {...props}>
    {children}
  </Link>
);
