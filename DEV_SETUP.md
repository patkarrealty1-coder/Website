# Development Setup Guide

## Running Both Frontend and Backend Together

### Option 1: Using NPM Script (Recommended)

Simply run this command from the root directory:

```bash
npm run dev
```

This will start both:
- **Backend API** on `http://localhost:5000`
- **Frontend** on `http://localhost:3000`

### Option 2: Using Batch File (Windows)

Double-click the `start-dev.bat` file or run:

```bash
start-dev.bat
```

### Option 3: Manual Start (Separate Terminals)

If you prefer to run them separately:

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

## First Time Setup

If you haven't installed dependencies yet, run:

```bash
npm run install-all
```

This will install dependencies for:
- Root project
- Backend
- Frontend

## Available Scripts

- `npm run dev` - Run both frontend and backend concurrently
- `npm run backend` - Run only backend
- `npm run frontend` - Run only frontend
- `npm run install-all` - Install all dependencies
- `npm run build` - Build frontend for production

## Stopping the Servers

Press `Ctrl + C` in the terminal to stop both servers.

## Ports

- Backend API: `http://localhost:5000`
- Frontend: `http://localhost:3000`

## Environment Variables

Make sure you have `.env` files set up:

**backend/.env:**
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

**frontend/.env (if needed):**
```
VITE_API_URL=http://localhost:5000/api
```

## Troubleshooting

### Port Already in Use

If you get a port conflict error:

**Backend (Port 5000):**
- Change the PORT in `backend/.env`
- Or kill the process using port 5000

**Frontend (Port 5173):**
- Vite will automatically try the next available port
- Or specify a different port in `frontend/vite.config.js`

### Dependencies Not Installed

Run:
```bash
npm run install-all
```

### Backend Not Connecting to Database

Check your MongoDB connection string in `backend/.env`

## Development Workflow

1. Start both servers: `npm run dev`
2. Open browser to `http://localhost:5173`
3. Make changes to code
4. Frontend will hot-reload automatically
5. Backend will restart automatically (using nodemon)
6. Press `Ctrl + C` to stop when done

## Notes

- The frontend uses Vite for fast hot module replacement (HMR)
- The backend uses nodemon for automatic restarts on file changes
- Both servers run concurrently in the same terminal window
- Color-coded output helps distinguish between frontend and backend logs
