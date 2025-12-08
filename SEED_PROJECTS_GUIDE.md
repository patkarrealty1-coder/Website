# 🌱 Seed Completed Projects - Guide

## Overview
This guide shows you how to add demo completed projects to your database.

## What Gets Added

### 6 Demo Completed Projects:

1. **Skyline Residences** (Mumbai, 2023)
   - 25 floors, 120 units
   - Luxury residential tower with city views
   - Featured project

2. **Green Valley Apartments** (Mumbai, 2022)
   - 18 floors, 80 units
   - Eco-friendly residential complex
   - Featured project

3. **Ocean View Towers** (Mumbai, 2023)
   - 30 floors, 150 units
   - Beachfront luxury towers
   - Featured project

4. **Heritage Plaza** (Mumbai, 2021)
   - 12 floors, 45 units
   - Restored heritage building
   - Regular project

5. **Tech Park Residences** (Mumbai, 2023)
   - 28 floors, 200 units
   - Smart homes near IT hubs
   - Featured project

6. **Royal Gardens** (Mumbai, 2022)
   - 15 floors, 95 units
   - Garden apartments with family amenities
   - Regular project

## How to Seed

### Method 1: PowerShell Script (Easiest)
```powershell
.\seed-projects.ps1
```

### Method 2: NPM Script
```bash
cd backend
npm run seed:projects
```

### Method 3: Direct Node Command
```bash
cd backend
node seedProjects.js
```

## What Happens

1. **Connects to MongoDB**
   - Uses your MONGODB_URI from .env
   - Or defaults to `mongodb://localhost:27017/patkars-realty`

2. **Clears Existing Projects**
   - ⚠️ WARNING: This deletes ALL existing projects
   - Make sure you want to do this!

3. **Inserts 6 Demo Projects**
   - All projects are marked as "Completed"
   - 4 are featured, 2 are regular
   - All have images, stats, and details

4. **Displays Results**
   - Shows list of created projects
   - Confirms successful seeding

## After Seeding

### View Projects
1. **Homepage**: Go to `http://localhost:3000`
   - Scroll to "Completed Projects" section
   - See all 6 projects displayed

2. **Admin Panel**: Go to `http://localhost:3000/management`
   - Login as admin
   - Click "Completed Projects" card
   - See all projects in management view

### Manage Projects
- **Edit**: Click edit icon on any project
- **Delete**: Click delete icon on any project
- **Add New**: Click "Add New Project" button

## Project Data Structure

Each project includes:
```javascript
{
  name: String,
  description: String,
  location: {
    address: String,
    city: String,
    state: String
  },
  year: String,
  units: String,
  status: 'Completed',
  image: {
    url: String (Unsplash image),
    alt: String
  },
  stats: {
    floors: String,
    parking: String,
    amenities: String
  },
  featured: Boolean,
  isActive: true
}
```

## Images

All demo projects use high-quality images from Unsplash:
- Modern residential buildings
- Luxury apartments
- Real estate photography
- Free to use

## Customization

### To Add Your Own Projects:
1. Edit `backend/seedProjects.js`
2. Modify the `projects` array
3. Add/remove/edit projects as needed
4. Run the seed script again

### To Keep Existing Projects:
1. Edit `backend/seedProjects.js`
2. Comment out this line:
   ```javascript
   // await Project.deleteMany({})
   ```
3. This will ADD projects instead of replacing them

## Troubleshooting

### Error: Cannot connect to MongoDB
**Solution**: Make sure MongoDB is running
```bash
# Check if MongoDB is running
mongosh
```

### Error: Module not found
**Solution**: Install dependencies
```bash
cd backend
npm install
```

### Projects not showing on homepage
**Solution**: 
1. Check backend is running on port 4000
2. Check frontend is running on port 3000
3. Check browser console for errors
4. Verify API endpoint: `http://localhost:4000/api/projects`

### Projects showing but no images
**Solution**: 
- Images are from Unsplash (external)
- Check your internet connection
- Images should load automatically

## Commands Reference

```bash
# Seed projects (PowerShell)
.\seed-projects.ps1

# Seed projects (NPM)
cd backend
npm run seed:projects

# Seed projects (Node)
cd backend
node seedProjects.js

# Seed properties (existing)
cd backend
npm run seed

# Seed blogs (existing)
cd backend
npm run seed:blogs

# Start backend
cd backend
npm start

# Start frontend
cd frontend
npm run dev
```

## Files Created

1. `backend/seedProjects.js` - Seed script
2. `seed-projects.ps1` - PowerShell runner
3. `SEED_PROJECTS_GUIDE.md` - This guide

## Next Steps

After seeding:
1. ✅ View projects on homepage
2. ✅ Test admin management
3. ✅ Edit project details
4. ✅ Add your own projects
5. ✅ Delete demo projects if needed

## Notes

- ⚠️ Seeding will DELETE all existing projects
- ✅ Safe to run multiple times
- ✅ Creates 6 demo projects each time
- ✅ All projects are marked as "Completed"
- ✅ Images are from Unsplash (free to use)

## Status

✅ **READY TO USE**

Run the seed script and you'll have 6 demo completed projects in your database!

---

**Quick Start:**
```powershell
.\seed-projects.ps1
```

Then visit: `http://localhost:3000`
