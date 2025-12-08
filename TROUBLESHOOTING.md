# Troubleshooting Guide

## Common Errors and Solutions

### ✅ RESOLVED: Failed to resolve import "../hooks/useScrollAnimation"

**Error:**
```
Failed to resolve import "../hooks/useScrollAnimation" from "src\components\PropertyGrid.jsx"
```

**Solution:**
The `useScrollAnimation.js` hook file has been created at:
- `frontend/src/hooks/useScrollAnimation.js`

This error is now resolved.

---

## Other Common Issues

### 1. Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**

**Windows:**
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

**Or change the port:**
Edit `frontend/vite.config.js`:
```javascript
server: {
  port: 3001,  // Change to different port
}
```

---

### 2. Module Not Found Errors

**Error:**
```
Cannot find module 'react' or its corresponding type declarations
```

**Solution:**
```bash
# Reinstall dependencies
npm run install-all

# Or install individually
cd frontend && npm install
cd ../backend && npm install
```

---

### 3. MongoDB Connection Error

**Error:**
```
MongooseServerSelectionError: connect ECONNREFUSED
```

**Solution:**

1. **Check if MongoDB is running:**
   ```bash
   # Windows - Check if MongoDB service is running
   net start | findstr MongoDB
   ```

2. **Start MongoDB:**
   ```bash
   # If using MongoDB service
   net start MongoDB
   ```

3. **Check connection string in `backend/.env`:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/patkars-realty
   ```

4. **Use MongoDB Atlas (cloud):**
   - Sign up at https://www.mongodb.com/cloud/atlas
   - Get connection string
   - Update `MONGODB_URI` in `.env`

---

### 4. CORS Errors

**Error:**
```
Access to fetch at 'http://localhost:5000/api/properties' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solution:**

1. **Check backend `.env`:**
   ```env
   FRONTEND_URL=http://localhost:3000
   ```

2. **Verify CORS configuration in `backend/server.js`**

3. **Restart both servers:**
   ```bash
   # Stop with Ctrl+C
   # Then restart
   npm run dev
   ```

---

### 5. Vite Build Errors

**Error:**
```
[vite] Internal server error: Failed to parse source
```

**Solution:**

1. **Clear Vite cache:**
   ```bash
   cd frontend
   rm -rf node_modules/.vite
   npm run dev
   ```

2. **Check for syntax errors in your code**

3. **Restart the dev server**

---

### 6. Environment Variables Not Loading

**Error:**
```
process.env.VITE_API_URL is undefined
```

**Solution:**

1. **Frontend env variables must start with `VITE_`:**
   ```env
   # frontend/.env
   VITE_API_URL=http://localhost:5000/api
   ```

2. **Restart the dev server after changing .env files**

3. **Access in code:**
   ```javascript
   const apiUrl = import.meta.env.VITE_API_URL
   ```

---

### 7. Images Not Loading

**Error:**
Images show broken icon or 404 error

**Solution:**

1. **Check image paths:**
   ```javascript
   // Correct - using Unsplash or public folder
   src="https://images.unsplash.com/photo-xxx"
   src="/images/property.jpg"  // Must be in public folder
   ```

2. **Place images in `frontend/public/images/`**

3. **Use absolute URLs for external images**

---

### 8. Hot Reload Not Working

**Error:**
Changes don't reflect in browser

**Solution:**

1. **Hard refresh browser:**
   - Windows: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **Check if dev server is running**

3. **Restart dev server:**
   ```bash
   # Stop with Ctrl+C
   npm run dev
   ```

4. **Clear browser cache**

---

### 9. npm install Fails

**Error:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solution:**

1. **Use legacy peer deps:**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Clear npm cache:**
   ```bash
   npm cache clean --force
   npm install
   ```

3. **Delete node_modules and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

---

### 10. Tailwind Styles Not Working

**Error:**
Tailwind classes don't apply styles

**Solution:**

1. **Check `tailwind.config.js` content paths:**
   ```javascript
   content: [
     "./index.html",
     "./src/**/*.{js,ts,jsx,tsx}",
   ]
   ```

2. **Verify `index.css` imports:**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

3. **Restart dev server**

---

## Quick Fixes

### Reset Everything

```bash
# Stop all servers
# Ctrl + C

# Clean install
rm -rf node_modules
rm -rf frontend/node_modules
rm -rf backend/node_modules
npm run install-all

# Restart
npm run dev
```

### Check Node Version

```bash
node --version  # Should be v16 or higher
npm --version   # Should be v8 or higher
```

### Update Dependencies

```bash
# Update all packages
npm update

# Update specific package
cd frontend
npm update vite
```

---

## Getting Help

### Check Logs

1. **Look at terminal output** - errors are usually descriptive
2. **Check browser console** - F12 → Console tab
3. **Check Network tab** - F12 → Network tab for API errors

### Useful Commands

```bash
# Check what's running on ports
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Check Node/npm versions
node --version
npm --version

# List npm scripts
npm run

# Check for outdated packages
npm outdated
```

### Still Having Issues?

1. Read error messages carefully
2. Check file paths and imports
3. Verify all dependencies are installed
4. Restart servers
5. Clear cache and rebuild
6. Check documentation files

---

## Prevention Tips

1. ✅ Always run `npm run install-all` after cloning
2. ✅ Keep Node.js and npm updated
3. ✅ Don't modify `node_modules` directly
4. ✅ Use `.env` files for configuration
5. ✅ Commit `package-lock.json` to git
6. ✅ Restart servers after config changes
7. ✅ Clear cache when things get weird

---

**Most issues can be solved by:**
1. Restarting the servers
2. Clearing cache
3. Reinstalling dependencies
4. Checking file paths

**Happy coding!** 🚀
