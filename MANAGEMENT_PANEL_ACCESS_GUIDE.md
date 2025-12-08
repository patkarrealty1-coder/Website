# Management Panel Access Guide

## Issue Fixed ✅

**Problem:** Accessing `/management` redirected to home page automatically

**Root Cause:** 
1. Login page was redirecting to old `/admin` route
2. AdminDashboard was checking for admin role but redirecting non-admins to home instead of login

**Solution:** Updated both files to use new `/management` route and proper auth flow

## How to Access Management Panel

### Step 1: Login
1. Go to `http://localhost:3000/login`
2. Enter your admin credentials:
   - Email: admin@example.com (or your admin email)
   - Password: your admin password
3. Click "Sign In"

### Step 2: Redirected to Management
After successful login, you'll be automatically redirected to:
```
http://localhost:3000/management
```

### Direct Access
If you try to access `/management` directly without being logged in:
- You'll be redirected to `/login`
- After login, you'll be taken to `/management`

## Files Updated

### 1. frontend/src/pages/Login.jsx
**Change:** Updated redirect after successful admin login
```javascript
// Before
if (data.data.user.role === 'admin') {
  navigate('/admin')
}

// After
if (data.data.user.role === 'admin') {
  navigate('/management')
}
```

### 2. frontend/src/pages/AdminDashboard.jsx
**Change:** Improved auth check and redirect logic
```javascript
// Before
const user = JSON.parse(localStorage.getItem('user') || '{}')
if (user.role !== 'admin') {
  navigate('/')
  return
}

// After
const user = JSON.parse(localStorage.getItem('user') || '{}')
const token = localStorage.getItem('token')

if (!token || !user || user.role !== 'admin') {
  navigate('/login')
  return
}
```

## Access Flow

```
User visits /management
    ↓
Check if logged in (token exists)
    ↓
Check if user has admin role
    ↓
YES → Show Management Dashboard
NO → Redirect to /login
    ↓
After login → Redirect to /management
```

## Troubleshooting

### Still redirecting to home?
1. **Clear browser cache:**
   - Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
   - Clear cookies and cached data
   - Refresh the page

2. **Check localStorage:**
   - Open DevTools (F12)
   - Go to Application → Local Storage
   - Verify `token` and `user` are stored
   - Check that `user` object has `role: 'admin'`

3. **Check console for errors:**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for any error messages

### Not logged in?
1. Go to `/login`
2. Enter your admin credentials
3. You should be redirected to `/management`

### Forgot admin credentials?
1. Check your database for admin user
2. Or create a new admin user via backend
3. Use those credentials to login

## Management Panel Routes

Once logged in, you can access:

| Section | URL |
|---------|-----|
| Dashboard | `/management` |
| Properties | `/management/properties` |
| Add Property | `/management/properties/new` |
| Edit Property | `/management/properties/edit/:id` |
| Pending Properties | `/management/pending-properties` |
| Review Property | `/management/properties/review/:id` |
| Blogs | `/management/blogs` |
| Add Blog | `/management/blogs/new` |
| Edit Blog | `/management/blogs/edit/:id` |
| Pending Blogs | `/management/pending-blogs` |
| Review Blog | `/management/blogs/review/:id` |
| Projects | `/management/projects` |
| Add Project | `/management/projects/new` |
| Edit Project | `/management/projects/edit/:id` |
| Featured Properties | `/management/featured-properties` |

## Testing Checklist

- [ ] Can access `/login` page
- [ ] Can login with admin credentials
- [ ] Redirected to `/management` after login
- [ ] Management dashboard loads
- [ ] Can navigate to all sub-pages
- [ ] Logout works correctly
- [ ] Accessing `/management` without login redirects to `/login`
- [ ] Non-admin users cannot access `/management`

## Security Notes

- Admin role is required to access management panel
- Token is stored in localStorage
- User data is stored in localStorage
- Always logout when done
- Clear browser data if switching accounts

## Next Steps

1. Login with your admin account
2. Explore the management dashboard
3. Manage properties, blogs, and projects
4. Set featured properties
5. Review pending submissions
