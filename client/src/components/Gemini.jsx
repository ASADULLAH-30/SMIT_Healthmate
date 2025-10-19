import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const Gemini = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]); // stores all chat messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme } = useTheme();
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setError("");
    const userMessage = { role: "user", text: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/gemini`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      const aiMessage = { role: "ai", text: data.text || "No response." };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Check your backend or network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`w-full h-full flex items-center flex-col transition-colors duration-300 ${
        theme === "light"
          ? "bg-gradient-to-br from-blue-50 via-white to-emerald-50"
          : "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950"
      }`}
    >
      <div
        className={`w-full h-full rounded-2xl shadow-lg border flex flex-col overflow-hidden transition ${
          theme === "light"
            ? "bg-white border-blue-200"
            : "bg-slate-900 border-slate-800"
        }`}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 text-center font-bold border-b ${
            theme === "light"
              ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 border-blue-200"
              : "text-blue-400 border-slate-800"
          }`}
        >
          🧠 Gemini Chat
        </motion.div>

        {/* Chat area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-center text-sm font-medium mt-10 ${
                theme === "light" ? "text-gray-600" : "text-gray-400"
              }`}
            >
              💬 Start a conversation with Gemini...
            </motion.div>
          )}

          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm shadow-md font-medium ${
                    msg.role === "user"
                      ? theme === "light"
                        ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white"
                        : "bg-gradient-to-r from-blue-600 to-emerald-600 text-white"
                      : theme === "light"
                      ? "bg-blue-50 text-gray-900 border border-blue-200"
                      : "bg-slate-800 text-gray-200 border border-slate-700"
                  }`}
                >
                  {msg.text}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading message (AI typing) */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex justify-start"
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-md flex gap-1 items-center ${
                    theme === "light"
                      ? "bg-blue-50 text-gray-700 border border-blue-200"
                      : "bg-slate-800 text-gray-300 border border-slate-700"
                  }`}
                >
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce delay-150">●</span>
                  <span className="animate-bounce delay-300">●</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={chatEndRef} />
        </div>

        {/* Footer / Input */}
        <form
          onSubmit={handleSubmit}
          className="p-4 border-t flex gap-2 items-center"
        >
          <textarea
            rows="1"
            placeholder="Type your message..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            className={`flex-1 resize-none rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 transition ${
              theme === "light"
                ? "border border-blue-300 bg-blue-50 focus:ring-blue-400 text-gray-900 placeholder-gray-600"
                : "border border-slate-700 bg-slate-800 focus:ring-blue-500 text-gray-200 placeholder-gray-400"
            }`}
          />
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading ? { scale: 1.05, y: -2 } : {}}
            whileTap={!loading ? { scale: 0.95 } : {}}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-md ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:shadow-lg"
            } ${
              theme === "light"
                ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white hover:from-blue-600 hover:to-emerald-600"
                : "bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:from-blue-700 hover:to-emerald-700"
            }`}
          >
            {loading ? "..." : "Send"}
          </motion.button>
        </form>

        {/* Error */}
        {error && (
          <p
            className={`text-center text-sm py-2 ${
              theme === "light" ? "text-red-600" : "text-red-400"
            }`}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Gemini;
