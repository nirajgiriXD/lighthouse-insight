"use client";

/**
 * External dependencies.
 */
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";

/**
 * Reports live in memory for the session, so a direct visit or a refresh has
 * nothing to show. Send those visitors back to the form that produces the
 * data instead of rendering an empty screen.
 */
export const useRequireReports = ({
  hasData,
  fallbackPath,
}: {
  hasData: boolean;
  fallbackPath: Route;
}): boolean => {
  const router = useRouter();

  useEffect(() => {
    if (!hasData) router.replace(fallbackPath);
  }, [hasData, fallbackPath, router]);

  return hasData;
};
