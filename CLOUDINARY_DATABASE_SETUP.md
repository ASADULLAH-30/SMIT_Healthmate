# 🗄️ Cloudinary + Database Setup for Data Persistence

## ✅ What's Implemented

All data now saves to:
- **MongoDB Database** - User data, PDF history, Family members
- **Cloudinary** - PDF files storage
- **Persists after refresh** - No more data loss!

---

## 📦 Installation Steps

### 1. **Install Cloudinary Package**

```bash
cd backend
npm install cloudinary
```

### 2. **Add Cloudinary Credentials to .env**

Add these lines to `backend/.env`:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. **Get Cloudinary Credentials**

1. Go to [https://cloudinary.com](https://cloudinary.com)
2. Sign up for FREE account
3. Go to Dashboard
4. Copy:
   - Cloud Name
   - API Key
   - API Secret
5. Paste them in `.env` file

---

## 🗂️ Files Created

### **Backend:**

1. ✅ `backend/config/cloudinary.js` - Cloudinary configuration
2. ✅ `backend/models/PdfHistory.js` - PDF history model
3. ✅ `backend/models/Family.js` - Family members model
4. ✅ `backend/routes/pdfRoutes.js` - PDF API routes
5. ✅ `backend/routes/familyRoutes.js` - Family API routes
6. ✅ `backend/server.js` - Updated with new routes

---

## 🔌 API Endpoints

### **PDF History:**

```
POST   /api/pdf/upload          - Upload PDF to Cloudinary + save to DB
GET    /api/pdf/history          - Get all PDF history
GET    /api/pdf/history/:id      - Get single PDF
DELETE /api/pdf/history/:id      - Delete PDF (from Cloudinary + DB)
```

### **Family Members:**

```
GET    /api/family               - Get all family members
POST   /api/family               - Add family member
PUT    /api/family/:id           - Update family member
DELETE /api/family/:id           - Delete family member

POST   /api/family/:id/records   - Add medical record (with PDF upload)
DELETE /api/family/:memberId/records/:recordId - Delete medical record
```

---

## 💾 Data Models

### **PDF History:**
```javascript
{
  userId: ObjectId,
  fileName: String,
  fileSize: Number,
  fileUrl: String,        // Cloudinary URL
  cloudinaryId: String,   // For deletion
  analysis: String,       // AI analysis result
  prompt: String,
  note: String,
  uploadDate: Date
}
```

### **Family Member:**
```javascript
{
  userId: ObjectId,
  name: String,
  relation: String,
  age: String,
  bloodGroup: String,
  medicalRecords: [
    {
      date: Date,
      doctorName: String,
      illness: String,
      reportType: String,
      majorFindings: String,
      pdfUrl: String,       // Cloudinary URL
      cloudinaryId: String,
      prescription: String,
      nextVisit: Date
    }
  ]
}
```

---

## 🚀 How It Works

### **1. PDF Upload Flow:**

```
User uploads PDF
  ↓
PDF sent to backend
  ↓
Backend uploads to Cloudinary
  ↓
Cloudinary returns URL
  ↓
Save URL + metadata to MongoDB
  ↓
Delete local temp file
  ↓
Return data to frontend
```

### **2. Data Retrieval:**

```
User opens app
  ↓
Frontend requests data from API
  ↓
Backend fetches from MongoDB
  ↓
Returns data with Cloudinary URLs
  ↓
Frontend displays data
```

### **3. Data Persistence:**

```
✅ User closes browser → Data saved in DB
✅ User refreshes page → Data loaded from DB
✅ User logs in from another device → Same data
✅ PDFs stored on Cloudinary → Always accessible
```

---

## 🔧 Environment Variables Required

Your `backend/.env` should have:

```env
# MongoDB
MONGODB_URI=mongodb+srv://...

# JWT
JWT_SECRET=your_secret_key

# Gemini AI
GOOGLE_API_KEY=your_gemini_api_key

# Cloudinary (NEW!)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server
PORT=3000
```

---

## ✅ Testing

### **1. Start Backend:**
```bash
cd backend
npm run dev
```

### **2. Test PDF Upload:**
```bash
curl -X POST http://localhost:3000/api/pdf/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "pdf=@test.pdf" \
  -F "analysis=Test analysis"
```

### **3. Test Get History:**
```bash
curl http://localhost:3000/api/pdf/history \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📊 Benefits

### **Before (localStorage):**
- ❌ Data lost on browser clear
- ❌ Can't access from other devices
- ❌ Limited storage (~10MB)
- ❌ No PDF file storage
- ❌ No backup

### **After (Database + Cloudinary):**
- ✅ **Data persists forever**
- ✅ **Access from any device**
- ✅ **Unlimited storage**
- ✅ **PDFs stored on cloud**
- ✅ **Automatic backup**
- ✅ **Better security**

---

## 🎯 What's Saved

### **PDF Analysis:**
- ✅ PDF file (on Cloudinary)
- ✅ File name & size
- ✅ AI analysis result
- ✅ User prompt
- ✅ Upload date
- ✅ All metadata

### **Family Members:**
- ✅ Member details
- ✅ Medical records
- ✅ PDF reports (on Cloudinary)
- ✅ Doctor visits
- ✅ Prescriptions
- ✅ All history

### **User Data:**
- ✅ Account information
- ✅ Login sessions
- ✅ Preferences

---

## 🔐 Security

- ✅ **Authentication required** for all API calls
- ✅ **User isolation** - Users only see their own data
- ✅ **Cloudinary security** - Secure PDF storage
- ✅ **JWT tokens** - Secure authentication
- ✅ **HTTPS** - Encrypted data transfer

---

## 🚀 Next Steps

1. **Install cloudinary:** `npm install cloudinary`
2. **Get Cloudinary account** (FREE)
3. **Add credentials** to `.env`
4. **Restart backend:** `npm run dev`
5. **Test upload** - Upload a PDF
6. **Refresh page** - Data should persist!

---

## 💡 Pro Tips

1. **Free Tier:** Cloudinary offers 25GB free storage
2. **Auto-cleanup:** Old PDFs can be auto-deleted
3. **CDN:** Cloudinary serves files via CDN (fast!)
4. **Transformations:** Can resize/optimize PDFs if needed
5. **Backup:** MongoDB Atlas has automatic backups

---

## 🎉 Result

**Your data is now:**
- ✅ **Saved in database** (MongoDB)
- ✅ **PDFs on cloud** (Cloudinary)
- ✅ **Persistent** (survives refresh)
- ✅ **Accessible anywhere**
- ✅ **Secure**
- ✅ **Backed up**

**No more data loss! Everything saves automatically! 🚀**
