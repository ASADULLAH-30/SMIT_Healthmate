import React from "react";
import { ToastContainer } from "react-toastify";
import AuthForm from "./pages/AuthForm";
import LandingPage from "./pages/LandingPage";
import { useTheme } from "./context/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageNotFound from "../src/pages/PageNotFound";
import HomePage from "./pages/HomePage";

import { GoogleOAuthProvider } from "@react-oauth/google";
import ProtectedRoute from "./components/ProtectedRoute";
export default function App() {
  const { theme } = useTheme();

  const GoogleWrapper = () => (
    <GoogleOAuthProvider clientId="1079183921375-uqqvv5cbsjot1ibuj2huiut53ntacjr0.apps.googleusercontent.com">
      <AuthForm></AuthForm>
    </GoogleOAuthProvider>
  );

  return (
    <div
      className={`flex justify-center items-center h-screen transition-all duration-700 ${
        theme === "light" 
          ? "bg-gradient-to-br from-blue-50 via-white to-emerald-50 text-gray-900" 
          : "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
      }`}
    >
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<GoogleWrapper />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>

      <ThemeToggle />
      <ToastContainer />
    </div>
  );
}
