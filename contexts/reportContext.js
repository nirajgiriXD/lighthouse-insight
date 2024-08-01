"use client";

/**
 * External dependencies.
 */
import { createContext, useState } from "react";

export const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState({
    single: "",
    multiple: {},
  });

  return (
    <ReportContext.Provider
      value={{ reports, setReports, urls, setUrls, isLoading, setIsLoading }}
    >
      {children}
    </ReportContext.Provider>
  );
};
