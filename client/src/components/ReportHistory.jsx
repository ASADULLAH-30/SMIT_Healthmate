import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useHistory } from "../context/HistoryContext";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Calendar,
  Trash2,
  Eye,
  X,
  Clock,
  Download,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const ReportHistory = () => {
  const { theme } = useTheme();
  const { reportHistory, deleteReport } = useHistory();
  const { t } = useLanguage();
  const [selectedReport, setSelectedReport] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatFileSize = (bytes) => {
    return (bytes / 1024 / 1024).toFixed(2) + " MB";
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this report?")) {
      deleteReport(id);
      if (selectedReport?.id === id) {
        setSelectedReport(null);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Empty State */}
      {reportHistory.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center h-full gap-6"
        >
          <div
            className={`p-8 rounded-3xl ${
              theme === "light"
                ? "bg-gradient-to-br from-cyan-100 to-teal-100"
                : "bg-gradient-to-br from-cyan-900/20 to-teal-900/20"
            } shadow-xl`}
          >
            <Clock
              className={`w-16 h-16 ${
                theme === "light" ? "text-cyan-600" : "text-cyan-400"
              }`}
            />
          </div>
          <div className="text-center max-w-md">
            <h3
              className={`text-2xl font-bold mb-2 ${
                theme === "light" ? "text-gray-900" : "text-gray-100"
              }`}
            >
              {t("noHistory")}
            </h3>
            <p
              className={`text-sm ${
                theme === "light" ? "text-gray-600" : "text-gray-400"
              }`}
            >
              {t("uploadFirst")}
            </p>
          </div>
        </motion.div>
      )}

      {/* Timeline View */}
      {reportHistory.length > 0 && !selectedReport && (
        <div
          className={`flex-1 p-4 sm:p-6 overflow-y-auto ${
            theme === "light"
              ? "bg-gradient-to-br from-cyan-50/30 to-teal-50/30"
              : "bg-slate-900/50"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2
                className={`text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent`}
              >
                {t("historyTitle")}
              </h2>
              <p
                className={`text-sm ${
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {reportHistory.length} report{reportHistory.length !== 1 ? "s" : ""} uploaded
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative space-y-6">
              {/* Timeline Line */}
              <div
                className={`absolute left-8 top-0 bottom-0 w-0.5 ${
                  theme === "light" ? "bg-cyan-200" : "bg-cyan-900"
                }`}
              />

              {/* Timeline Items */}
              {reportHistory.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-20"
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-5 top-6 w-6 h-6 rounded-full border-4 ${
                      theme === "light"
                        ? "bg-white border-cyan-500"
                        : "bg-slate-900 border-cyan-600"
                    } shadow-lg`}
                  />

                  {/* Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    className={`p-6 rounded-2xl border cursor-pointer transition-all shadow-lg hover:shadow-xl ${
                      theme === "light"
                        ? "bg-white border-cyan-200 hover:border-cyan-400"
                        : "bg-slate-800 border-slate-700 hover:border-cyan-600"
                    }`}
                    onClick={() => setSelectedReport(report)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className={`p-2 rounded-lg ${
                              theme === "light"
                                ? "bg-gradient-to-br from-cyan-500 to-teal-600"
                                : "bg-gradient-to-br from-cyan-600 to-teal-700"
                            } shadow-md`}
                          >
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3
                              className={`text-lg font-bold truncate ${
                                theme === "light"
                                  ? "text-gray-900"
                                  : "text-gray-100"
                              }`}
                            >
                              {report.fileName}
                            </h3>
                            <p
                              className={`text-xs ${
                                theme === "light"
                                  ? "text-gray-500"
                                  : "text-gray-400"
                              }`}
                            >
                              {formatFileSize(report.fileSize)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1.5">
                            <Calendar
                              className={`w-4 h-4 ${
                                theme === "light"
                                  ? "text-cyan-600"
                                  : "text-cyan-400"
                              }`}
                            />
                            <span
                              className={
                                theme === "light"
                                  ? "text-gray-600"
                                  : "text-gray-400"
                              }
                            >
                              {formatDate(report.uploadDate)}
                            </span>
                          </div>
                          {report.note && (
                            <div
                              className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${
                                theme === "light"
                                  ? "bg-amber-50 text-amber-700"
                                  : "bg-amber-900/20 text-amber-400"
                              }`}
                            >
                              <Sparkles className="w-3 h-3" />
                              <span className="text-xs">Image Analyzed</span>
                            </div>
                          )}
                        </div>

                        {report.prompt && (
                          <p
                            className={`text-sm mt-3 italic ${
                              theme === "light"
                                ? "text-gray-600"
                                : "text-gray-400"
                            }`}
                          >
                            "{report.prompt.substring(0, 100)}
                            {report.prompt.length > 100 ? "..." : ""}"
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedReport(report);
                          }}
                          className={`p-2 rounded-lg transition-colors ${
                            theme === "light"
                              ? "bg-cyan-100 text-cyan-600 hover:bg-cyan-200"
                              : "bg-cyan-900/30 text-cyan-400 hover:bg-cyan-900/50"
                          }`}
                          title={t("viewReport")}
                        >
                          <Eye className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => handleDelete(report.id, e)}
                          className={`p-2 rounded-lg transition-colors ${
                            theme === "light"
                              ? "bg-red-100 text-red-600 hover:bg-red-200"
                              : "bg-red-900/30 text-red-400 hover:bg-red-900/50"
                          }`}
                          title={t("deleteReport")}
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Report Detail View */}
      <AnimatePresence>
        {selectedReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedReport(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden ${
                theme === "light" ? "bg-white" : "bg-slate-900"
              }`}
            >
              {/* Header */}
              <div
                className={`px-6 py-5 border-b flex items-center justify-between ${
                  theme === "light"
                    ? "bg-gradient-to-r from-cyan-50 to-teal-50 border-cyan-200"
                    : "bg-gradient-to-r from-slate-800 to-slate-900 border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-xl ${
                      theme === "light"
                        ? "bg-gradient-to-br from-cyan-500 to-teal-600"
                        : "bg-gradient-to-br from-cyan-600 to-teal-700"
                    } shadow-lg`}
                  >
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3
                      className={`text-xl font-bold ${
                        theme === "light" ? "text-gray-900" : "text-gray-100"
                      }`}
                    >
                      {selectedReport.fileName}
                    </h3>
                    <p
                      className={`text-sm ${
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      {formatDate(selectedReport.uploadDate)} •{" "}
                      {formatFileSize(selectedReport.fileSize)}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedReport(null)}
                  className={`p-2 rounded-xl transition-colors ${
                    theme === "light"
                      ? "hover:bg-gray-200 text-gray-600"
                      : "hover:bg-slate-800 text-gray-400"
                  }`}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {selectedReport.note && (
                  <div
                    className={`mb-4 p-3 rounded-xl text-sm font-medium flex items-center gap-2 ${
                      theme === "light"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-amber-900/20 text-amber-400 border border-amber-800"
                    }`}
                  >
                    <Sparkles className="w-4 h-4 shrink-0" />
                    {selectedReport.note}
                  </div>
                )}

                {selectedReport.prompt && (
                  <div className="mb-4">
                    <p
                      className={`text-sm font-semibold mb-1 ${
                        theme === "light" ? "text-gray-700" : "text-gray-300"
                      }`}
                    >
                      Custom Question:
                    </p>
                    <p
                      className={`text-sm italic ${
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      "{selectedReport.prompt}"
                    </p>
                  </div>
                )}

                <div
                  className={`p-6 rounded-2xl border ${
                    theme === "light"
                      ? "bg-cyan-50/50 border-cyan-200"
                      : "bg-slate-800 border-slate-700"
                  }`}
                >
                  <pre
                    className={`whitespace-pre-wrap text-sm leading-relaxed font-medium ${
                      theme === "light" ? "text-gray-900" : "text-gray-200"
                    }`}
                  >
                    {selectedReport.analysis}
                  </pre>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReportHistory;
