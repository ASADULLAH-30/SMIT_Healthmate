import React, { createContext, useContext, useState, useEffect } from "react";

const HistoryContext = createContext();

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
};

export const HistoryProvider = ({ children }) => {
  const [reportHistory, setReportHistory] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("healthmate_report_history");
    if (savedHistory) {
      try {
        setReportHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Error loading history:", error);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("healthmate_report_history", JSON.stringify(reportHistory));
  }, [reportHistory]);

  const addReport = (report) => {
    const newReport = {
      id: Date.now(),
      fileName: report.fileName,
      fileSize: report.fileSize,
      uploadDate: new Date().toISOString(),
      analysis: report.analysis,
      prompt: report.prompt || "",
      note: report.note || "",
    };
    
    setReportHistory((prev) => [newReport, ...prev]);
    return newReport.id;
  };

  const deleteReport = (id) => {
    setReportHistory((prev) => prev.filter((report) => report.id !== id));
  };

  const clearHistory = () => {
    setReportHistory([]);
    localStorage.removeItem("healthmate_report_history");
  };

  const getReport = (id) => {
    return reportHistory.find((report) => report.id === id);
  };

  return (
    <HistoryContext.Provider
      value={{
        reportHistory,
        addReport,
        deleteReport,
        clearHistory,
        getReport,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
