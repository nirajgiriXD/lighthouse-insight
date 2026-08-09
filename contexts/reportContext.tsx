"use client";

/**
 * External dependencies.
 */
import { createContext, useContext, useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

/**
 * Internal dependencies.
 */
import type { ReportMap } from "../utils";

export type Reports = {
  /** HTML of the most recent single-page audit. */
  single: string;
  /** Keyed by requested URL, for batch and comparison runs. */
  multiple: ReportMap;
};

type ReportContextValue = {
  reports: Reports;
  setReports: Dispatch<SetStateAction<Reports>>;
  urls: string[];
  setUrls: Dispatch<SetStateAction<string[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const ReportContext = createContext<ReportContextValue | null>(null);

export const ReportProvider = ({ children }: { children: ReactNode }) => {
  const [urls, setUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState<Reports>({
    single: "",
    multiple: {},
  });

  const value = useMemo(
    () => ({ reports, setReports, urls, setUrls, isLoading, setIsLoading }),
    [reports, urls, isLoading],
  );

  return <ReportContext.Provider value={value}>{children}</ReportContext.Provider>;
};

export const useReportContext = (): ReportContextValue => {
  const context = useContext(ReportContext);

  if (!context) {
    throw new Error("useReportContext must be used within a ReportProvider.");
  }

  return context;
};
