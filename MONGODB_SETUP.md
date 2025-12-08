# MongoDB Setup Guide

You have 3 options to get MongoDB running:

## Option 1: MongoDB Atlas (Cloud - EASIEST & RECOMMENDED)

### Steps:
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a free cluster (M0 Sandbox)
4. Click "Connect" on your cluster
5. Add your IP address (or use 0.0.0.0/0 for allow all)
6. Create a database user (username & password)
7. Choose "Connect your application"
8. Copy the connection string
9. Replace in `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/patkars-realty?retryWrites=true&w=majority
   ```
10. Restart backend server

**Time: 5 minutes**

## Option 2: Install MongoDB Locally (Windows)

### Steps:
1. Download MongoDB Community Server:
   https://www.mongodb.com/try/download/community
2. Run the installer
3. Choose "Complete" installation
4. Install as a Windows Service
5. Start MongoDB service:
   ```powershell
   net start MongoDB
   ```
6. Restart backend server

**Time: 10 minutes**

## Option 3: Use Docker (If you have Docker installed)

### Steps:
```powershell
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Time: 2 minutes**

---

## Quick Test Connection

After setting up MongoDB, test if it's working:

```powershell
# In backend folder
node -e "const mongoose = require('mongoose'); mongoose.connect('your-mongodb-uri').then(() => console.log('Connected!')).catch(err => console.log('Error:', err))"
```

## Current Status
❌ MongoDB is not installed/running
❌ Backend server cannot connect to database
❌ Admin account creation will fail

## Next Steps
1. Choose one of the options above
2. Set up MongoDB
3. Update MONGODB_URI in backend/.env
4. Restart backend server
5. Try creating admin account again
