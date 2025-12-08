# 🏠 Patkar's Realty - Unified Server Setup (Port 4000)

This guide explains how to run your frontend, backend, and admin panel on a single port 4000 for easier development and deployment.

## 🚀 Quick Start (Unified Mode)

### Option 1: Using PowerShell Script (Recommended)
```powershell
./start-unified.ps1
```

### Option 2: Using Batch File (Windows CMD)
```cmd
start-unified.bat
```

### Option 3: Using npm Scripts
```bash
# Install cross-env first
npm install

# Start unified server
npm run unified
```

## 📍 Access Points

Once the unified server is running, everything will be available at **http://localhost:4000**:

- **🏠 Frontend (Main Website)**: http://localhost:4000
- **👨‍💼 Admin Panel**: http://localhost:4000/admin
- **🔧 API Endpoints**: http://localhost:4000/api/*
- **📊 Health Check**: http://localhost:4000/api/health

## 🔧 How It Works

1. **Frontend Build**: The React frontend is built into static files
2. **Backend Serves All**: The Express server serves both API routes and the frontend
3. **Single Port**: Everything runs on port 4000 (configurable via PORT env variable)
4. **Route Handling**: 
   - `/api/*` routes go to the backend API
   - All other routes serve the React app (for client-side routing)

## 📁 Project Structure
```
patkars-realty/
├── frontend/           # React frontend
│   ├── dist/          # Built frontend files (created after build)
│   └── src/           # Source code
├── backend/           # Express backend
│   ├── server.js      # Main server file (port 4000)
│   └── routes/        # API routes
├── start-unified.ps1  # PowerShell startup script
├── start-unified.bat  # Batch startup script
└── package.json       # Root package.json with unified scripts
```

## 🛠️ Development vs Unified Mode

### Development Mode (Separate Ports)
- Frontend: http://localhost:3000 (Vite dev server)
- Backend: http://localhost:4000 (Express server)
- Use: `npm run dev`

### Unified Mode (Single Port)
- Everything: http://localhost:4000 (Express serves built frontend)
- Use: `npm run unified` or `./start-unified.ps1`

## 🔧 Configuration

### Environment Variables
- `NODE_ENV=production`: Enables production optimizations
- `SERVE_FRONTEND=true`: Forces backend to serve frontend even in development
- `PORT=4000`: Server port (default: 4000)

### Custom Port
To run on a different port:
```bash
PORT=8080 npm run unified
```

## 📝 Available Scripts

```bash
# Development (separate servers)
npm run dev              # Start both frontend and backend separately
npm run frontend         # Start only frontend (port 3000)
npm run backend          # Start only backend (port 4000)

# Unified (single server)
npm run unified          # Build frontend and start unified server on port 4000
npm run start:unified    # Same as above
npm run build            # Build frontend only
npm run start            # Start backend only (assumes frontend is built)

# Setup
npm run install-all      # Install all dependencies
```

## 🐛 Troubleshooting

### Build Errors
If the frontend build fails:
```bash
cd frontend
npm install
npm run build
```

### Port Already in Use
If port 4000 is busy:
```bash
PORT=8080 npm run unified
```

### Missing Dependencies
Install all dependencies:
```bash
npm run install-all
```

### API Not Working
Check if backend routes are prefixed with `/api/`:
- ✅ Correct: `http://localhost:4000/api/properties`
- ❌ Wrong: `http://localhost:4000/properties`

## 🎯 Benefits of Unified Setup

1. **Simplified Deployment**: Single server to deploy
2. **No CORS Issues**: Frontend and backend on same origin
3. **Easier Testing**: Test everything on one URL
4. **Production-Like**: Mimics production environment
5. **Single Terminal**: No need to manage multiple terminals
6. **Port 4000**: Easy to remember and commonly available

## 🔄 Switching Between Modes

### To Development Mode:
```bash
npm run dev
```

### To Unified Mode:
```bash
npm run unified
```

The unified setup is perfect for production deployment and testing, while development mode is better for active development with hot reloading.

## 🚀 Quick Commands

```bash
# One-time setup
npm run install-all

# Start unified server (everything on port 4000)
npm run unified

# Or use the PowerShell script
./start-unified.ps1
```

Your entire application will be available at **http://localhost:4000**! 🎉