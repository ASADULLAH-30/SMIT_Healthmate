import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";

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
    <div className="w-full h-full flex items-center flex-col">
      <div className="w-full h-full flex flex-col overflow-hidden">

        {/* Chat area */}
        <div className={`flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 ${
          theme === "light" ? "bg-gradient-to-br from-cyan-50/30 to-teal-50/30" : "bg-slate-900/50"
        }`}>
          {messages.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center justify-center h-full gap-4"
            >
              <div className={`p-6 rounded-2xl ${
                theme === "light"
                  ? "bg-gradient-to-br from-cyan-100 to-teal-100"
                  : "bg-gradient-to-br from-cyan-900/20 to-teal-900/20"
              } shadow-lg`}>
                <Sparkles className={`w-12 h-12 ${
                  theme === "light" ? "text-cyan-600" : "text-cyan-400"
                }`} />
              </div>
              <div className="text-center max-w-md">
                <h3 className={`text-xl font-bold mb-2 ${
                  theme === "light" ? "text-gray-900" : "text-gray-100"
                }`}>
                  Start Your Health Consultation
                </h3>
                <p className={`text-sm ${
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }`}>
                  Ask me anything about symptoms, medications, or general health advice.
                </p>
              </div>
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 max-w-2xl w-full px-4`}>
                {[
                  "What are symptoms of diabetes?",
                  "Tell me about high blood pressure",
                  "Explain common cold remedies",
                  "What is a healthy diet?"
                ].map((suggestion, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setPrompt(suggestion)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium text-left transition-all ${
                      theme === "light"
                        ? "bg-white border border-cyan-200 hover:border-cyan-400 text-gray-700 hover:shadow-md"
                        : "bg-slate-800 border border-slate-700 hover:border-cyan-600 text-gray-300 hover:shadow-lg"
                    }`}
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
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
                <div className="flex gap-3 items-start max-w-[85%]">
                  {msg.role === "ai" && (
                    <div className={`p-2 rounded-xl shrink-0 ${
                      theme === "light"
                        ? "bg-gradient-to-br from-cyan-500 to-teal-600"
                        : "bg-gradient-to-br from-cyan-600 to-teal-700"
                    } shadow-md`}>
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className={`px-4 py-3 rounded-2xl text-sm shadow-md font-medium whitespace-pre-wrap ${
                      msg.role === "user"
                        ? theme === "light"
                          ? "bg-gradient-to-r from-cyan-500 to-teal-600 text-white"
                          : "bg-gradient-to-r from-cyan-600 to-teal-700 text-white"
                        : theme === "light"
                        ? "bg-white text-gray-900 border border-cyan-200"
                        : "bg-slate-800 text-gray-200 border border-slate-700"
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                  {msg.role === "user" && (
                    <div className={`p-2 rounded-xl shrink-0 ${
                      theme === "light"
                        ? "bg-cyan-100 border border-cyan-200"
                        : "bg-slate-800 border border-slate-700"
                    }`}>
                      <User className="w-5 h-5 text-cyan-600" />
                    </div>
                  )}
                </div>
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
                <div className="flex gap-3 items-start max-w-[85%]">
                  <div className={`p-2 rounded-xl shrink-0 ${
                    theme === "light"
                      ? "bg-gradient-to-br from-cyan-500 to-teal-600"
                      : "bg-gradient-to-br from-cyan-600 to-teal-700"
                  } shadow-md`}>
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm shadow-md flex gap-1.5 items-center ${
                      theme === "light"
                        ? "bg-white text-gray-700 border border-cyan-200"
                        : "bg-slate-800 text-gray-300 border border-slate-700"
                    }`}
                  >
                    <span className="animate-bounce" style={{ animationDelay: '0ms' }}>●</span>
                    <span className="animate-bounce" style={{ animationDelay: '150ms' }}>●</span>
                    <span className="animate-bounce" style={{ animationDelay: '300ms' }}>●</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={chatEndRef} />
        </div>

        {/* Footer / Input */}
        <div className={`border-t backdrop-blur-sm ${
          theme === "light"
            ? "bg-white/80 border-cyan-200/50"
            : "bg-slate-900/80 border-slate-700/50"
        }`}>
          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`px-4 py-2 text-center text-sm font-medium ${
                  theme === "light"
                    ? "bg-red-50 text-red-600 border-b border-red-200"
                    : "bg-red-900/20 text-red-400 border-b border-red-800"
                }`}
              >
                ⚠️ {error}
              </motion.div>
            )}
          </AnimatePresence>
          
          <form
            onSubmit={handleSubmit}
            className="p-4 flex gap-3 items-end"
          >
            <textarea
              rows="1"
              placeholder="Ask about symptoms, medications, health advice..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              required
              className={`flex-1 resize-none rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 transition max-h-32 ${
                theme === "light"
                  ? "border border-cyan-300 bg-white focus:ring-cyan-400 text-gray-900 placeholder-gray-500"
                  : "border border-slate-700 bg-slate-800 focus:ring-cyan-500 text-gray-200 placeholder-gray-500"
              }`}
            />
            <motion.button
              type="submit"
              disabled={loading || !prompt.trim()}
              whileHover={!loading && prompt.trim() ? { scale: 1.05 } : {}}
              whileTap={!loading && prompt.trim() ? { scale: 0.95 } : {}}
              className={`p-3.5 rounded-xl font-bold transition-all shadow-md ${
                loading || !prompt.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-lg"
              } ${
                theme === "light"
                  ? "bg-gradient-to-r from-cyan-500 to-teal-600 text-white hover:from-cyan-600 hover:to-teal-700"
                  : "bg-gradient-to-r from-cyan-600 to-teal-700 text-white hover:from-cyan-700 hover:to-teal-800"
              }`}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Gemini;
