"use client";

/**
 * External dependencies.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "lighthouse-insight:theme";

const THEME_CHANGE_EVENT = "lighthouse-insight:theme-change";
const DARK_QUERY = "(prefers-color-scheme: dark)";

/**
 * Runs before first paint so the document never flashes the wrong theme.
 * Kept as a string because it is injected with dangerouslySetInnerHTML.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var k=${JSON.stringify(
  THEME_STORAGE_KEY,
)};var p=localStorage.getItem(k);if(p!=="light"&&p!=="dark"&&p!=="system")p="system";var m=window.matchMedia("(prefers-color-scheme: dark)").matches;var t=p==="system"?(m?"dark":"light"):p;document.documentElement.setAttribute("data-theme",t);document.documentElement.style.colorScheme=t;}catch(e){}})();`;

const isPreference = (value: unknown): value is ThemePreference =>
  value === "light" || value === "dark" || value === "system";

/* -------------------------------------------------------------------------
 * The stored preference and the OS setting are both external stores, so they
 * are read with useSyncExternalStore rather than mirrored into state.
 * ---------------------------------------------------------------------- */

const subscribeToPreference = (onChange: () => void) => {
  window.addEventListener(THEME_CHANGE_EVENT, onChange);
  // Keeps other tabs of the app in step.
  window.addEventListener("storage", onChange);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
};

const getPreferenceSnapshot = (): ThemePreference => {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);

    return isPreference(stored) ? stored : "system";
  } catch {
    return "system";
  }
};

const subscribeToSystemTheme = (onChange: () => void) => {
  const query = window.matchMedia(DARK_QUERY);

  query.addEventListener("change", onChange);

  return () => query.removeEventListener("change", onChange);
};

const getSystemThemeSnapshot = (): ResolvedTheme =>
  window.matchMedia(DARK_QUERY).matches ? "dark" : "light";

type ThemeContextValue = {
  /** What the user chose, including "system". */
  preference: ThemePreference;
  /** What is actually painted right now. */
  theme: ResolvedTheme;
  setPreference: (preference: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // The server has no way to know either value; the inline script has already
  // painted the correct theme, so the first client render just catches up.
  const preference = useSyncExternalStore(
    subscribeToPreference,
    getPreferenceSnapshot,
    () => "system" as const,
  );

  const systemTheme = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemThemeSnapshot,
    () => "light" as const,
  );

  const theme: ResolvedTheme = preference === "system" ? systemTheme : preference;

  // Syncing the document element is exactly what an effect is for.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const setPreference = useCallback((next: ThemePreference) => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable in private modes — the theme then simply
      // stays on whatever the OS reports.
    }

    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  const value = useMemo(
    () => ({ preference, theme, setPreference }),
    [preference, theme, setPreference],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider.");
  }

  return context;
};
