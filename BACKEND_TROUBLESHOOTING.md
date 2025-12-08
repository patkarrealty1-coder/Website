 # Backend Troubleshooting Guide

## Current Issues & Solutions

### Issue 1: Rate Limiting Too Strict
**Problem**: Backend returning "Too many requests" 
**Solution**: ✅ Increased rate limit from 100 to 1000 requests per 15 minutes

### Issue 2: Registration/Login Not Working
**Possible Causes**:
1. Backend not running on correct port
2. MongoDB connection issues
3. Auth routes not loading
4. CORS issues

## Quick Fixes Applied

### 1. Fixed Rate Limiting (`backend/server.js`)
```javascript
// Before: max: 100
// After: max: 1000 (more lenient for development)
```

### 2. Enhanced Error Handling (`backend/controllers/authController.js`)
- Added specific MongoDB error handling
- Added validation error handling
- Better error messages

### 3. Added Debug Endpoints (`backend/server.js`)
- `/api/debug` - Test backend status
- Enhanced `/api/health` - Shows MongoDB status

## Manual Testing Steps

### Step 1: Restart Backend
```bash
# Kill all node processes
Get-Process -Name node | Stop-Process -Force

# Start backend only first
cd backend
npm run dev
```

### Step 2: Test Backend Directly
Open browser and go to:
- http://localhost:5000/api/health
- http://localhost:5000/api/debug

Should see JSON responses, not errors.

### Step 3: Test Registration API
Use browser console or Postman:
```javascript
fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fullName: 'Test User',
    email: 'test@example.com',
    password: 'test123456'
  })
}).then(r => r.json()).then(console.log)
```

### Step 4: Check MongoDB Connection
In backend console, you should see:
```
MongoDB Connected: ac-qhk4kid-shard-00-00.kljhvxf.mongodb.net
Server running on port 5000
```

## Common Issues & Solutions

### Issue: "Cannot POST /api/auth/register"
**Solution**: Auth routes not loaded
- Check `backend/routes/auth.js` exists
- Check `app.use('/api/auth', require('./routes/auth'))` in server.js

### Issue: "User validation failed"
**Solution**: Missing required fields
- Ensure fullName, email, password are provided
- Check User model requirements

### Issue: "E11000 duplicate key error"
**Solution**: Email already exists
- Use different email
- Check MongoDB for existing users

### Issue: "MongooseError: Operation buffering timed out"
**Solution**: MongoDB connection failed
- Check MONGODB_URI in .env
- Verify internet connection
- Check MongoDB Atlas whitelist

## Environment Variables Required

```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
```

## Files That Must Exist

✅ `backend/models/User.js`
✅ `backend/controllers/authController.js`
✅ `backend/routes/auth.js`
✅ `backend/middleware/auth.js`
✅ `backend/.env`

## Next Steps

1. **Restart backend server**
2. **Test health endpoint in browser**
3. **Try registration again**
4. **Check browser console for errors**
5. **Check backend console for error logs**

## If Still Not Working

1. **Check backend console logs** for specific errors
2. **Open browser DevTools** (F12) → Network tab
3. **Try registration** and see what error appears
4. **Share the exact error message** for specific fix

The backend should now work with the fixes applied!