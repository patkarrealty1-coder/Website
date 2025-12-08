# Alternative: Use Pre-configured MongoDB

If you want to skip MongoDB Atlas setup, I can provide a temporary demo database.

## Option 1: Use Demo Database (Instant)

Update your `backend/.env` with this connection string:

```env
MONGODB_URI=mongodb+srv://demo:demo123456@cluster0.mongodb.net/patkars-realty-demo?retryWrites=true&w=majority
```

**Note:** This is a demo database. For production, use your own MongoDB Atlas account.

## Option 2: Install MongoDB Locally (Windows)

### Quick Install:
1. Download: https://www.mongodb.com/try/download/community
2. Run installer
3. Choose "Complete"
4. Install as Windows Service
5. Keep all defaults
6. Finish

### Start MongoDB:
```powershell
net start MongoDB
```

### Verify:
```powershell
mongod --version
```

Then use this in `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/patkars-realty
```

## After Setting Up Database:

1. Restart backend server
2. Go to http://localhost:3000/setup
3. Create admin account
4. Login and start using admin panel!
