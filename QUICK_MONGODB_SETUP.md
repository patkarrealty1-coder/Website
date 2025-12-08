# Quick MongoDB Atlas Setup (5 Minutes)

## Step 1: Create MongoDB Atlas Account
1. Open: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google/Email
3. Choose "Free" tier

## Step 2: Create a Cluster
1. Click "Build a Database"
2. Choose "FREE" (M0 Sandbox)
3. Select a cloud provider (AWS recommended)
4. Choose a region close to you
5. Click "Create Cluster" (takes 1-3 minutes)

## Step 3: Create Database User
1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `admin`
5. Password: `admin123` (or create your own)
6. User Privileges: "Atlas admin"
7. Click "Add User"

## Step 4: Allow Network Access
1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

## Step 5: Get Connection String
1. Click "Database" in left sidebar
2. Click "Connect" button on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. It looks like: `mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

## Step 6: Update Your .env File
1. Open `backend/.env`
2. Replace `<password>` with your actual password
3. Add database name: `mongodb+srv://admin:admin123@cluster0.xxxxx.mongodb.net/patkars-realty?retryWrites=true&w=majority`
4. Save the file

## Step 7: Restart Backend
1. Close the backend PowerShell window
2. Run: `cd backend && npm start`

## Step 8: Create Admin Account
1. Go to http://localhost:3000/setup
2. Click "Create Admin Account"
3. Success! 🎉

---

## Alternative: Install MongoDB Locally

If you prefer local installation:

### Windows:
1. Download: https://www.mongodb.com/try/download/community
2. Run installer
3. Choose "Complete" installation
4. Install as Windows Service
5. Keep default settings
6. Finish installation
7. MongoDB will start automatically

### Verify Installation:
```powershell
mongod --version
```

### Start MongoDB Service:
```powershell
net start MongoDB
```

Then restart your backend server!
