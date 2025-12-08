# Port Configuration Guide

## Current Setup

### Ports
- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`

### Why These Ports?

1. **Port 3000** - Standard React development port
   - Easy to remember
   - Common convention
   - Works with most tutorials

2. **Port 5000** - Standard Node.js/Express port
   - Separate from frontend
   - No conflicts
   - Clear separation of concerns

## Configuration Files

### Frontend Port (3000)

**File**: `frontend/vite.config.js`

```javascript
export default defineConfig({
  server: {
    port: 3000,
    open: true,  // Opens browser automatically
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // Points to backend
        changeOrigin: true
      }
    }
  }
})
```

### Backend Port (5000)

**File**: `backend/.env`

```env
PORT=5000
FRONTEND_URL=http://localhost:3000
```

## How It Works

### API Proxy

When your frontend makes a request to `/api/*`, Vite automatically proxies it to the backend:

```javascript
// Frontend code
fetch('/api/properties')  // Automatically goes to http://localhost:5000/api/properties
```

### CORS Configuration

The backend is configured to accept requests from the frontend:

```javascript
// Backend server.js
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}
```

## Starting Both Servers

### Single Command (Recommended)

```bash
npm run dev
```

This starts:
1. Backend on port 5000
2. Frontend on port 3000
3. Both in the same terminal with color-coded output

### Output Example

```
[BACKEND]  Server running on port 5000
[FRONTEND] Local: http://localhost:3000
[FRONTEND] Network: http://192.168.1.x:3000
```

## Changing Ports

### Change Frontend Port

Edit `frontend/vite.config.js`:

```javascript
server: {
  port: 4000,  // Change to your preferred port
  // ...
}
```

### Change Backend Port

Edit `backend/.env`:

```env
PORT=8000  # Change to your preferred port
```

**Important**: If you change the backend port, also update:
1. `frontend/vite.config.js` proxy target
2. Any API configuration files

## Troubleshooting

### Port Already in Use

**Frontend (3000)**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in vite.config.js
```

**Backend (5000)**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change PORT in .env
```

### Proxy Not Working

1. Check backend is running on port 5000
2. Verify proxy configuration in `vite.config.js`
3. Restart both servers
4. Clear browser cache

### CORS Errors

1. Check `FRONTEND_URL` in `backend/.env`
2. Verify CORS configuration in backend
3. Ensure credentials are set correctly

## Environment Variables

### Frontend

Create `frontend/.env` (optional):

```env
VITE_API_URL=http://localhost:5000/api
```

### Backend

Edit `backend/.env`:

```env
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

## Production Configuration

### Frontend Build

```bash
cd frontend
npm run build
```

Builds to `frontend/dist` - serve on any port

### Backend Production

```bash
cd backend
npm start
```

Uses PORT from `.env` or defaults to 5000

## Network Access

### Access from Other Devices

**Frontend**: `http://YOUR_IP:3000`
**Backend**: `http://YOUR_IP:5000`

Find your IP:
```bash
# Windows
ipconfig

# Look for IPv4 Address
```

### Mobile Testing

1. Connect phone to same WiFi
2. Open `http://YOUR_IP:3000`
3. Backend API accessible at `http://YOUR_IP:5000`

## Docker Configuration (Future)

```yaml
services:
  backend:
    ports:
      - "5000:5000"
  
  frontend:
    ports:
      - "3000:3000"
```

## Summary

| Service | Port | URL | Purpose |
|---------|------|-----|---------|
| Frontend | 3000 | http://localhost:3000 | React app |
| Backend | 5000 | http://localhost:5000 | API server |
| API Proxy | - | /api/* → :5000/api/* | Seamless API calls |

## Quick Reference

```bash
# Start both servers
npm run dev

# Frontend only
cd frontend && npm run dev

# Backend only
cd backend && npm run dev

# Check what's running on ports
netstat -ano | findstr :3000
netstat -ano | findstr :5000
```

---

**Everything is configured and ready to go!** 🚀

Just run `npm run dev` and both servers will start on their respective ports.
