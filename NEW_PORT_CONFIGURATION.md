# 🚀 New Port Configuration

## Port Changes Applied

✅ **Backend**: Changed from port 4000 → **4001**
✅ **Frontend**: Changed from port 3000 → **3001**

## Files Updated

### Backend Configuration
- `backend/.env` - Updated PORT=4001 and FRONTEND_URL
- `backend/server.js` - Updated CORS origin and default port
- All startup scripts updated

### Frontend Configuration  
- `frontend/vite.config.js` - Updated port and proxy target
- `frontend/src/utils/constants.js` - Updated API_BASE_URL

### Startup Scripts
- `start-dev.ps1` - Updated port displays
- `start-clean.ps1` - Updated ports and process cleanup
- `start-clean.bat` - Updated ports and process cleanup
- `start-backend-only.bat` - Updated backend port
- `start-frontend-only.bat` - Updated frontend port

## 🌐 New URLs

**Backend API**: http://localhost:4001
- Health Check: http://localhost:4001/api/health
- Debug Endpoint: http://localhost:4001/api/debug

**Frontend**: http://localhost:3001
- Main App: http://localhost:3001

## 🚀 How to Start

**Option 1: Clean Start (Recommended)**
```bash
.\start-clean.ps1
```

**Option 2: Regular Start**
```bash
npm run dev
```

**Option 3: Individual Servers**
```bash
# Backend only (port 4001)
.\start-backend-only.bat

# Frontend only (port 3001)  
.\start-frontend-only.bat
```

## ✅ Verification

After starting, verify:
1. Backend: http://localhost:4001/api/health
2. Frontend: http://localhost:3001
3. Check browser console for any connection errors

## 🔧 Environment Variables

Your backend `.env` now has:
```env
PORT=4001
FRONTEND_URL=http://localhost:3001
```

The frontend proxy automatically forwards `/api` requests to `http://localhost:4001`.

## 📝 Notes

- Old build files in `frontend/dist` still reference port 4000 - these will be updated on next build
- All API calls now go through the Vite proxy or use the updated constants
- CORS is configured to allow requests from port 3001

Your servers are now configured to run on the new ports! 🎉