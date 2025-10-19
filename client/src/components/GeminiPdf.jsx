import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const GeminiPDF = () => {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme(); // ✅ theme context

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a PDF first.");
    setLoading(true);
    setResponse("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("prompt", prompt);

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/gemini/pdf`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setResponse(data.text);
    setLoading(false);
  };

  return (
    <div
      className={`min-h-[60vh] flex items-center justify-center p-6 transition-colors duration-300 ${
        theme === "light"
          ? "bg-gradient-to-br from-blue-50 via-white to-emerald-50"
          : "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`rounded-2xl shadow-2xl w-full max-w-lg p-8 border transition-all duration-300 ${
          theme === "light"
            ? "bg-white border-blue-200"
            : "bg-slate-900 border-slate-800"
        }`}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`text-2xl font-bold mb-6 flex items-center justify-center gap-2 transition-colors ${
            theme === "light" 
              ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600" 
              : "text-blue-400"
          }`}
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            🩺
          </motion.span>{" "}
          Gemini Medical PDF Assistant
        </motion.h2>

        {/* Upload Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* File Upload */}
          <motion.label
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all ${
              theme === "light"
                ? "border-blue-300 hover:border-blue-500 bg-blue-50/50 hover:bg-blue-100/50"
                : "border-blue-600 hover:border-blue-400 bg-slate-800/50"
            }`}
          >
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
            <p
              className={`text-sm font-medium ${
                theme === "light" ? "text-gray-700" : "text-gray-300"
              }`}
            >
              {file ? (
                <span
                  className={`font-bold ${
                    theme === "light" 
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600" 
                      : "text-blue-400"
                  }`}
                >
                  {file.name}
                </span>
              ) : (
                "Click or drop a PDF file here"
              )}
            </p>
          </motion.label>

          {/* Prompt Input */}
          <textarea
            rows="3"
            placeholder="Ask about your medical report, lab results, or any PDF..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className={`w-full rounded-lg p-3 resize-none focus:outline-none focus:ring-2 transition font-medium ${
              theme === "light"
                ? "border border-blue-300 focus:ring-blue-400 bg-blue-50 text-gray-900 placeholder-gray-600"
                : "border border-slate-700 focus:ring-blue-500 bg-slate-800 text-gray-200 placeholder-gray-400"
            }`}
          />

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
            whileTap={!loading ? { scale: 0.95 } : {}}
            className={`w-full py-3 rounded-xl font-bold transition-all duration-200 shadow-md ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:shadow-lg"
            } ${
              theme === "light"
                ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white hover:from-blue-600 hover:to-emerald-600"
                : "bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:from-blue-700 hover:to-emerald-700"
            }`}
          >
            {loading ? "Analyzing your PDF..." : "Upload & Ask Gemini"}
          </motion.button>
        </motion.form>

        {/* AI Response */}
        <AnimatePresence>
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className={`mt-6 rounded-xl p-4 border max-h-80 overflow-auto transition-colors ${
                theme === "light"
                  ? "bg-blue-50 border-blue-200"
                  : "bg-slate-800 border-slate-700"
              }`}
            >
            <h3
              className={`font-bold mb-2 ${
                theme === "light" 
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600" 
                  : "text-blue-400"
              }`}
            >
              🧠 Gemini’s Medical Summary:
            </h3>
              <motion.pre
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`whitespace-pre-wrap text-sm leading-relaxed font-medium ${
                  theme === "light" ? "text-gray-900" : "text-gray-200"
                }`}
              >
                {response}
              </motion.pre>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default GeminiPDF;
