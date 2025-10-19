// Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Gemini from "../components/Gemini.jsx";
import GeminiPdf from "../components/GeminiPdf.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("chat");
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/me`,
          { withCredentials: true }
        );
        setUser(res.data.user);
      } catch (err) {
        console.error("User not authenticated", err);
        navigate("/");
      }
    };
    fetchUser();
  }, []);

  const logoutUser = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      toast.success("User logged out successfully.");
      navigate("/");
    } catch (err) {
      console.error("Error logging out", err);
      toast.error("Logout failed");
    }
  };

  return (
    <div
      className={`w-full min-h-screen flex flex-col transition-colors duration-500 ${
        theme === "light"
          ? "bg-gradient-to-br from-blue-50 via-white to-emerald-50 text-gray-900"
          : "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white"
      }`}
    >
      {/* 🌐 Navbar */}
      <nav
        className={`sticky top-0 z-50 backdrop-blur-lg shadow-lg px-6 py-4 flex justify-between items-center border-b transition-all ${
          theme === "light"
            ? "bg-white/80 border-blue-200"
            : "bg-slate-900/80 border-slate-700"
        }`}
      >
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent tracking-tight">
          🩺 HealthMate AI
        </h1>

        {user && (
          <div className="flex items-center gap-4">
            <p
              className={`hidden sm:block font-semibold truncate max-w-[200px] ${
                theme === "light" ? "text-gray-800" : "text-gray-300"
              }`}
            >
              👋 {user.name}
            </p>
            <button
              onClick={logoutUser}
              className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-5 py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-emerald-600 active:scale-95 transition-all shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* 🧭 Tabs */}
      <div className="flex justify-center mt-35 mb-4">
        <div
          className={`flex gap-3 p-1.5 rounded-full shadow-md ${
            theme === "light"
              ? "bg-blue-100 border border-blue-200"
              : "bg-slate-800 border border-slate-700"
          }`}
        >
          {["chat", "pdf"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-sm sm:text-base font-bold capitalize transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg"
                  : theme === "light"
                  ? "text-blue-700 hover:bg-blue-50"
                  : "text-blue-400 hover:bg-slate-700"
              }`}
            >
              {tab === "chat" ? "💬 Chat Assistant" : "📄 PDF Analyzer"}
            </button>
          ))}
        </div>
      </div>

      {/* 🌟 Main Container */}
      <main className="w-full flex-grow flex justify-center items-center px-4 sm:px-8 py-8">
        <div
          className={`relative w-full h-[85vh] rounded-3xl shadow-2xl overflow-hidden border transition-all duration-300 ${
            theme === "light"
              ? "bg-white/95 border-blue-200"
              : "bg-slate-900/95 border-slate-800"
          }`}
        >
          {/* Glow effect background */}
          <div
            className={`absolute inset-0 blur-3xl opacity-20 ${
              theme === "light"
                ? "bg-gradient-to-tr from-blue-200 via-emerald-100 to-blue-100"
                : "bg-gradient-to-tr from-blue-900 via-emerald-900 to-slate-900"
            }`}
          ></div>

          {/* Content */}
          <div className="relative flex flex-col h-full">
            {/* Header */}
            <div
              className={`px-6 py-4 border-b flex justify-between items-center ${
                theme === "light"
                  ? "bg-blue-50/50 border-blue-200"
                  : "bg-slate-800/60 border-slate-700"
              }`}
            >
              <h2
                className={`text-lg sm:text-2xl font-bold ${
                  theme === "light" ? "text-gray-900" : "text-gray-100"
                }`}
              >
                {activeTab === "chat"
                  ? "🧠 AI Health Consultant"
                  : "📚 Medical Report Summarizer"}
              </h2>
              <span
                className={`text-sm font-medium ${
                  theme === "light" ? "text-gray-700" : "text-gray-400"
                }`}
              >
                {activeTab === "chat"
                  ? "Ask your medical questions"
                  : "Upload & summarize your medical PDFs"}
              </span>
            </div>

            {/* Content */}
            <div
              className={`flex-grow p-4 sm:p-8 ${
                theme === "light" ? "bg-white" : "bg-slate-900"
              }`}
            >
              {activeTab === "chat" ? <Gemini /> : <GeminiPdf />}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm font-medium">
        <span className={theme === "light" ? "text-gray-600" : "text-gray-400"}>
          © {new Date().getFullYear()} HealthMate AI — Empowering Smarter Care 💙
        </span>
      </footer>
    </div>
  );
};

export default HomePage;
