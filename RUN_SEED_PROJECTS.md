# 🚀 Run This to Seed Completed Projects

## ⚠️ Important: MongoDB Must Be Running First!

Before seeding, make sure MongoDB is running.

## Step-by-Step Instructions

### 1. Start MongoDB
Make sure your MongoDB server is running. Check your MongoDB setup guide.

### 2. Run the Seed Script

**Option A: PowerShell Script (Easiest)**
```powershell
.\seed-projects.ps1
```

**Option B: NPM Command**
```powershell
cd backend
npm run seed:projects
cd ..
```

**Option C: Direct Node Command**
```powershell
node backend/seedProjects.js
```

### 3. Verify Success

You should see output like:
```
✅ Connected to MongoDB
🗑️  Cleared existing projects
✅ Successfully seeded 6 projects

📋 Created Projects:
1. Skyline Residences - Mumbai (2023)
2. Green Valley Apartments - Mumbai (2022)
3. Ocean View Towers - Mumbai (2023)
4. Heritage Plaza - Mumbai (2021)
5. Tech Park Residences - Mumbai (2023)
6. Royal Gardens - Mumbai (2022)

🎉 Database seeding completed!
```

### 4. View the Projects

**Homepage:**
1. Go to `http://localhost:3000`
2. Scroll to "Completed Projects" section
3. You'll see all 6 demo projects!

**Admin Panel:**
1. Go to `http://localhost:3000/management`
2. Login as admin
3. Click "Completed Projects" card
4. Manage all projects

## What Gets Added

### 6 Demo Completed Projects:

1. **Skyline Residences** - 25 floors, 120 units (Featured)
2. **Green Valley Apartments** - 18 floors, 80 units (Featured)
3. **Ocean View Towers** - 30 floors, 150 units (Featured)
4. **Heritage Plaza** - 12 floors, 45 units
5. **Tech Park Residences** - 28 floors, 200 units (Featured)
6. **Royal Gardens** - 15 floors, 95 units

All projects include:
- ✅ Name and description
- ✅ Location (Mumbai, Maharashtra)
- ✅ Year completed
- ✅ Number of units
- ✅ Status: "Completed"
- ✅ High-quality images from Unsplash
- ✅ Stats (floors, parking, amenities)
- ✅ Featured flag

## Troubleshooting

### Error: Cannot connect to MongoDB
**Problem**: MongoDB is not running

**Solution**: Start MongoDB first
- Check your MongoDB setup guide
- Make sure MongoDB service is running
- Verify connection string in `.env` file

### Error: Module not found
**Problem**: Dependencies not installed

**Solution**: Install dependencies
```powershell
cd backend
npm install
cd ..
```

### Projects not showing
**Problem**: Backend or frontend not running

**Solution**: Start both servers
```powershell
# Terminal 1: Start backend
cd backend
npm start

# Terminal 2: Start frontend
cd frontend
npm run dev
```

## Quick Commands

```powershell
# Seed projects (recommended)
.\seed-projects.ps1

# Or use NPM
cd backend
npm run seed:projects

# Start backend
cd backend
npm start

# Start frontend (in new terminal)
cd frontend
npm run dev
```

## Files Reference

- `backend/seedProjects.js` - Seed script with 6 demo projects
- `seed-projects.ps1` - PowerShell runner script
- `SEED_PROJECTS_GUIDE.md` - Detailed guide
- `RUN_SEED_PROJECTS.md` - This quick start guide

## Ready to Seed?

1. ✅ Make sure MongoDB is running
2. ✅ Run: `.\seed-projects.ps1`
3. ✅ Visit: `http://localhost:3000`
4. ✅ See your completed projects!

---

**Quick Start Command:**
```powershell
.\seed-projects.ps1
```

🎉 That's it! Your database will have 6 demo completed projects ready to display!
