# 🚀 Startup Guide - Avoid Connection Errors

## The Problem You're Seeing
The "Failed to connect to server" error happens when:
- Backend isn't running on port 4001
- Frontend can't reach the backend API
- Port conflicts or wrong configuration

## ✅ Solution: Proper Startup Order

### Step 1: Clean Start (Recommended)
```powershell
.\start-servers-safe.ps1
```
This script will:
- Kill any existing processes
- Start backend first (port 4001)
- Wait for backend to initialize
- Start frontend (port 3001)
- Open separate windows for each server

### Step 2: Verify Backend is Working
```powershell
.\quick-test-backend.ps1
```
Should show:
```
✅ Backend Status: OK
✅ MongoDB: Connected
✅ Port: 4001
```

### Step 3: Access Your Application
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:4001/api/health

## 🔧 Manual Startup (Alternative)

If the script doesn't work, start manually:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Wait for: `✅ Server running on port 4001`

**Terminal 2 - Frontend:**
```bash
cd frontend  
npm run dev
```
Wait for: `Local: http://localhost:3001`

## 🚨 Troubleshooting Connection Errors

### Error: "Failed to connect to server"
**Cause**: Backend not running or wrong port
**Fix**: 
1. Check backend is running: http://localhost:4001/api/health
2. Restart backend if needed

### Error: "EADDRINUSE: port already in use"
**Cause**: Port conflict
**Fix**:
```powershell
# Kill all node processes
Get-Process -Name node | Stop-Process -Force

# Then restart
.\start-servers-safe.ps1
```

### Error: "MongoDB connection failed"
**Cause**: Database connection issue
**Fix**: Check your `.env` file has correct MONGODB_URI

## 📋 Checklist Before Starting

✅ Backend `.env` file exists with PORT=4001
✅ Frontend `vite.config.js` has port 3001 and proxy to 4001
✅ No other processes using ports 3001 or 4001
✅ MongoDB connection string is valid

## 🎯 Expected Results

When everything works correctly:

**Backend Console:**
```
✅ MongoDB Connected: ac-qhk4kid-shard-00-00.kljhvxf.mongodb.net
✅ Server running on port 4001
🌍 Environment: development
```

**Frontend Console:**
```
Local:   http://localhost:3001/
Network: use --host to expose
```

**Browser:**
- No "Failed to connect" errors
- Blog section loads properly
- All API calls work

## 🚀 Quick Commands

```bash
# Safe startup
.\start-servers-safe.ps1

# Test backend only
.\quick-test-backend.ps1

# Kill all and restart
Get-Process -Name node | Stop-Process -Force
.\start-servers-safe.ps1
```

Follow this guide and you won't see the connection error anymore! 🎉