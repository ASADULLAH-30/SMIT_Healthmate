import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import FamilyMember from '../models/Family.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Get all family members
router.get('/', authenticateToken, async (req, res) => {
  try {
    const members = await FamilyMember.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching family members', error: error.message });
  }
});

// Add family member
router.post('/', authenticateToken, async (req, res) => {
  try {
    const member = new FamilyMember({
      userId: req.user.userId,
      ...req.body,
    });
    await member.save();
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Error adding family member', error: error.message });
  }
});

// Update family member
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const member = await FamilyMember.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!member) {
      return res.status(404).json({ message: 'Family member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Error updating family member', error: error.message });
  }
});

// Delete family member
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const member = await FamilyMember.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!member) {
      return res.status(404).json({ message: 'Family member not found' });
    }

    // Delete all PDFs from Cloudinary
    for (const record of member.medicalRecords) {
      if (record.cloudinaryId) {
        await cloudinary.uploader.destroy(record.cloudinaryId, { resource_type: 'raw' });
      }
    }

    res.json({ message: 'Family member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting family member', error: error.message });
  }
});

// Add medical record to family member
router.post('/:id/records', authenticateToken, upload.single('pdf'), async (req, res) => {
  try {
    const member = await FamilyMember.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!member) {
      return res.status(404).json({ message: 'Family member not found' });
    }

    const recordData = JSON.parse(req.body.recordData);
    
    // Upload PDF if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'raw',
        folder: 'healthmate/medical-records',
      });

      recordData.pdfUrl = result.secure_url;
      recordData.cloudinaryId = result.public_id;
      recordData.pdfFileName = req.file.originalname;
      recordData.pdfSize = req.file.size;

      // Delete local file
      const fs = await import('fs');
      fs.unlinkSync(req.file.path);
    }

    member.medicalRecords.push(recordData);
    await member.save();

    res.json(member);
  } catch (error) {
    console.error('Add record error:', error);
    res.status(500).json({ message: 'Error adding medical record', error: error.message });
  }
});

// Delete medical record
router.delete('/:memberId/records/:recordId', authenticateToken, async (req, res) => {
  try {
    const member = await FamilyMember.findOne({
      _id: req.params.memberId,
      userId: req.user.userId,
    });

    if (!member) {
      return res.status(404).json({ message: 'Family member not found' });
    }

    const record = member.medicalRecords.id(req.params.recordId);
    if (!record) {
      return res.status(404).json({ message: 'Medical record not found' });
    }

    // Delete PDF from Cloudinary if exists
    if (record.cloudinaryId) {
      await cloudinary.uploader.destroy(record.cloudinaryId, { resource_type: 'raw' });
    }

    member.medicalRecords.pull(req.params.recordId);
    await member.save();

    res.json({ message: 'Medical record deleted successfully', member });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting medical record', error: error.message });
  }
});

export default router;
