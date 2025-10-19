# 🚨 QUICK FIX - Get Server Running Now!

## ✅ Your `backend/.env` File MUST Have These:

Open `backend/.env` and make sure it has ALL of these:

```env
# Server
PORT=3000
NODE_ENV=development

# MongoDB (REQUIRED)
MONGODB_URI=your-mongodb-connection-string

# JWT Secret (REQUIRED)
JWT_SECRET=your-secret-key-here

# Google Gemini API (REQUIRED for AI features)
GOOGLE_API_KEY=your-gemini-api-key-here

# Google OAuth (REQUIRED for Google Sign-In)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Cloudinary (OPTIONAL - for now, not needed to run)
# CLOUDINARY_CLOUD_NAME=dscivcykv
# CLOUDINARY_API_KEY=696983266282494
# CLOUDINARY_API_SECRET=ImSzOYAnM4nmD7Wb-AK_oByPD38
```

---

## 🔑 Get Google Gemini API Key (MOST IMPORTANT!)

**The server won't work without this!**

1. Go to: https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key (starts with `AIza...`)
4. Add to `.env`: `GOOGLE_API_KEY=AIza...`

---

## 🚀 Changes Made:

1. ✅ **Upgraded to Gemini 2.0 Flash** (`gemini-2.0-flash-exp`)
   - Faster responses
   - Better quality
   - More accurate

2. ✅ **Fixed Server Crash**
   - Removed Cloudinary imports (was causing crash)
   - Cloudinary can be added later

3. ✅ **Better Logging**
   - Shows "Gemini 2.0" in logs
   - Clear error messages

---

## ✅ Restart Server:

```bash
# Make sure you're in backend folder
cd backend

# Stop server (Ctrl+C if running)

# Start server
npm run dev
```

---

## 🎯 Expected Output:

```
🔍 Environment check:
   PORT: 3000
   MONGODB_URI: ✅ Present
   JWT_SECRET: ✅ Present
🚀 Server running on 3000
✅ MongoDB connected successfully
```

**NO warnings about GOOGLE_API_KEY!**

---

## ❌ If You See This:

```
⚠️ WARNING: GOOGLE_API_KEY is not set in .env file
```

**Fix:** Add `GOOGLE_API_KEY=your-key-here` to `backend/.env`

---

## 🧪 Test Gemini 2.0:

1. Start backend: `npm run dev`
2. Start frontend: `npm run dev` (in client folder)
3. Open: http://localhost:5173
4. Login to your account
5. Try the chat - should see:
   ```
   💬 Gemini 2.0 chat request: your message...
   ✅ Gemini chat response: ...
   ```

---

## 📝 Quick Checklist:

- [ ] `backend/.env` file exists
- [ ] `GOOGLE_API_KEY` is in `.env` (get from aistudio.google.com)
- [ ] `MONGODB_URI` is in `.env`
- [ ] `JWT_SECRET` is in `.env`
- [ ] Ran `npm install` in backend
- [ ] Server starts without errors
- [ ] No "API KEY" warnings

---

**🎉 That's it! The server should now run with Gemini 2.0 Flash!**
