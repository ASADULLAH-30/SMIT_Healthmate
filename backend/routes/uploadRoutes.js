// routes/uploadRoutes.js
import express from "express";
import multer from "multer";
import cloudinary from "../utils/cloudinaryConfig.js";

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Upload image to Cloudinary
router.post("/image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("📤 Uploading image to Cloudinary...");

    // Convert buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "healthmate",
      resource_type: "auto",
    });

    console.log("✅ Image uploaded:", result.secure_url);

    res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error);
    res.status(500).json({
      error: "Failed to upload image",
      details: error.message,
    });
  }
});

// Upload PDF to Cloudinary
router.post("/pdf", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF file uploaded" });
    }

    console.log("📤 Uploading PDF to Cloudinary...");

    // Convert buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "healthmate/pdfs",
      resource_type: "raw", // For PDFs
    });

    console.log("✅ PDF uploaded:", result.secure_url);

    res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("❌ Cloudinary PDF upload error:", error);
    res.status(500).json({
      error: "Failed to upload PDF",
      details: error.message,
    });
  }
});

// Delete file from Cloudinary
router.delete("/:publicId", async (req, res) => {
  try {
    const { publicId } = req.params;
    
    console.log("🗑️ Deleting file from Cloudinary:", publicId);

    const result = await cloudinary.uploader.destroy(publicId);

    console.log("✅ File deleted:", result);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("❌ Cloudinary delete error:", error);
    res.status(500).json({
      error: "Failed to delete file",
      details: error.message,
    });
  }
});

export default router;
