// Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Gemini from "../components/Gemini.jsx";
import GeminiPdf from "../components/GeminiPdfEnhanced.jsx";
import ReportHistory from "../components/ReportHistory.jsx";
import FamilyDashboard from "../components/FamilyDashboard.jsx";
import FamilyMemberDetail from "../components/FamilyMemberDetail.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaHeartbeat
} from "react-icons/fa";
import { 
  Activity, 
  FileText, 
  MessageSquare,
  User,
  LogOut,
  Sparkles,
  Clock,
  Languages,
  Users
} from "lucide-react";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("chat");
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

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
        navigate("/auth");
      }
    };
    fetchUser();
  }, [navigate]);

  const logoutUser = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      toast.success("User logged out successfully.");
      navigate("/auth");
    } catch (err) {
      console.error("Error logging out", err);
      toast.error("Logout failed");
    }
  };

  return (
    <div
      className={`w-full min-h-screen flex flex-col transition-colors duration-500 ${
        theme === "light"
          ? "bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 text-gray-900"
          : "bg-gradient-to-br from-slate-950 via-blue-950/30 to-slate-900 text-white"
      }`}
    >
      {/* 🌐 Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`sticky top-0 z-50 backdrop-blur-xl shadow-md px-2 sm:px-4 py-2 border-b transition-all ${
          theme === "light"
            ? "bg-white/90 border-cyan-200/50"
            : "bg-slate-900/90 border-slate-700/50"
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          {/* Logo - Compact */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-1.5 cursor-pointer flex-shrink-0"
          >
            <div className={`p-1.5 rounded-lg ${
              theme === "light"
                ? "bg-gradient-to-br from-cyan-500 to-teal-600"
                : "bg-gradient-to-br from-cyan-600 to-teal-700"
            } shadow-md`}>
              <FaHeartbeat className="w-4 h-4 text-white" />
            </div>
            <h1 className="hidden sm:block text-sm md:text-base font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
              HealthMate
            </h1>
          </motion.div>

          {/* TABS IN NAVBAR - Always Visible */}
          <div
            className={`flex gap-1 p-1 rounded-xl flex-1 max-w-md mx-2 ${
              theme === "light"
                ? "bg-cyan-50 border border-cyan-200"
                : "bg-slate-800 border border-slate-700"
            }`}
          >
            <motion.button
              onClick={() => setActiveTab("chat")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "chat"
                  ? "bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-md"
                  : theme === "light"
                  ? "text-cyan-700 hover:bg-cyan-100"
                  : "text-cyan-400 hover:bg-slate-700"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Chat</span>
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("pdf")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "pdf"
                  ? "bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-md"
                  : theme === "light"
                  ? "text-cyan-700 hover:bg-cyan-100"
                  : "text-cyan-400 hover:bg-slate-700"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">PDF</span>
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("history")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "history"
                  ? "bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-md"
                  : theme === "light"
                  ? "text-cyan-700 hover:bg-cyan-100"
                  : "text-cyan-400 hover:bg-slate-700"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </motion.button>
            <motion.button
              onClick={() => { setActiveTab("dashboard"); setSelectedMemberId(null); }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "dashboard"
                  ? "bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-md"
                  : theme === "light"
                  ? "text-cyan-700 hover:bg-cyan-100"
                  : "text-cyan-400 hover:bg-slate-700"
              }`}
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Family</span>
            </motion.button>
          </div>

          {/* Right Side - Compact */}
          {user && (
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Language Switcher */}
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-lg font-bold text-xs transition-all ${
                theme === "light"
                  ? "bg-cyan-100 text-cyan-700 hover:bg-cyan-200"
                  : "bg-cyan-900/30 text-cyan-400 hover:bg-cyan-900/50"
              }`}
              title="Toggle Language"
            >
              <Languages className="w-3 h-3" />
              <span className="text-xs">{language === "en" ? "EN" : "UR"}</span>
            </motion.button>


            {/* Logout Button */}
            <motion.button
              onClick={logoutUser}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-lg font-bold text-xs transition-all shadow-md ${
                theme === "light"
                  ? "bg-gradient-to-r from-cyan-500 to-teal-600 text-white hover:from-cyan-600 hover:to-teal-700"
                  : "bg-gradient-to-r from-cyan-600 to-teal-700 text-white hover:from-cyan-700 hover:to-teal-800"
              }`}
            >
              <LogOut className="w-3 h-3" />
            </motion.button>
          </div>
        )}
        </div>
      </motion.nav>


      {/* 🌟 Main Container - FULL WIDTH & BIG */}
      <main className="w-full flex-grow flex justify-center px-0 py-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className={`relative w-full h-[calc(100vh-80px)] shadow-2xl overflow-hidden transition-all duration-300 ${
            theme === "light"
              ? "bg-white border-t border-cyan-200/50"
              : "bg-slate-900 border-t border-slate-800/50"
          }`}
        >
          {/* Glow effect background */}
          <div
            className={`absolute inset-0 blur-3xl opacity-10 pointer-events-none ${
              theme === "light"
                ? "bg-gradient-to-tr from-cyan-200 via-blue-100 to-teal-200"
                : "bg-gradient-to-tr from-cyan-900/30 via-blue-900/20 to-teal-900/30"
            }`}
          ></div>

          {/* Content Wrapper */}
          <div className="relative flex flex-col h-full">
            {/* Header */}
            <div
              className={`px-4 sm:px-8 py-4 border-b ${
                theme === "light"
                  ? "bg-gradient-to-r from-cyan-50 to-teal-50 border-cyan-200"
                  : "bg-gradient-to-r from-slate-800 to-slate-900 border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${
                    theme === "light"
                      ? "bg-gradient-to-br from-cyan-500 to-teal-600"
                      : "bg-gradient-to-br from-cyan-600 to-teal-700"
                  } shadow-lg`}>
                    {activeTab === "chat" ? (
                      <Activity className="w-5 h-5 text-white" />
                    ) : activeTab === "pdf" ? (
                      <FileText className="w-5 h-5 text-white" />
                    ) : activeTab === "history" ? (
                      <Clock className="w-5 h-5 text-white" />
                    ) : (
                      <Users className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <h2
                      className={`text-lg sm:text-xl font-bold ${
                        theme === "light" ? "text-gray-900" : "text-gray-100"
                      }`}
                    >
                      {activeTab === "chat"
                        ? t("chatTitle")
                        : activeTab === "pdf"
                        ? t("pdfTitle")
                        : activeTab === "history"
                        ? t("historyTitle")
                        : "Family Dashboard"}
                    </h2>
                    <p
                      className={`text-xs font-medium mt-0.5 ${
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      {activeTab === "chat"
                        ? t("chatSubtitle")
                        : activeTab === "pdf"
                        ? t("pdfSubtitle")
                        : activeTab === "history"
                        ? t("historySubtitle")
                        : "Manage family health records"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content - SCROLLABLE */}
            <div
              className={`flex-grow p-4 sm:p-8 overflow-y-auto ${
                theme === "light" ? "bg-white" : "bg-slate-900"
              }`}
            >
              <AnimatePresence mode="wait">
                {activeTab === "chat" ? (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Gemini />
                  </motion.div>
                ) : activeTab === "pdf" ? (
                  <motion.div
                    key="pdf"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GeminiPdf />
                  </motion.div>
                ) : activeTab === "history" ? (
                  <motion.div
                    key="history"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ReportHistory />
                  </motion.div>
                ) : (
                  <motion.div
                    key="dashboard"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    {selectedMemberId ? (
                      <FamilyMemberDetail
                        memberId={selectedMemberId}
                        onBack={() => setSelectedMemberId(null)}
                      />
                    ) : (
                      <FamilyDashboard
                        onMemberClick={(id) => setSelectedMemberId(id)}
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className={`border-t py-6 backdrop-blur-sm ${
        theme === "light"
          ? "bg-white/50 border-cyan-200/50"
          : "bg-slate-900/50 border-slate-800/50"
      }`}>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FaHeartbeat className="text-cyan-500 w-5 h-5" />
            <span className={`text-sm font-semibold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent`}>
              HealthMate AI
            </span>
          </div>
          <p className={`text-xs sm:text-sm font-medium ${
            theme === "light" ? "text-gray-600" : "text-gray-400"
          }`}>
            © {new Date().getFullYear()} HealthMate AI — Empowering Smarter Healthcare with AI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
