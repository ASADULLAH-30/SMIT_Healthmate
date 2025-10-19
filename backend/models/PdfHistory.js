import mongoose from 'mongoose';

const pdfHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true, // Cloudinary URL
  },
  cloudinaryId: {
    type: String,
    required: true,
  },
  analysis: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
    default: '',
  },
  note: {
    type: String,
    default: '',
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

export default mongoose.model('PdfHistory', pdfHistorySchema);
