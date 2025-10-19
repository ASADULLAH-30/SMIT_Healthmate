import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  FileText,
  Brain,
  Shield,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "AI Health Consultant",
      description:
        "Get instant answers to your medical questions powered by advanced AI. Available 24/7 for your health concerns.",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "PDF Medical Reports",
      description:
        "Upload lab reports, prescriptions, or medical documents and get instant AI-powered summaries and insights.",
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Smart Analysis",
      description:
        "Powered by Google's Gemini AI to provide accurate, reliable medical information and health guidance.",
      gradient: "from-blue-600 to-emerald-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description:
        "Your health data is encrypted and secure. We prioritize your privacy with industry-standard security measures.",
      gradient: "from-emerald-600 to-blue-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Results",
      description:
        "Get immediate responses to your health queries. No waiting rooms, no appointments needed.",
      gradient: "from-blue-500 to-emerald-500",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Wellness Focused",
      description:
        "Comprehensive health insights covering symptoms, medications, preventive care, and lifestyle recommendations.",
      gradient: "from-emerald-500 to-blue-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 ${
        theme === "light"
          ? "bg-gradient-to-br from-blue-50 via-white to-emerald-50"
          : "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      }`}
    >
      {/* Navbar */}
      <nav
        className={`sticky top-0 z-50 backdrop-blur-lg shadow-md px-6 py-4 border-b transition-all ${
          theme === "light"
            ? "bg-white/80 border-blue-200"
            : "bg-slate-900/80 border-slate-700"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent"
          >
            🩺 HealthMate AI
          </motion.h1>
          <motion.button
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/auth")}
            className={`px-6 py-2.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-all ${
              theme === "light"
                ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white"
                : "bg-gradient-to-r from-blue-600 to-emerald-600 text-white"
            }`}
          >
            Get Started
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 sm:py-24">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-emerald-100 dark:from-blue-900/30 dark:to-emerald-900/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span
              className={`text-sm font-semibold ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}
            >
              Powered by Google Gemini AI
            </span>
          </motion.div>

          <h2
            className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Your AI-Powered
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 bg-clip-text text-transparent">
              Health Companion
            </span>
          </h2>

          <p
            className={`text-lg sm:text-xl max-w-3xl mx-auto mb-10 ${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            Get instant medical insights, analyze health reports, and receive
            personalized wellness guidance—all powered by cutting-edge AI
            technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/auth")}
              className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              Start Free Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-xl font-bold border-2 transition-all ${
                theme === "light"
                  ? "border-blue-500 text-blue-600 hover:bg-blue-50"
                  : "border-blue-500 text-blue-400 hover:bg-slate-800"
              }`}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3
            className={`text-3xl sm:text-4xl font-bold mb-4 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Better Health
            </span>
          </h3>
          <p
            className={`text-lg ${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            Everything you need for smarter healthcare decisions
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`p-6 rounded-2xl border shadow-lg hover:shadow-xl transition-all ${
                theme === "light"
                  ? "bg-white border-blue-200"
                  : "bg-slate-800 border-slate-700"
              }`}
            >
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white mb-4 shadow-md`}
              >
                {feature.icon}
              </div>
              <h4
                className={`text-xl font-bold mb-3 ${
                  theme === "light" ? "text-gray-900" : "text-white"
                }`}
              >
                {feature.title}
              </h4>
              <p
                className={`${
                  theme === "light" ? "text-gray-700" : "text-gray-300"
                }`}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 mb-16">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className={`rounded-3xl p-12 text-center shadow-2xl ${
            theme === "light"
              ? "bg-gradient-to-br from-blue-500 to-emerald-500"
              : "bg-gradient-to-br from-blue-600 to-emerald-600"
          }`}
        >
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Transform Your Health Journey?
          </h3>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust HealthMate AI for personalized
            health insights and medical guidance.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/auth")}
            className="px-10 py-4 bg-white text-blue-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Get Started Free →
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        className={`border-t py-8 ${
          theme === "light"
            ? "bg-white/50 border-blue-200"
            : "bg-slate-900/50 border-slate-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p
            className={`text-sm font-medium ${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            }`}
          >
            © {new Date().getFullYear()} HealthMate AI — Empowering Smarter
            Care 💙
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
