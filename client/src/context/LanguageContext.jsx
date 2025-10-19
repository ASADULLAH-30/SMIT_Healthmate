import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Translations
export const translations = {
  en: {
    // Navbar
    appName: "HealthMate AI",
    logout: "Logout",
    
    // Tabs
    aiChat: "AI Chat",
    pdfAnalysis: "PDF Analysis",
    history: "History",
    
    // Chat
    chatTitle: "AI Health Consultant",
    chatSubtitle: "Powered by Gemini 2.0 Flash",
    startConsultation: "Start Your Health Consultation",
    askAnything: "Ask me anything about symptoms, medications, or general health advice.",
    suggestions: {
      diabetes: "What are symptoms of diabetes?",
      bloodPressure: "Tell me about high blood pressure",
      coldRemedies: "Explain common cold remedies",
      healthyDiet: "What is a healthy diet?"
    },
    inputPlaceholder: "Ask about symptoms, medications, health advice...",
    send: "Send",
    analyzing: "Analyzing...",
    
    // PDF
    pdfTitle: "Medical Document Analyzer",
    pdfSubtitle: "AI-powered PDF analysis",
    uploadDocument: "Upload Medical Document",
    dragDropText: "Drag & drop your PDF here, or click to browse",
    customQuestion: "Custom Question (Optional)",
    customQuestionPlaceholder: "e.g., What are the key findings? Summarize test results...",
    customQuestionHelper: "Leave empty for automatic medical document analysis",
    analyzeButton: "Analyze with Gemini AI",
    analyzingDocument: "Analyzing Document...",
    geminiProcessing: "Gemini 2.0 is processing your medical document",
    analysisComplete: "Analysis Complete",
    newAnalysis: "New Analysis",
    textPDFs: "Text PDFs",
    scannedPDFs: "Scanned PDFs",
    removeFile: "Remove File",
    
    // History
    historyTitle: "Report History",
    historySubtitle: "Your uploaded medical reports",
    noHistory: "No reports uploaded yet",
    uploadFirst: "Upload your first medical report to see it here",
    viewReport: "View Report",
    deleteReport: "Delete",
    uploadedOn: "Uploaded on",
    
    // Family Dashboard
    familyDashboard: "Family Dashboard",
    familySubtitle: "Manage your family's health records",
    addFamilyMember: "Add Family Member",
    noFamilyMembers: "No Family Members Added",
    addMemberToStart: "Add your family members to start tracking their health records",
    viewRecords: "View Records",
    addRecord: "Add Record",
    noMedicalRecords: "No Medical Records",
    memberRecords: "'s Records",
    
    // Common
    aiActive: "AI Active",
    error: "Error",
    loading: "Loading...",
    close: "Close",
  },
  
  ur: {
    // Navbar (Roman Urdu)
    appName: "HealthMate AI",
    logout: "Logout",
    
    // Tabs
    aiChat: "AI Chat",
    pdfAnalysis: "PDF Tajzia",
    history: "Tarekh",
    
    // Chat
    chatTitle: "AI Sehat Mashwara",
    chatSubtitle: "Gemini 2.0 Flash se powered",
    startConsultation: "Apni Sehat Ka Mashwara Shuru Karein",
    askAnything: "Mujhse alamaat, dawai, ya sehat ki salah ke bare mein kuch bhi puchein.",
    suggestions: {
      diabetes: "Sugar ki bimari ki alamaat kya hain?",
      bloodPressure: "High blood pressure ke bare mein batayen",
      coldRemedies: "Zukam ka ilaj samjhayen",
      healthyDiet: "Sehatmand khana kya hai?"
    },
    inputPlaceholder: "Alamaat, dawai, sehat ki salah ke bare mein puchein...",
    send: "Bhejein",
    analyzing: "Tajzia ho raha hai...",
    
    // PDF
    pdfTitle: "Medical Document Analyzer",
    pdfSubtitle: "AI se powered PDF tajzia",
    uploadDocument: "Medical Document Upload Karein",
    dragDropText: "Apni PDF yahan drag & drop karein, ya browse karne ke liye click karein",
    customQuestion: "Custom Sawal (Ikhtiyari)",
    customQuestionPlaceholder: "Misal ke tor par: Kya important findings hain? Test results ka khulasa karein...",
    customQuestionHelper: "Automatic medical document analysis ke liye khali chhor dein",
    analyzeButton: "Gemini AI se Tajzia Karein",
    analyzingDocument: "Document ka Tajzia Ho Raha Hai...",
    geminiProcessing: "Gemini 2.0 aapki medical document ko process kar raha hai",
    analysisComplete: "Tajzia Mukammal",
    newAnalysis: "Naya Tajzia",
    textPDFs: "Text PDFs",
    scannedPDFs: "Scanned PDFs",
    removeFile: "File Hatayen",
    
    // History
    historyTitle: "Report Ki Tarekh",
    historySubtitle: "Aapki upload ki gayi medical reports",
    noHistory: "Abhi tak koi report upload nahi hui",
    uploadFirst: "Apni pehli medical report upload karein taake yahan dikhaye",
    viewReport: "Report Dekhein",
    deleteReport: "Delete",
    uploadedOn: "Upload ki gayi",
    
    // Family Dashboard
    familyDashboard: "Khandani Dashboard",
    familySubtitle: "Apne khandaan ki sehat ke records manage karein",
    addFamilyMember: "Khandaan Ka Member Add Karein",
    noFamilyMembers: "Koi Khandani Member Nahi Hai",
    addMemberToStart: "Apne khandaan ke members add karein unki sehat track karne ke liye",
    viewRecords: "Records Dekhein",
    addRecord: "Record Add Karein",
    noMedicalRecords: "Koi Medical Records Nahi",
    memberRecords: " Ke Records",
    
    // Common
    aiActive: "AI Active",
    error: "Khata",
    loading: "Load ho raha hai...",
    close: "Band Karein",
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // 'en' or 'ur'

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ur" : "en"));
  };

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
