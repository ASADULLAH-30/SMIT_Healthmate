import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import PdfHistory from '../models/PdfHistory.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Upload PDF and save to Cloudinary + DB
router.post('/upload', authenticateToken, upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'raw',
      folder: 'healthmate/pdfs',
    });

    // Save to database
    const pdfHistory = new PdfHistory({
      userId: req.user.userId,
      fileName: req.body.fileName || req.file.originalname,
      fileSize: req.file.size,
      fileUrl: result.secure_url,
      cloudinaryId: result.public_id,
      analysis: req.body.analysis || '',
      prompt: req.body.prompt || '',
      note: req.body.note || '',
    });

    await pdfHistory.save();

    // Delete local file
    const fs = await import('fs');
    fs.unlinkSync(req.file.path);

    res.json({
      message: 'PDF uploaded successfully',
      data: pdfHistory,
    });
  } catch (error) {
    console.error('PDF upload error:', error);
    res.status(500).json({ message: 'Error uploading PDF', error: error.message });
  }
});

// Get all PDF history for user
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const history = await PdfHistory.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    
    res.json(history);
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ message: 'Error fetching history', error: error.message });
  }
});

// Get single PDF history item
router.get('/history/:id', authenticateToken, async (req, res) => {
  try {
    const item = await PdfHistory.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!item) {
      return res.status(404).json({ message: 'PDF not found' });
    }

    res.json(item);
  } catch (error) {
    console.error('Get PDF error:', error);
    res.status(500).json({ message: 'Error fetching PDF', error: error.message });
  }
});

// Delete PDF history item
router.delete('/history/:id', authenticateToken, async (req, res) => {
  try {
    const item = await PdfHistory.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!item) {
      return res.status(404).json({ message: 'PDF not found' });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(item.cloudinaryId, { resource_type: 'raw' });

    // Delete from database
    await PdfHistory.deleteOne({ _id: req.params.id });

    res.json({ message: 'PDF deleted successfully' });
  } catch (error) {
    console.error('Delete PDF error:', error);
    res.status(500).json({ message: 'Error deleting PDF', error: error.message });
  }
});

export default router;
