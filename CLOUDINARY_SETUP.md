# 🖼️ Cloudinary Setup Guide

## ✅ Cloudinary Integration Complete!

I've integrated Cloudinary for cloud-based file storage (images, PDFs, etc.).

---

## 🔑 Add These to Your `.env` File

Open `backend/.env` and add these lines:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=dscivcykv
CLOUDINARY_API_KEY=696983266282494
CLOUDINARY_API_SECRET=ImSzOYAnM4nmD7Wb-AK_oByPD38
CLOUDINARY_URL=cloudinary://696983266282494:ImSzOYAnM4nmD7Wb-AK_oByPD38@dscivcykv
```

---

## 📦 Install Cloudinary Package

Run this command in the backend folder:

```bash
cd backend
npm install
```

This will install the `cloudinary` package.

---

## 🚀 What Was Added

### 1. **Cloudinary Configuration** (`utils/cloudinaryConfig.js`)
- Automatically configures Cloudinary on server startup
- Validates that credentials are present
- Shows status in console logs

### 2. **Upload Routes** (`routes/uploadRoutes.js`)
Three new API endpoints:
- `POST /api/upload/image` - Upload images
- `POST /api/upload/pdf` - Upload PDF files
- `DELETE /api/upload/:publicId` - Delete files

### 3. **Package Added**
- `cloudinary@^2.5.1` added to `package.json`

---

## 🎯 How to Use

### Upload an Image

**Frontend Example:**
```javascript
const formData = new FormData();
formData.append("image", fileInput.files[0]);

const response = await fetch("http://localhost:3000/api/upload/image", {
  method: "POST",
  body: formData,
});

const data = await response.json();
console.log("Image URL:", data.url);
// Returns: { success: true, url: "https://res.cloudinary.com/...", publicId: "..." }
```

### Upload a PDF

```javascript
const formData = new FormData();
formData.append("pdf", pdfFile);

const response = await fetch("http://localhost:3000/api/upload/pdf", {
  method: "POST",
  body: formData,
});

const data = await response.json();
console.log("PDF URL:", data.url);
```

### Delete a File

```javascript
const publicId = "healthmate/image123";

const response = await fetch(`http://localhost:3000/api/upload/${encodeURIComponent(publicId)}`, {
  method: "DELETE",
});

const data = await response.json();
console.log("Deleted:", data.success);
```

---

## ✅ Verification

After adding credentials to `.env` and running `npm install`, restart the backend:

```bash
npm run dev
```

You should see:
```
🔍 Cloudinary Configuration:
   Cloud Name: ✅ Present
   API Key: ✅ Present
   API Secret: ✅ Present
```

---

## 📝 API Endpoints Reference

### POST `/api/upload/image`
**Description:** Upload an image to Cloudinary  
**Body:** `multipart/form-data` with `image` field  
**File Types:** JPG, PNG, GIF, WEBP, etc.  
**Max Size:** 10MB  
**Returns:**
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/dscivcykv/image/upload/v1234567890/healthmate/abc123.jpg",
  "publicId": "healthmate/abc123"
}
```

### POST `/api/upload/pdf`
**Description:** Upload a PDF document  
**Body:** `multipart/form-data` with `pdf` field  
**File Types:** PDF only  
**Max Size:** 10MB  
**Returns:**
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/dscivcykv/raw/upload/v1234567890/healthmate/pdfs/report.pdf",
  "publicId": "healthmate/pdfs/report"
}
```

### DELETE `/api/upload/:publicId`
**Description:** Delete a file from Cloudinary  
**Params:** `publicId` - The public ID from upload response  
**Returns:**
```json
{
  "success": true,
  "result": {
    "result": "ok"
  }
}
```

---

## 🔧 Features

- ✅ **Automatic folder organization** - Files stored in `healthmate/` folder
- ✅ **Secure uploads** - API credentials not exposed to frontend
- ✅ **Multiple file types** - Images, PDFs, and other files
- ✅ **File size limits** - Prevents large uploads (10MB default)
- ✅ **Error handling** - Clear error messages for debugging
- ✅ **Logging** - Console logs for tracking uploads/deletes

---

## 🛡️ Security Notes

- ✅ Cloudinary credentials are in `.env` (not committed to Git)
- ✅ API routes handle all Cloudinary operations server-side
- ✅ Frontend never sees your API secret
- ✅ File size limits prevent abuse

---

## 🎨 Use Cases in HealthMate

1. **User Profile Pictures**
   - Upload profile images
   - Store in Cloudinary
   - Retrieve URLs for display

2. **Medical Reports/PDFs**
   - Upload patient reports
   - Store securely in cloud
   - Access from anywhere

3. **Medical Images**
   - X-rays, scans, charts
   - High-quality storage
   - Fast CDN delivery

4. **Document Management**
   - Organize by folders
   - Easy retrieval by URL
   - Delete old/unwanted files

---

## 🔍 Testing

### Test Image Upload (using cURL):
```bash
curl -X POST http://localhost:3000/api/upload/image \
  -F "image=@path/to/your/image.jpg"
```

### Test PDF Upload:
```bash
curl -X POST http://localhost:3000/api/upload/pdf \
  -F "pdf=@path/to/your/document.pdf"
```

---

## 📊 Cloudinary Dashboard

View your uploads at:
https://console.cloudinary.com/console/c-8e9a8c9e7e8e7e8e/media_library

Login with your Cloudinary account to:
- See all uploaded files
- Manage storage
- View usage statistics
- Configure settings

---

## 🐛 Troubleshooting

### Error: "Cloud Name missing"
**Fix:** Add `CLOUDINARY_CLOUD_NAME=dscivcykv` to `backend/.env`

### Error: "API Key missing"
**Fix:** Add `CLOUDINARY_API_KEY=696983266282494` to `backend/.env`

### Error: "Invalid signature"
**Fix:** Verify `CLOUDINARY_API_SECRET` is correct (no spaces)

### Error: "File too large"
**Fix:** Reduce file size or increase limit in `uploadRoutes.js`

---

## 📚 Additional Resources

- **Cloudinary Docs:** https://cloudinary.com/documentation
- **Node.js SDK:** https://cloudinary.com/documentation/node_integration
- **Image Transformations:** https://cloudinary.com/documentation/image_transformations

---

**✅ Setup Complete!** Just add the credentials to `.env`, run `npm install`, and restart the server!
