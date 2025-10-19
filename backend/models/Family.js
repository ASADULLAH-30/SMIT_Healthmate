import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  doctorSpecialty: String,
  illness: {
    type: String,
    required: true,
  },
  reportType: {
    type: String,
    required: true,
  },
  majorFindings: {
    type: String,
    required: true,
  },
  prescription: String,
  nextVisit: Date,
  pdfUrl: String, // Cloudinary URL
  cloudinaryId: String,
  pdfFileName: String,
  pdfSize: Number,
  notes: String,
}, {
  timestamps: true,
});

const familyMemberSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  relation: {
    type: String,
    required: true,
    enum: ['Father', 'Mother', 'Wife', 'Husband', 'Sister', 'Brother', 'Son', 'Daughter', 'Other'],
  },
  age: String,
  bloodGroup: String,
  allergies: String,
  chronicConditions: String,
  emergencyContact: String,
  medicalRecords: [medicalRecordSchema],
}, {
  timestamps: true,
});

export default mongoose.model('FamilyMember', familyMemberSchema);
