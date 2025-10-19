import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useHistory } from "../context/HistoryContext";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  FileText, 
  X, 
  Sparkles, 
  Loader2,
  FileCheck,
  AlertCircle,
  FileImage
} from "lucide-react";

const GeminiPDF = () => {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const { theme } = useTheme();
  const { addReport } = useHistory();
  const { t } = useLanguage();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      setError("");
    } else {
      setError("Please upload a valid PDF file");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Please select a valid PDF file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload a PDF first.");
      return;
    }
    
    setLoading(true);
    setResponse("");
    setError("");
    setNote("");

    try {
      console.log("📤 Uploading PDF:", file.name);
      
      const formData = new FormData();
      formData.append("file", file);
      
      // Use default prompt if user didn't provide one
      const userPrompt = prompt.trim() || "Analyze this medical document and provide a detailed summary including key findings, diagnoses, and recommendations.";
      formData.append("prompt", userPrompt);

      console.log("📡 Sending request to backend...");
      
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/gemini/pdf`,
        {
          method: "POST",
          body: formData,
        }
      );

      console.log("📥 Response status:", res.status);
      
      const data = await res.json();
      console.log("📦 Response data:", data);
      
      if (!res.ok) {
        throw new Error(data.details || data.error || "Failed to analyze PDF");
      }
      
      if (!data.text) {
        throw new Error("No analysis returned from AI");
      }
      
      console.log("✅ PDF analysis complete!");
      setResponse(data.text);
      if (data.note) {
        setNote(data.note);
      }
      
      // Save to history
      addReport({
        fileName: file.name,
        fileSize: file.size,
        analysis: data.text,
        prompt: userPrompt,
        note: data.note || "",
      });
    } catch (err) {
      console.error("❌ PDF Analysis error:", err);
      setError(err.message || "Something went wrong. Please check your backend and try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setResponse("");
    setError("");
    setNote("");
    setPrompt("");
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full flex flex-col overflow-hidden">
        {/* Main Content Area - SCROLLABLE */}
        <div className={`flex-1 p-4 sm:p-6 overflow-y-auto ${
          theme === "light" ? "bg-gradient-to-br from-cyan-50/30 to-teal-50/30" : "bg-slate-900/50"
        }`}>
          
          {/* Upload Section - Always show when no response */}
          {!response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-6 max-w-3xl mx-auto py-4"
            >
              {/* Upload Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`w-full border-2 border-dashed rounded-3xl p-8 sm:p-12 transition-all cursor-pointer ${
                  isDragging
                    ? theme === "light"
                      ? "border-cyan-500 bg-cyan-100/50 scale-105"
                      : "border-cyan-500 bg-cyan-900/20 scale-105"
                    : file
                    ? theme === "light"
                      ? "border-teal-400 bg-teal-50/50"
                      : "border-teal-600 bg-teal-900/20"
                    : theme === "light"
                    ? "border-cyan-300 hover:border-cyan-500 hover:bg-cyan-50/50"
                    : "border-slate-700 hover:border-cyan-600 hover:bg-slate-800/50"
                }`}
                onClick={() => !file && document.getElementById("pdf-upload").click()}
              >
                <input
                  id="pdf-upload"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="flex flex-col items-center gap-4">
                  {file ? (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`p-4 rounded-2xl ${
                          theme === "light"
                            ? "bg-gradient-to-br from-teal-500 to-cyan-600"
                            : "bg-gradient-to-br from-teal-600 to-cyan-700"
                        } shadow-lg`}
                      >
                        <FileCheck className="w-10 h-10 text-white" />
                      </motion.div>
                      <div className="text-center">
                        <p className={`font-bold text-lg mb-1 ${
                          theme === "light" ? "text-gray-900" : "text-gray-100"
                        }`}>
                          {file.name}
                        </p>
                        <p className={`text-sm ${
                          theme === "light" ? "text-gray-600" : "text-gray-400"
                        }`}>
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          clearFile();
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                          theme === "light"
                            ? "bg-red-100 text-red-600 hover:bg-red-200"
                            : "bg-red-900/30 text-red-400 hover:bg-red-900/50"
                        }`}
                      >
                        <X className="w-4 h-4" />
                        Remove File
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.div
                        animate={isDragging ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                        className={`p-6 rounded-2xl ${
                          theme === "light"
                            ? "bg-gradient-to-br from-cyan-100 to-teal-100"
                            : "bg-gradient-to-br from-cyan-900/20 to-teal-900/20"
                        }`}
                      >
                        <Upload className={`w-12 h-12 ${
                          theme === "light" ? "text-cyan-600" : "text-cyan-400"
                        }`} />
                      </motion.div>
                      <div className="text-center">
                        <h3 className={`text-xl font-bold mb-2 ${
                          theme === "light" ? "text-gray-900" : "text-gray-100"
                        }`}>
                          Upload Medical Document
                        </h3>
                        <p className={`text-sm mb-4 ${
                          theme === "light" ? "text-gray-600" : "text-gray-400"
                        }`}>
                          Drag & drop your PDF here, or click to browse
                        </p>
                        <div className="flex items-center justify-center gap-4 text-xs">
                          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${
                            theme === "light" ? "bg-white border border-cyan-200" : "bg-slate-800 border border-slate-700"
                          }`}>
                            <FileText className="w-4 h-4 text-cyan-500" />
                            <span className={theme === "light" ? "text-gray-700" : "text-gray-300"}>
                              Text PDFs
                            </span>
                          </div>
                          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${
                            theme === "light" ? "bg-white border border-cyan-200" : "bg-slate-800 border border-slate-700"
                          }`}>
                            <FileImage className="w-4 h-4 text-cyan-500" />
                            <span className={theme === "light" ? "text-gray-700" : "text-gray-300"}>
                              Scanned PDFs
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Custom Prompt Section */}
              {file && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full"
                >
                  <label className={`block text-sm font-semibold mb-2 ${
                    theme === "light" ? "text-gray-700" : "text-gray-300"
                  }`}>
                    Custom Question (Optional)
                  </label>
                  <textarea
                    rows="3"
                    placeholder="e.g., What are the key findings? Summarize test results..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className={`w-full rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 transition resize-none ${
                      theme === "light"
                        ? "border border-cyan-300 bg-white focus:ring-cyan-400 text-gray-900 placeholder-gray-500"
                        : "border border-slate-700 bg-slate-800 focus:ring-cyan-500 text-gray-200 placeholder-gray-500"
                    }`}
                  />
                  <p className={`text-xs mt-2 ${
                    theme === "light" ? "text-gray-500" : "text-gray-400"
                  }`}>
                    Leave empty for automatic medical document analysis
                  </p>
                </motion.div>
              )}

              {/* Submit Button - HUGE & ALWAYS VISIBLE when file uploaded */}
              {file && !loading && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center justify-center gap-4 px-10 py-6 rounded-2xl font-black text-2xl shadow-2xl hover:shadow-3xl transition-all border-4 animate-pulse ${
                    theme === "light"
                      ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-600 text-white border-cyan-300 hover:from-cyan-600 hover:to-teal-700"
                      : "bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-700 text-white border-cyan-400 hover:from-cyan-700 hover:to-teal-800"
                  }`}
                  style={{ minHeight: '80px' }}
                >
                  <Sparkles className="w-8 h-8 animate-spin" />
                  <span className="text-2xl font-black uppercase">
                    🔬 Analyze PDF Now!
                  </span>
                  <Sparkles className="w-8 h-8 animate-spin" />
                </motion.button>
              )}
            </motion.div>
          )}

          {/* Loading State */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full gap-6"
            >
              <div className={`p-8 rounded-3xl ${
                theme === "light"
                  ? "bg-gradient-to-br from-cyan-100 to-teal-100"
                  : "bg-gradient-to-br from-cyan-900/20 to-teal-900/20"
              } shadow-xl`}>
                <Loader2 className={`w-16 h-16 animate-spin ${
                  theme === "light" ? "text-cyan-600" : "text-cyan-400"
                }`} />
              </div>
              <div className="text-center">
                <h3 className={`text-2xl font-bold mb-2 ${
                  theme === "light" ? "text-gray-900" : "text-gray-100"
                }`}>
                  Analyzing Document...
                </h3>
                <p className={`text-sm ${
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }`}>
                  Gemini 2.0 is processing your medical document
                </p>
              </div>
            </motion.div>
          )}

          {/* Error Display */}
          <AnimatePresence>
            {error && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mt-4 p-4 rounded-xl border flex items-start gap-3 ${
                  theme === "light"
                    ? "bg-red-50 border-red-200"
                    : "bg-red-900/20 border-red-800"
                }`}
              >
                <AlertCircle className={`w-5 h-5 shrink-0 mt-0.5 ${
                  theme === "light" ? "text-red-600" : "text-red-400"
                }`} />
                <div>
                  <p className={`text-sm font-semibold mb-1 ${
                    theme === "light" ? "text-red-800" : "text-red-300"
                  }`}>
                    Error
                  </p>
                  <p className={`text-sm ${
                    theme === "light" ? "text-red-700" : "text-red-400"
                  }`}>
                    {error}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setError("")}
                  className="ml-auto"
                >
                  <X className={`w-5 h-5 ${
                    theme === "light" ? "text-red-600" : "text-red-400"
                  }`} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Response Display */}
          <AnimatePresence>
            {response && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4 max-w-4xl mx-auto"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${
                      theme === "light"
                        ? "bg-gradient-to-br from-cyan-500 to-teal-600"
                        : "bg-gradient-to-br from-cyan-600 to-teal-700"
                    } shadow-lg`}>
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${
                        theme === "light" ? "text-gray-900" : "text-gray-100"
                      }`}>
                        Analysis Complete
                      </h3>
                      <p className={`text-sm ${
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }`}>
                        {file?.name}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFile}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                      theme === "light"
                        ? "bg-cyan-100 text-cyan-700 hover:bg-cyan-200"
                        : "bg-cyan-900/30 text-cyan-400 hover:bg-cyan-900/50"
                    }`}
                  >
                    New Analysis
                  </motion.button>
                </div>

                {/* Note Banner */}
                {note && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-xl text-sm font-medium flex items-center gap-2 ${
                      theme === "light"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-amber-900/20 text-amber-400 border border-amber-800"
                    }`}
                  >
                    <Sparkles className="w-4 h-4 shrink-0" />
                    {note}
                  </motion.div>
                )}

                {/* Response Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`p-6 rounded-2xl border shadow-lg ${
                    theme === "light"
                      ? "bg-white border-cyan-200"
                      : "bg-slate-800 border-slate-700"
                  }`}
                >
                  <pre className={`whitespace-pre-wrap text-sm leading-relaxed font-medium ${
                    theme === "light" ? "text-gray-900" : "text-gray-200"
                  }`}>
                    {response}
                  </pre>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default GeminiPDF;
