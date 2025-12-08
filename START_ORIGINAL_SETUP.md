# 🚀 Original Working Setup - Separate Ports

## Quick Start (Recommended)

### Option 1: Start Both Servers (Recommended)
```bash
npm run dev
```
This starts:
- **Frontend**: http://localhost:3000 (Vite dev server)
- **Backend**: http://localhost:5000 (Express API server)

### Option 2: Start Servers Separately

#### Terminal 1 - Backend:
```bash
npm run backend
# Backend will run on http://localhost:5000
```

#### Terminal 2 - Frontend:
```bash
npm run frontend  
# Frontend will run on http://localhost:3000
```

## 📍 Access Points

- **🏠 Main Website**: http://localhost:3000
- **👨‍💼 Admin Panel**: http://localhost:3000/admin
- **🔧 API Endpoints**: http://localhost:5000/api/*
- **📊 Health Check**: http://localhost:5000/api/health

## ✅ Why This Setup Works Better

1. **Hot Reloading**: Frontend changes update instantly
2. **No CORS Issues**: Properly configured between ports
3. **Separate Concerns**: Frontend and backend run independently
4. **Better Development**: Each server can be restarted independently
5. **Image Loading**: External images load properly with CORS setup

## 🔧 Configuration

- **Frontend Port**: 3000 (Vite default)
- **Backend Port**: 5000 (Express server)
- **CORS**: Backend allows requests from localhost:3000
- **API Calls**: Frontend makes requests to localhost:5000/api/*

## 🐛 Troubleshooting

### If Frontend Won't Start:
```bash
cd frontend
npm install
npm run dev
```

### If Backend Won't Start:
```bash
cd backend
npm install
npm run dev
```

### If Images Don't Load:
- Check that backend is running on port 5000
- Verify CORS is allowing localhost:3000
- Images should load from external URLs properly

### Port Already in Use:
- Frontend (3000): Usually auto-assigns to 3001
- Backend (5000): Change PORT in backend/.env or kill process

## 📝 Available Scripts

```bash
npm run dev              # Start both servers (recommended)
npm run frontend         # Start only frontend (port 3000)
npm run backend          # Start only backend (port 5000)
npm run install-all      # Install all dependencies
npm run build            # Build frontend for production
```

## 🎯 Expected Behavior

- Frontend runs on port 3000 with hot reloading
- Backend API runs on port 5000
- All images and API calls work properly
- No CORS errors
- Fast development experience

This is the original working setup that was functioning before the port unification! 🎉