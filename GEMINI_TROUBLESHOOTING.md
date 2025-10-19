# 🔧 Gemini AI Troubleshooting Guide

## Problem: Gemini Not Responding or Backend Errors

This guide helps you fix issues with Gemini AI features in HealthMate.

---

## ✅ Quick Checklist

Before diving deep, verify these basics:

- [ ] Backend server is running (`npm run dev` in backend folder)
- [ ] Frontend is running (`npm run dev` in client folder)
- [ ] `.env` file exists in backend folder
- [ ] `GOOGLE_API_KEY` is set in backend `.env`
- [ ] No typos in the API key
- [ ] Backend console shows no errors on startup

---

## 🔍 Step-by-Step Diagnosis

### Step 1: Check Backend Logs

When you start the backend (`npm run dev`), you should see:

```
🔍 Environment check:
   PORT: 3000
   MONGODB_URI: ✅ Present
   JWT_SECRET: ✅ Present
```

**If you see:**
```
⚠️  WARNING: GOOGLE_API_KEY is not set in .env file
   Gemini AI features will not work without this key
```

**Fix:** Add `GOOGLE_API_KEY` to your `backend/.env` file.

---

### Step 2: Verify Google API Key

1. **Get your API key:**
   - Go to: https://makersuite.google.com/app/apikey
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the key

2. **Add to backend/.env:**
   ```env
   GOOGLE_API_KEY=AIza...your-key-here
   ```

3. **Restart backend server** (Ctrl+C and run `npm run dev` again)

---

### Step 3: Test API Key Validity

**Method 1: Check Startup Logs**
- If API key is missing, you'll see: `⚠️ WARNING: GOOGLE_API_KEY is not set`
- If API key is present, no warning appears

**Method 2: Test with Simple Chat**
1. Open the app: http://localhost:5173
2. Login to your account
3. Try the text chat (not PDF)
4. Send a simple message like "Hello"

**Expected behavior:**
- Backend logs show: `💬 Gemini chat request: Hello`
- Then: `✅ Gemini chat response: ...`
- Frontend displays AI response

---

### Step 4: Common Error Messages & Fixes

#### Error: "Gemini API not configured"

**Frontend shows:**
```
❌ Error: GOOGLE_API_KEY is missing in environment variables
```

**Backend logs show:**
```
⚠️  WARNING: GOOGLE_API_KEY is not set in .env file
```

**Fix:**
1. Open `backend/.env`
2. Add: `GOOGLE_API_KEY=your-actual-key`
3. Restart backend server

---

#### Error: "Failed to analyze PDF"

**Possible causes:**

**1. Invalid PDF file**
- Make sure the PDF contains text (not just images)
- Try a different PDF file
- Check backend logs for: `✅ Extracted X characters from PDF`

**2. API quota exceeded**
- Gemini has usage limits
- Check your quota at: https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas
- Wait or request quota increase

**3. API key permissions**
- Make sure "Generative Language API" is enabled
- Go to: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com
- Click "Enable"

---

#### Error: "Cannot read properties of null"

**Frontend error in console:**
```
TypeError: Cannot read properties of null (reading 'getGenerativeModel')
```

**Cause:** Backend couldn't initialize Gemini because API key is missing

**Fix:** Set `GOOGLE_API_KEY` in `backend/.env` and restart

---

#### Error: "Network request failed" or "Failed to fetch"

**Possible causes:**

**1. Backend not running**
- Check if backend is running on port 3000
- Open: http://localhost:3000
- Should see: "Server is running."

**2. Wrong API URL in frontend**
- Check `client/.env`:
  ```env
  VITE_API_BASE_URL=http://localhost:3000
  ```
- Must match backend port

**3. CORS issues**
- Backend should have this in `server.js`:
  ```javascript
  cors({
    origin: ["http://localhost:5173", ...],
    credentials: true,
  })
  ```

---

### Step 5: Test Each Component

#### Test 1: Text Chat
1. Go to Gemini Chat tab
2. Send: "What is diabetes?"
3. Watch backend console for:
   ```
   💬 Gemini chat request: What is diabetes?...
   ✅ Gemini chat response: ...
   ```

#### Test 2: PDF Analysis
1. Go to PDF Analyzer tab
2. Upload a simple text PDF
3. Add prompt: "Summarize this"
4. Watch backend console for:
   ```
   📄 Processing PDF: filename.pdf
   ✅ Extracted X characters from PDF
   🤖 Calling Gemini AI...
   ✅ Gemini response received: ...
   ```

---

## 🔧 Advanced Debugging

### Check Installed Packages

In `backend` folder, run:
```bash
npm list @google/generative-ai
```

Should show:
```
@google/generative-ai@0.21.0 (or similar version)
```

If not found:
```bash
npm install @google/generative-ai
```

---

### Verify Backend Code

Check `backend/server.js` around line 56:

```javascript
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
if (!GOOGLE_API_KEY) {
  console.error("⚠️  WARNING: GOOGLE_API_KEY is not set");
}
const genAI = GOOGLE_API_KEY ? new GoogleGenerativeAI(GOOGLE_API_KEY) : null;
```

This should be present after the fixes.

---

### Test API Key Directly

Create a test file `backend/test-gemini.js`:

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function test() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Say hello");
    const response = await result.response;
    console.log("✅ Success:", response.text());
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

test();
```

Run:
```bash
node test-gemini.js
```

If successful: API key is valid
If error: Check the error message

---

## 📋 Environment Variables Checklist

### Backend `.env` must have:

```env
# Required for Gemini
GOOGLE_API_KEY=AIza...

# Required for authentication
JWT_SECRET=your-secret-key
MONGODB_URI=mongodb+srv://...

# Required for Google OAuth (if using)
GOOGLE_CLIENT_ID=...apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=...

# Server config
PORT=3000
NODE_ENV=development
```

### Frontend `.env` must have:

```env
VITE_API_BASE_URL=http://localhost:3000
```

---

## 🚨 Still Not Working?

### 1. Clear Everything and Restart

```bash
# Stop both servers (Ctrl+C)

# Backend
cd backend
rm -rf node_modules
npm install
npm run dev

# Frontend (new terminal)
cd client
rm -rf node_modules
npm install
npm run dev
```

### 2. Check Browser Console

Open browser DevTools (F12):
- **Console tab:** Look for JavaScript errors
- **Network tab:** Check if API requests are failing
  - Should see POST to `/api/gemini` or `/api/gemini/pdf`
  - Click on request to see details
  - Check Response tab for error messages

### 3. Backend Console Errors

Watch for:
- Import errors (package not installed)
- API key errors (invalid or missing)
- Network errors (can't reach Google API)
- Parsing errors (PDF extraction failed)

### 4. Common Mistakes

❌ **Wrong:** API key in `client/.env`
✅ **Correct:** API key in `backend/.env`

❌ **Wrong:** Hardcoded API key in code
✅ **Correct:** API key in `.env` file

❌ **Wrong:** Not restarting server after changing `.env`
✅ **Correct:** Always restart after `.env` changes

❌ **Wrong:** Using old package `@google/genai`
✅ **Correct:** Using `@google/generative-ai`

---

## 📊 Success Indicators

You'll know it's working when:

1. ✅ Backend starts without warnings
2. ✅ No errors in backend console
3. ✅ Text chat returns AI responses
4. ✅ PDF upload shows processing logs
5. ✅ Frontend displays AI-generated content
6. ✅ No error messages in red

---

## 🆘 Get Help

If still stuck:

1. **Check backend logs** carefully
2. **Check browser console** for errors
3. **Verify API key** is valid
4. **Test with simple text chat** first
5. **Ensure all packages installed** (`npm install`)
6. **Restart both servers**

---

## 📞 Quick Reference

| Component | Port | URL |
|-----------|------|-----|
| Backend | 3000 | http://localhost:3000 |
| Frontend | 5173 | http://localhost:5173 |
| Google AI Studio | - | https://makersuite.google.com/app/apikey |
| Google Cloud Console | - | https://console.cloud.google.com |

---

**Last Updated:** After Gemini fixes applied
**Status:** ✅ All fixes implemented with proper error handling
