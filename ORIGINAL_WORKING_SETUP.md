# 🚀 Original Working Setup - Restored

## Quick Start

### Start Both Servers (Recommended)
```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:3000 (Vite dev server)
- **Backend**: http://localhost:5000 (Express API server)

## Access Points

- **🏠 Main Website**: http://localhost:3000
- **👨‍💼 Admin Panel**: http://localhost:3000/admin
- **🔧 API Endpoints**: http://localhost:5000/api/*

## Configuration

- **Frontend Port**: 3000 (Vite default)
- **Backend Port**: 5000 (Express server)
- **CORS**: Backend allows requests from localhost:3000
- **API Calls**: Frontend makes requests to localhost:5000/api/*

## Available Scripts

```bash
npm run dev              # Start both servers
npm run frontend         # Start only frontend (port 3000)
npm run backend          # Start only backend (port 5000)
npm run install-all      # Install all dependencies
npm run build            # Build frontend for production
```

This is the original configuration that was working before any port changes! 🎉