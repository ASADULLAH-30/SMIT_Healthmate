# HealthMate AI - Medical Health Assistant

A full-stack health assistant application with AI-powered medical document analysis using Google's Gemini API.

## 🚀 Features

- **User Authentication**: Email/password and Google OAuth login
- **AI Chat**: Interact with Gemini AI for health-related queries
- **PDF Analysis**: Upload and analyze medical documents using AI
- **Protected Routes**: Secure user dashboard
- **Dark/Light Theme**: Toggle between dark and light modes
- **Responsive Design**: Beautiful UI with Tailwind CSS and Framer Motion

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** account (MongoDB Atlas recommended)
- **Google Cloud Console** account (for OAuth and Gemini API)

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd healthmate
```

### 2. Backend Setup

#### Install Dependencies

```bash
cd backend
npm install
```

#### Configure Environment Variables

1. Copy the example environment file:
```bash
copy .env.example .env
```

2. Edit `.env` and fill in the following values:

```env
# App Configuration
PORT=3000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# JWT Secret (generate a random strong secret)
JWT_SECRET=your-super-secret-jwt-key-here

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Google Gemini API Key
GOOGLE_API_KEY=your-gemini-api-key-here
```

#### How to Get Required Credentials:

**MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string from "Connect" → "Connect your application"
5. Replace `<username>`, `<password>`, and `<database>` with your values

**Google OAuth (Client ID & Secret):**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure OAuth consent screen
6. Add authorized redirect URIs:
   - `http://localhost:5173` (for development)
   - Your production URL (if deploying)
7. Copy Client ID and Client Secret

**Google Gemini API Key:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Get API Key"
3. Create a new API key or use an existing one
4. Copy the API key

**JWT Secret:**
- Generate a strong random string (at least 32 characters)
- You can use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

#### Start Backend Server

```bash
npm run dev
```

The backend will run on `http://localhost:3000`

### 3. Frontend Setup

#### Navigate to Client Directory

```bash
cd ../client
```

#### Install Dependencies

```bash
npm install
```

#### Configure Environment Variables

1. Create a `.env` file in the client directory:

```bash
echo. > .env
```

2. Add the following configuration:

```env
VITE_API_BASE_URL=http://localhost:3000
```

For production, change this to your deployed backend URL.

#### Start Frontend Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🎯 Running the Application

1. **Start MongoDB** (if running locally, or ensure MongoDB Atlas is accessible)

2. **Start Backend Server** (in `backend` directory):
   ```bash
   npm run dev
   ```

3. **Start Frontend Server** (in `client` directory):
   ```bash
   npm run dev
   ```

4. **Open Browser** and navigate to:
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
healthmate/
├── backend/
│   ├── controllers/
│   │   └── authController.js      # Authentication logic
│   ├── models/
│   │   └── User.js                # User schema
│   ├── routes/
│   │   └── authRoutes.js          # Auth endpoints
│   ├── utils/
│   │   └── googleConfig.js        # Google OAuth config
│   ├── server.js                  # Express server
│   ├── package.json
│   └── .env                       # Environment variables
│
├── client/
│   ├── src/
│   │   ├── components/            # React components
│   │   ├── context/               # Context providers
│   │   ├── pages/                 # Page components
│   │   ├── App.jsx                # Main app component
│   │   └── api.js                 # API utilities
│   ├── package.json
│   └── .env                       # Frontend environment variables
│
└── README.md
```

## 🔧 Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🐛 Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   - Verify your MongoDB URI is correct
   - Ensure your IP address is whitelisted in MongoDB Atlas
   - Check if your database user has proper permissions

2. **Google OAuth Not Working**
   - Verify Client ID in both backend `.env` and frontend `App.jsx`
   - Ensure redirect URIs are properly configured in Google Cloud Console
   - Check if Google+ API is enabled

3. **Gemini API Errors**
   - Verify your API key is valid
   - Ensure you have quota available for Gemini API
   - Check if the API is enabled in your Google Cloud project

4. **Cookie/Session Issues**
   - Ensure both frontend and backend are running
   - Check CORS configuration in `server.js`
   - Verify `withCredentials: true` in API calls

5. **Port Already in Use**
   - Backend: Change `PORT` in `.env`
   - Frontend: Vite will prompt to use a different port automatically

## 🔐 Security Notes

- Never commit `.env` files to version control
- Use strong JWT secrets in production
- Enable HTTPS in production
- Regularly update dependencies
- Use environment-specific configurations

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/google` - Google OAuth callback
- `POST /api/auth/set-password` - Set password for OAuth users

### AI Features
- `POST /api/gemini` - Chat with Gemini AI
- `POST /api/gemini/pdf` - Analyze PDF documents

## 🚀 Deployment

### Backend (Vercel/Heroku/Railway)
1. Set all environment variables in your hosting platform
2. Ensure MongoDB is accessible from your hosting platform
3. Update CORS origins to include your production frontend URL

### Frontend (Vercel/Netlify)
1. Set `VITE_API_BASE_URL` to your production backend URL
2. Build the project: `npm run build`
3. Deploy the `dist` folder

## 📄 License

This project is licensed under the ISC License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please create an issue in the repository.
