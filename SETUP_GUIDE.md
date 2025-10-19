# 🚀 Quick Setup Guide

## Prerequisites Checklist
- [ ] Node.js installed (v16+)
- [ ] MongoDB Atlas account created
- [ ] Google Cloud Console account created

## Step-by-Step Setup (5 minutes)

### 1️⃣ Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2️⃣ Configure Backend Environment

```bash
cd backend
copy .env.example .env
```

Edit `backend/.env` with your credentials:

| Variable | How to Get It |
|----------|---------------|
| `MONGODB_URI` | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) → Create Cluster → Connect |
| `JWT_SECRET` | Run: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `GOOGLE_CLIENT_ID` | [Google Console](https://console.cloud.google.com/) → Credentials → OAuth 2.0 Client ID |
| `GOOGLE_CLIENT_SECRET` | Same as above |
| `GOOGLE_API_KEY` | [AI Studio](https://makersuite.google.com/app/apikey) → Create API Key |

### 3️⃣ Configure Frontend Environment

```bash
cd ../client
echo VITE_API_BASE_URL=http://localhost:3000 > .env
```

### 4️⃣ Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Server running on http://localhost:3000

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
✅ App running on http://localhost:5173

### 5️⃣ Test the Application

1. Open browser: http://localhost:5173
2. Click "Get Started" or "Sign In"
3. Create an account or use Google Sign-In
4. Access the dashboard

## 🔥 Common Issues & Fixes

### Issue: "MongoDB connection error"
**Fix:** 
1. Check if MongoDB URI is correct in `.env`
2. Whitelist your IP in MongoDB Atlas
3. Verify database user credentials

### Issue: "Google OAuth not working"
**Fix:**
1. Verify Client ID matches in:
   - `backend/.env` → `GOOGLE_CLIENT_ID`
   - `client/src/App.jsx` → `GoogleOAuthProvider clientId`
2. Add `http://localhost:5173` to authorized redirect URIs in Google Console

### Issue: "Gemini API error"
**Fix:**
1. Verify API key in `backend/.env`
2. Enable "Generative Language API" in Google Cloud Console
3. Check API quota/limits

### Issue: "Cannot login after signup"
**Fix:**
- Clear browser cookies
- Restart both servers
- Check browser console for errors

## 📝 Environment Variables Quick Reference

### Backend (.env)
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://...
JWT_SECRET=generated-secret-key
GOOGLE_CLIENT_ID=...apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=...
GOOGLE_API_KEY=...
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:3000
```

## ✅ Verification Checklist

After setup, verify:
- [ ] Backend server starts without errors
- [ ] Frontend shows login page
- [ ] Can create new account
- [ ] Can login with email/password
- [ ] Google OAuth works
- [ ] Can access dashboard after login
- [ ] AI chat responds
- [ ] PDF upload works

## 🎯 Next Steps

1. Customize the UI/theme
2. Add more AI features
3. Deploy to production
4. Set up monitoring

## 💡 Tips

- Use **nodemon** for backend hot reload (already configured)
- Use **Vite HMR** for instant frontend updates
- Keep `.env` files secure - never commit them
- Use `.env.example` as template for team members

## 🆘 Need Help?

- Check the main README.md for detailed documentation
- Review error messages in terminal/console
- Verify all environment variables are set correctly
- Ensure all services (MongoDB, Google APIs) are accessible

---

**Good luck! You're all set to start developing! 🎉**
