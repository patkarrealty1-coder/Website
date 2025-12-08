# 🚀 Unified Port 4000 Setup - MongoDB Images Fixed

## Quick Start (Everything on Port 4000)

### Option 1: PowerShell Script (Recommended)
```powershell
./start-unified.ps1
```

### Option 2: npm Command
```bash
npm install  # Install cross-env dependency
npm run unified
```

### Option 3: Manual Steps
```bash
npm run build
cd backend
npm start
```

## 📍 Access Everything at Port 4000

- **🏠 Main Website**: http://localhost:4000
- **👨‍💼 Admin Panel**: http://localhost:4000/admin
- **🔧 API Endpoints**: http://localhost:4000/api/*
- **📊 Health Check**: http://localhost:4000/api/health
- **🖼️ Images**: All MongoDB images load properly

## ✅ What's Fixed for MongoDB Images

1. **Proper Static File Serving**: Enhanced static file handling with image headers
2. **CORS Configuration**: Correctly set for port 4000
3. **API Calls**: All frontend calls use localhost:4000
4. **Image Headers**: Proper cache and CORS headers for images
5. **Route Handling**: API routes don't conflict with static files

## 🔧 How It Works

1. **Frontend Build**: React app builds to `frontend/dist`
2. **Backend Serves All**: Express serves both API and built frontend
3. **Single Port**: Everything on port 4000
4. **Image Loading**: MongoDB images load through proper static serving
5. **Route Priority**: 
   - `/api/*` → Backend API
   - `/uploads/*` → Static files
   - Everything else → React app

## 🖼️ MongoDB Image Loading

Your MongoDB properties have images stored as URLs like:
```javascript
{
  images: [
    {
      url: "https://images.unsplash.com/photo-xyz...",
      caption: "Property Image"
    }
  ]
}
```

These now load properly because:
- ✅ Correct CORS headers
- ✅ Proper static file serving
- ✅ No port conflicts
- ✅ Enhanced image handling

## 📝 Available Scripts

```bash
# Unified mode (everything on port 4000)
npm run unified          # Build and start unified server
./start-unified.ps1      # PowerShell script

# Development mode (separate ports)
npm run dev              # Frontend: 3000, Backend: 5000
npm run frontend         # Start only frontend
npm run backend          # Start only backend

# Build and setup
npm run build            # Build frontend only
npm run install-all      # Install all dependencies
```

## 🐛 Troubleshooting

### Images Not Loading?
1. **Check MongoDB Data**:
   ```bash
   cd backend
   node debug-images.js
   ```

2. **Fix Image URLs**:
   ```bash
   cd backend
   node fix-images.js
   ```

3. **Verify Server**:
   - Visit: http://localhost:4000/api/health
   - Should show server status

### Port Issues?
```bash
# Kill any process on port 4000
netstat -ano | findstr :4000
taskkill /PID <PID_NUMBER> /F
```

### Build Issues?
```bash
cd frontend
npm install
npm run build
```

## 🎯 Expected Results

After running `npm run unified`:
- ✅ Server starts on port 4000
- ✅ Frontend loads at http://localhost:4000
- ✅ All MongoDB images display correctly
- ✅ Admin panel works at http://localhost:4000/admin
- ✅ API calls work properly
- ✅ No CORS errors

## 🔄 Development vs Production

### Development (Separate Ports):
```bash
npm run dev
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

### Unified (Single Port):
```bash
npm run unified
# Everything: http://localhost:4000
```

## 📊 MongoDB Connection

The server connects to:
```
mongodb://localhost:27017/patkars-realty
```

Your existing MongoDB data with images will work perfectly with this setup!

## 🎉 Success Indicators

When everything is working:
1. Server starts without errors
2. Website loads at http://localhost:4000
3. Property images from MongoDB display
4. Admin panel is accessible
5. All API endpoints respond
6. No console errors

Your MongoDB images should now load perfectly on the unified port 4000! 🖼️✨