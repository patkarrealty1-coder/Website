# Wishlist Feature Troubleshooting Guide

## Current Status
The wishlist feature has been fully implemented with proper authentication handling.

## How It Works

### Backend (Fixed)
- Routes use `optionalAuth` middleware - works with or without login
- Controllers check for `req.user` and return appropriate messages
- Unauthenticated users get friendly error messages instead of crashes

### Frontend (Updated)
- PropertyCard and PropertyDetails have "Add to Wishlist" buttons
- Buttons show loading state while processing
- Alert notifications show success/error messages
- Redirects to login if user is not authenticated

## Testing Steps

### 1. Test Without Login
1. Open the app without logging in
2. Browse properties on the home page or listings page
3. Click "Add to Wishlist" button on any property
4. You should see: "Please login to add properties to your wishlist"
5. You should be redirected to the login page

### 2. Test With Login
1. Register a new account or login with existing credentials
2. Browse properties
3. Click "Add to Wishlist" button
4. You should see: "Added to wishlist!" alert
5. Button should change to "Remove from Wishlist" with red background
6. Go to Wishlist page (click user menu → Wishlist)
7. You should see the property you added

### 3. Test Remove from Wishlist
1. On a property card with "Remove from Wishlist" button, click it
2. You should see: "Removed from wishlist" alert
3. Button should change back to "Add to Wishlist"
4. Property should disappear from Wishlist page

## Common Issues & Solutions

### Issue 1: Button Click Does Nothing
**Symptoms:** Clicking "Add to Wishlist" button has no effect

**Solutions:**
1. Open browser console (F12) and check for errors
2. Verify backend is running on port 5000
3. Check if token is stored in localStorage:
   ```javascript
   // In browser console:
   localStorage.getItem('token')
   ```
4. Test the API directly:
   ```bash
   # Get wishlist (replace YOUR_TOKEN with actual token)
   curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/wishlist
   ```

### Issue 2: "Please login" Message Even When Logged In
**Symptoms:** User is logged in but still gets login prompt

**Solutions:**
1. Check if token is valid:
   - Go to Login page and login again
   - Token might have expired
2. Check browser console for 401 errors
3. Verify JWT_SECRET is set in backend .env file

### Issue 3: Properties Not Showing in Wishlist Page
**Symptoms:** Added properties but wishlist page is empty

**Solutions:**
1. Check browser console for API errors
2. Verify the API response:
   ```javascript
   // In browser console:
   fetch('http://localhost:5000/api/wishlist', {
     headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
   }).then(r => r.json()).then(console.log)
   ```
3. Check if MongoDB is connected (backend console should show "MongoDB Connected")

### Issue 4: CORS Errors
**Symptoms:** Console shows "CORS policy" errors

**Solutions:**
1. Verify backend CORS is configured for http://localhost:3000
2. Check backend/server.js has:
   ```javascript
   app.use(cors({
     origin: 'http://localhost:3000',
     credentials: true
   }))
   ```
3. Restart backend server

## API Endpoints

### Get Wishlist
```
GET http://localhost:5000/api/wishlist
Headers: Authorization: Bearer <token>
```

### Toggle Wishlist (Add/Remove)
```
PUT http://localhost:5000/api/wishlist/toggle/:propertyId
Headers: Authorization: Bearer <token>
```

### Remove from Wishlist
```
DELETE http://localhost:5000/api/wishlist/:propertyId
Headers: Authorization: Bearer <token>
```

## Quick Test Commands

### Test Backend Health
```bash
curl http://localhost:5000/api/health
```

### Test Wishlist Endpoint (No Auth)
```bash
curl http://localhost:5000/api/wishlist
```
Should return: `{"success":true,"count":0,"data":[],"message":"Please login to view your wishlist"}`

### Test With Authentication
1. First login and get token:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your@email.com","password":"yourpassword"}'
```

2. Copy the token from response, then test wishlist:
```bash
curl http://localhost:5000/api/wishlist \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Files Modified
- `backend/controllers/wishlistController.js` - Added authentication checks
- `frontend/src/components/PropertyCard.jsx` - Added alerts and better error handling
- `frontend/src/components/PropertyDetails.jsx` - Added alerts and better error handling

## Next Steps If Still Not Working

1. **Check Backend Logs**
   - Look at the terminal running the backend
   - Any errors when clicking the button?

2. **Check Frontend Console**
   - Open browser DevTools (F12)
   - Go to Console tab
   - Click "Add to Wishlist" button
   - Look for any red error messages

3. **Check Network Tab**
   - Open browser DevTools (F12)
   - Go to Network tab
   - Click "Add to Wishlist" button
   - Look for the API request
   - Check the response status and body

4. **Verify Property ID**
   - Make sure properties have valid `_id` fields
   - Check if properties are loaded from database correctly

## Contact
If issues persist, provide:
1. Browser console errors (screenshot)
2. Backend terminal output (screenshot)
3. Network tab showing the failed request (screenshot)
