import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { HistoryProvider } from "./context/HistoryContext";
import { FamilyProvider } from "./context/FamilyContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <HistoryProvider>
          <FamilyProvider>
            <App />
          </FamilyProvider>
        </HistoryProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>
);
