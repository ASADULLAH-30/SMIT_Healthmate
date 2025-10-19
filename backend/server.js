// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfModule = require("pdf-parse");
const pdfParse = pdfModule.default || pdfModule; // ✅ handles both CJS + ESM exports

import multer from "multer";
import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import authRoutes from "./routes/authRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";
import familyRoutes from "./routes/familyRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://smit-hackathon-client.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

console.log("🔍 Environment check:");
console.log("   PORT:", PORT);
console.log("   MONGODB_URI:", MONGODB_URI ? "✅ Present" : "❌ Missing");
console.log("   JWT_SECRET:", process.env.JWT_SECRET ? "✅ Present" : "❌ Missing");

// 🔌 Connect MongoDB
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in .env file");
} else {
  mongoose
    .connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    })
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err.message);
      console.log("⚠️  Server will continue running but database operations will fail");
    });
}

// Initialize Gemini client
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
if (!GOOGLE_API_KEY) {
  console.error("⚠️  WARNING: GOOGLE_API_KEY is not set in .env file");
  console.log("   Gemini AI features will not work without this key");
}
const genAI = GOOGLE_API_KEY ? new GoogleGenerativeAI(GOOGLE_API_KEY) : null;

// Gemini test route// backend/server.js (snippet)
const upload = multer({ storage: multer.memoryStorage() }); // in-memory buffer

app.post("/api/gemini/pdf", upload.single("file"), async (req, res) => {
  try {
    // Check if Gemini is configured
    if (!genAI) {
      return res.status(500).json({
        error: "Gemini API not configured",
        details: "GOOGLE_API_KEY is missing in environment variables",
      });
    }

    // prompt from form-data
    const prompt = req.body?.prompt || "Analyze this medical document and provide a detailed summary including key findings, diagnoses, and recommendations.";

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: "No PDF file uploaded" });
    }

    console.log("📄 Processing PDF:", req.file.originalname);

    let extractedText = "";
    
    try {
      // Try to parse PDF buffer for text
      const pdfData = await pdfParse(req.file.buffer);
      extractedText = pdfData.text || "";
      
      if (extractedText.trim()) {
        console.log("✅ Extracted", extractedText.length, "characters from PDF");
      }
    } catch (parseError) {
      console.log("⚠️ Text extraction failed:", parseError.message);
    }

    console.log("🤖 Calling Gemini 2.0 Flash...");

    // If we have text, use text-based analysis
    if (extractedText.trim()) {
      const chunk = extractedText.slice(0, 30000); // ~30k chars
      const fullPrompt = `${prompt}\n\nPDF CONTENT:\n${chunk}`;

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();
      
      console.log("✅ Gemini response received:", text.substring(0, 100) + "...");
      res.json({ text });
    } else {
      // No text found - try multimodal approach with PDF as document
      console.log("📸 No text found - using multimodal analysis...");
      
      // Convert PDF buffer to base64
      const base64Data = req.file.buffer.toString('base64');
      
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
      
      const result = await model.generateContent([
        {
          inlineData: {
            data: base64Data,
            mimeType: "application/pdf"
          }
        },
        prompt
      ]);
      
      const response = await result.response;
      const text = response.text();
      
      console.log("✅ Gemini multimodal response received:", text.substring(0, 100) + "...");
      res.json({ 
        text,
        note: "This PDF was analyzed using image recognition as it contains no extractable text."
      });
    }
  } catch (error) {
    console.error("❌ Gemini PDF error:", error);
    res.status(500).json({
      error: "Failed to analyze PDF",
      details: error.message || "Unknown error occurred",
    });
  }
});

// Simple text-based Gemini chat route
app.post("/api/gemini", async (req, res) => {
  try {
    // Check if Gemini is configured
    if (!genAI) {
      return res.status(500).json({
        error: "Gemini API not configured",
        details: "GOOGLE_API_KEY is missing in environment variables",
      });
    }

    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    console.log("💬 Gemini 2.0 chat request:", prompt.substring(0, 50) + "...");

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("✅ Gemini chat response:", text.substring(0, 100) + "...");
    
    res.json({ text });
  } catch (error) {
    console.error("❌ Gemini chat error:", error);
    res.status(500).json({
      error: "Failed to get AI response",
      details: error.message || "Unknown error occurred",
    });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/family", familyRoutes);

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
