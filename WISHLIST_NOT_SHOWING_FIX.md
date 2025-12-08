# Wishlist Not Showing Properties - Debug Guide

## Issue
Properties are being added to wishlist (you see "Added to wishlist!" alert), but when you open the wishlist page, nothing shows up.

## Quick Debug Steps

### Step 1: Use the Debug Tool
1. Open your browser to: **http://localhost:3000/wishlist-debug**
2. Make sure you're logged in
3. Click "Test Get Wishlist" button
4. Open browser console (F12) and check the output
5. Look at the result box on the page

**What to look for:**
- Status should be 200
- Data should show your wishlist items
- If data is empty array `[]`, properties aren't being saved

### Step 2: Check Browser Console
1. Open browser console (F12)
2. Go to wishlist page: http://localhost:3000/wishlist
3. Look for console logs:
   ```
   Fetching wishlist...
   Response status: 200
   Wishlist data: {success: true, count: X, data: [...]}
   Setting wishlist with X items
   ```

**If you see:**
- `count: 0` and `data: []` → Properties aren't being saved to database
- Error messages → There's an API issue
- No logs at all → JavaScript error preventing execution

### Step 3: Check Backend Logs
1. Look at your backend terminal
2. When you add a property to wishlist, you should see logs
3. When you open wishlist page, you should see GET request

**What to look for:**
- Any error messages
- "Get wishlist error:" messages
- MongoDB connection issues

### Step 4: Test Adding to Wishlist
1. Open browser console (F12)
2. Go to home page or listings
3. Click "Add to Wishlist" on a property
4. Check console logs:
   ```
   Toggling wishlist for property: 507f1f77bcf86cd799439011
   Toggle response status: 200
   Toggle response data: {success: true, data: {...}}
   Wishlist updated: Added to wishlist!
   ```

**If you see:**
- `success: false` → Check the error message
- 401 status → Authentication issue
- 500 status → Backend error

## Common Issues & Solutions

### Issue 1: Properties Not Being Saved
**Symptoms:** Alert shows "Added to wishlist!" but wishlist page is empty

**Possible Causes:**
1. **MongoDB not saving data**
   - Check backend terminal for MongoDB errors
   - Verify MongoDB is running: `mongod --version`
   - Check connection string in backend/.env

2. **User model not saving wishlist**
   - Check backend logs when adding to wishlist
   - Verify User.addToWishlist() method is working

**Solution:**
```bash
# In backend terminal, check MongoDB connection
# You should see: "MongoDB Connected: localhost"

# Test MongoDB directly
mongosh
use patkars-realty
db.users.find().pretty()
# Check if wishlist array has property IDs
```

### Issue 2: Wishlist Returns Empty Array
**Symptoms:** API returns `{success: true, count: 0, data: []}`

**Possible Causes:**
1. **Wrong user being queried**
   - Token might be for different user
   - User ID mismatch

2. **Wishlist not populated correctly**
   - Property IDs in wishlist don't exist
   - Populate() failing silently

**Solution:**
```javascript
// In browser console, check your token
const token = localStorage.getItem('token')
console.log('Token:', token)

// Decode token to see user ID (use jwt.io)
// Compare with user ID in MongoDB
```

### Issue 3: Frontend Not Displaying Data
**Symptoms:** API returns data but page shows "Your wishlist is empty"

**Possible Causes:**
1. **State not updating**
   - React state issue
   - Data structure mismatch

2. **Conditional rendering issue**
   - wishlist.length check failing
   - Data is object instead of array

**Solution:**
Check console logs on wishlist page:
```
Setting wishlist with X items
```
If you see this but page is empty, check the data structure.

### Issue 4: CORS or Network Errors
**Symptoms:** Console shows network errors or CORS policy errors

**Solution:**
1. Verify backend is running on port 5000
2. Check CORS configuration in backend/server.js
3. Restart both frontend and backend

## Manual Testing Commands

### Test 1: Check if Backend is Running
```bash
curl http://localhost:5000/api/health
```
Should return: `{"status":"OK",...}`

### Test 2: Get Wishlist (Replace TOKEN with your actual token)
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/wishlist
```
Should return: `{"success":true,"count":X,"data":[...]}`

### Test 3: Add to Wishlist (Replace TOKEN and PROPERTY_ID)
```bash
curl -X PUT \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  http://localhost:5000/api/wishlist/toggle/PROPERTY_ID
```

### Test 4: Check MongoDB Directly
```bash
mongosh
use patkars-realty
db.users.find({}, {email: 1, wishlist: 1}).pretty()
```
This shows all users with their wishlist arrays.

## Debug Checklist

- [ ] Backend is running on port 5000
- [ ] Frontend is running on port 3000
- [ ] MongoDB is running and connected
- [ ] User is logged in (token in localStorage)
- [ ] Browser console shows no errors
- [ ] Backend terminal shows no errors
- [ ] Debug tool shows correct API responses
- [ ] MongoDB has user with wishlist data

## Files with Debug Logging

The following files now have console.log statements:

1. **frontend/src/pages/Wishlist.jsx**
   - Logs when fetching wishlist
   - Logs response status and data
   - Logs number of items being set

2. **frontend/src/components/PropertyCard.jsx**
   - Logs when toggling wishlist
   - Logs property ID being added
   - Logs response status and data

3. **frontend/src/pages/WishlistDebug.jsx**
   - New debug tool page
   - Test API endpoints directly
   - View raw API responses

## Next Steps

1. **Visit the debug page:** http://localhost:3000/wishlist-debug
2. **Click "Test Get Wishlist"** and check the result
3. **Open browser console** and look for error messages
4. **Check backend terminal** for any errors
5. **Share the results** if you need more help:
   - Screenshot of debug page result
   - Screenshot of browser console
   - Screenshot of backend terminal

## Expected Working Flow

1. User clicks "Add to Wishlist" → Alert shows "Added to wishlist!"
2. Console logs: `Toggling wishlist for property: [ID]`
3. Console logs: `Toggle response status: 200`
4. Console logs: `Wishlist updated: Added to wishlist!`
5. User goes to /wishlist page
6. Console logs: `Fetching wishlist...`
7. Console logs: `Response status: 200`
8. Console logs: `Wishlist data: {success: true, count: 1, data: [...]}`
9. Console logs: `Setting wishlist with 1 items`
10. Page displays the property card

If any step fails, that's where the issue is!
