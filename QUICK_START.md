# 🚀 Quick Start Guide

## Start Development Servers

### ⚡ Fastest Way

Run this single command from the root directory:

```bash
npm run dev
```

That's it! Both servers will start automatically.

---

## 📋 What Happens

When you run `npm run dev`:

1. ✅ Backend starts on `http://localhost:5000`
2. ✅ Frontend starts on `http://localhost:3000`
3. ✅ Both run in the same terminal
4. ✅ Auto-reload on file changes
5. ✅ Browser opens automatically

---

## 🌐 Access Your App

Open your browser and go to:

**Frontend:** http://localhost:3000

**Backend API:** http://localhost:5000/api

---

## 🛑 Stop Servers

Press `Ctrl + C` in the terminal

---

## 📁 Project Structure

```
patkars-realty/
├── backend/          # Node.js + Express API
├── frontend/         # React + Vite
├── package.json      # Root scripts
└── start-dev.bat     # Windows batch file
```

---

## 🔧 Alternative Methods

### Windows Batch File
```bash
start-dev.bat
```

### PowerShell
```bash
.\start-dev.ps1
```

### Separate Terminals
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

---

## 💡 Tips

- Frontend has hot reload - changes appear instantly
- Backend restarts automatically with nodemon
- Check console for any errors
- Make sure MongoDB is running if using database

---

## ❓ Need Help?

See `DEV_SETUP.md` for detailed setup instructions and troubleshooting.
