"use client";

/**
 * Internal dependencies.
 */
import { cn } from "../../utils";
import { useTheme } from "../../contexts/themeContext";
import type { ThemePreference } from "../../contexts/themeContext";

const OPTIONS: { value: ThemePreference; label: string; icon: React.ReactNode }[] = [
  {
    value: "light",
    label: "Light",
    icon: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6l1.4 1.4m10 10 1.4 1.4m0-12.8-1.4 1.4m-10 10-1.4 1.4" />
      </>
    ),
  },
  {
    value: "system",
    label: "System",
    icon: (
      <>
        <rect x="3" y="4.5" width="18" height="12" rx="2" />
        <path d="M9 20h6m-3-3.5V20" />
      </>
    ),
  },
  {
    value: "dark",
    label: "Dark",
    icon: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />,
  },
];

/**
 * A three-way segmented control rather than a blind toggle, so "follow the
 * system" stays reachable and the current state is always visible. Plain
 * toggle buttons keep the expected Tab behaviour of a small button group.
 */
export const ThemeToggle = ({ className }: { className?: string }) => {
  const { preference, setPreference } = useTheme();

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-line bg-surface-sunken p-0.5",
        className,
      )}
    >
      {OPTIONS.map((option) => {
        const isActive = preference === option.value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            title={`${option.label} theme`}
            onClick={() => setPreference(option.value)}
            className={cn(
              "inline-flex size-8 items-center justify-center rounded-full transition-colors duration-200",
              isActive
                ? "bg-surface text-accent shadow-soft"
                : "text-ink-faint hover:text-ink-muted",
            )}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="size-4"
            >
              {option.icon}
            </svg>
            <span className="sr-only">{option.label} theme</span>
          </button>
        );
      })}
    </div>
  );
};
