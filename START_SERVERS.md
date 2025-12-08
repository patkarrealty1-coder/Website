# 🚀 Start Development Servers

## Quick Start

Open your terminal in the project root and run:

```bash
npm run dev
```

## What You'll See

```
========================================
  Patkar's Realty Development Servers
========================================

Backend API:  http://localhost:5000
Frontend:     http://localhost:3000

Press Ctrl+C to stop both servers
========================================

[BACKEND]  Server running on port 5000
[BACKEND]  MongoDB connected successfully
[FRONTEND] VITE v4.4.5  ready in 1234 ms
[FRONTEND] ➜  Local:   http://localhost:3000/
[FRONTEND] ➜  Network: http://192.168.1.x:3000/
```

## Access Points

### 🌐 Frontend (React App)
**URL**: http://localhost:3000

This is your main application where users will interact with the website.

### 🔌 Backend API
**URL**: http://localhost:5000/api

API endpoints for:
- `/api/properties` - Property listings
- `/api/users` - User management
- `/api/contact` - Contact form
- And more...

## Features

✅ **Auto-reload** - Changes to code automatically refresh
✅ **Color-coded** - Backend (blue) and Frontend (magenta) logs
✅ **Single terminal** - Both servers in one window
✅ **Auto-open** - Browser opens automatically to port 3000
✅ **API proxy** - Frontend `/api/*` requests go to backend

## Alternative Methods

### Method 1: Batch File (Windows)
```bash
start-dev.bat
```

### Method 2: PowerShell
```bash
.\start-dev.ps1
```

### Method 3: Separate Terminals

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Stopping Servers

Press `Ctrl + C` in the terminal

Both servers will stop gracefully.

## First Time Setup

If this is your first time running:

```bash
# Install all dependencies
npm run install-all

# Then start servers
npm run dev
```

## Troubleshooting

### Port 3000 Already in Use

**Option 1**: Kill the process
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Option 2**: Change the port in `frontend/vite.config.js`

### Port 5000 Already in Use

**Option 1**: Kill the process
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Option 2**: Change PORT in `backend/.env`

### Backend Not Connecting

1. Check MongoDB is running
2. Verify `.env` file exists in backend folder
3. Check `MONGODB_URI` in `.env`

### Frontend Can't Reach Backend

1. Ensure backend is running on port 5000
2. Check proxy configuration in `frontend/vite.config.js`
3. Restart both servers

### Browser Doesn't Open

Manually open: http://localhost:3000

## Development Workflow

1. **Start servers**
   ```bash
   npm run dev
   ```

2. **Make changes**
   - Edit files in `frontend/src` or `backend/`
   - Changes auto-reload

3. **Test in browser**
   - Frontend: http://localhost:3000
   - API: http://localhost:5000/api

4. **Stop servers**
   - Press `Ctrl + C`

## Environment Check

Before starting, ensure you have:

- ✅ Node.js installed (v16+)
- ✅ MongoDB running (local or cloud)
- ✅ Dependencies installed (`npm run install-all`)
- ✅ `.env` file in backend folder

## Quick Commands

```bash
# Start both servers
npm run dev

# Install all dependencies
npm run install-all

# Build frontend for production
npm run build

# Start backend only
npm run backend

# Start frontend only
npm run frontend
```

## Port Summary

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Backend | 5000 | http://localhost:5000 |
| API Proxy | - | /api/* → :5000/api/* |

## Success Indicators

You'll know everything is working when you see:

1. ✅ Backend log: "Server running on port 5000"
2. ✅ Backend log: "MongoDB connected successfully"
3. ✅ Frontend log: "Local: http://localhost:3000"
4. ✅ Browser opens automatically
5. ✅ No error messages in terminal

## Next Steps

Once servers are running:

1. Open http://localhost:3000 in your browser
2. Explore the landing page
3. Check property listings
4. Test the contact form
5. Make changes and see them live!

---

**Ready to start?** Just run:

```bash
npm run dev
```

🎉 **Happy coding!**
