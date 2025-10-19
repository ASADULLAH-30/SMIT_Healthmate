// utils/cloudinaryConfig.js
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Verify Cloudinary configuration
console.log("🔍 Cloudinary Configuration:");
console.log(
  "   Cloud Name:",
  process.env.CLOUDINARY_CLOUD_NAME ? "✅ Present" : "❌ Missing"
);
console.log(
  "   API Key:",
  process.env.CLOUDINARY_API_KEY ? "✅ Present" : "❌ Missing"
);
console.log(
  "   API Secret:",
  process.env.CLOUDINARY_API_SECRET ? "✅ Present" : "❌ Missing"
);

export default cloudinary;
