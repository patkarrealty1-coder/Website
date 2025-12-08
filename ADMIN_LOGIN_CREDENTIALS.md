# Admin Login Credentials

## Default Admin Account

### Email
```
admin@patkarsrealty.com
```

### Password
```
admin123
```

## How to Login

### Method 1: Direct Management Panel Login
1. Go to `http://localhost:3000/management`
2. You'll see the login modal
3. Enter credentials:
   - **Email:** admin@patkarsrealty.com
   - **Password:** admin123
4. Click "Sign In to Management"
5. Dashboard loads!

### Method 2: Via Login Page
1. Go to `http://localhost:3000/login`
2. Enter credentials:
   - **Email:** admin@patkarsrealty.com
   - **Password:** admin123
3. Click "Sign In"
4. You'll be redirected to `/management`

## What You Can Do After Login

### Properties Management
- View all properties
- Add new properties
- Edit existing properties
- Delete properties
- Review pending properties
- Mark properties as featured

### Blogs Management
- View all blog posts
- Create new blogs
- Edit blog posts
- Delete blogs
- Review pending blogs

### Projects Management
- View all projects
- Create new projects
- Edit projects
- Delete projects

### Featured Properties
- Manage featured luxury properties
- Toggle featured status
- Search and filter properties

## If Admin Doesn't Exist

If the admin user hasn't been created yet, you have two options:

### Option 1: Use Setup Endpoint
```bash
curl -X POST http://localhost:4000/api/setup/create-admin
```

Response:
```json
{
  "success": true,
  "message": "Admin user created successfully!",
  "credentials": {
    "email": "admin@patkarsrealty.com",
    "password": "admin123"
  }
}
```

### Option 2: Run Create Admin Script
```bash
cd backend
node scripts/createAdmin.js
```

Output:
```
MongoDB Connected
Admin user created successfully!
Email: admin@patkarsrealty.com
Password: admin123

You can now login at: http://localhost:3000/login
```

## Troubleshooting

### Login Not Working?
1. **Check if admin exists:**
   - Go to MongoDB and check Users collection
   - Look for email: `admin@patkarsrealty.com`

2. **If admin doesn't exist:**
   - Run the create admin script (see above)
   - Or use the setup endpoint

3. **If credentials are wrong:**
   - Double-check email and password
   - Make sure Caps Lock is off
   - Try copying/pasting credentials

4. **Backend not running?**
   - Make sure backend is running on port 4000
   - Check terminal for errors
   - Restart backend if needed

### Can't Access Management Panel?
1. Make sure you're logged in as admin
2. Check browser console for errors (F12)
3. Clear browser cache and cookies
4. Try in incognito/private mode

## Security Notes

⚠️ **Important for Production:**
- Change the default password immediately
- Use a strong, unique password
- Don't share credentials
- Use environment variables for sensitive data
- Disable the setup endpoint in production

## Changing Admin Password

To change the admin password:

1. Login to management panel
2. Go to user profile/settings (if available)
3. Change password
4. Or update directly in database:

```javascript
// In MongoDB
db.users.updateOne(
  { email: "admin@patkarsrealty.com" },
  { $set: { password: "newPassword123" } }
)
```

## Creating Additional Admin Users

To create more admin users, you can:

1. **Via Backend API:**
```bash
POST http://localhost:4000/api/auth/register
Content-Type: application/json

{
  "fullName": "Another Admin",
  "email": "admin2@patkarsrealty.com",
  "password": "securePassword123",
  "phone": "+919876543210",
  "role": "admin"
}
```

2. **Via MongoDB:**
```javascript
db.users.insertOne({
  fullName: "Another Admin",
  email: "admin2@patkarsrealty.com",
  password: "hashedPassword", // Must be hashed
  phone: "+919876543210",
  role: "admin",
  isActive: true,
  isEmailVerified: true,
  createdAt: new Date()
})
```

## Quick Reference

| Item | Value |
|------|-------|
| **Email** | admin@patkarsrealty.com |
| **Password** | admin123 |
| **Login URL** | http://localhost:3000/management |
| **Alternative URL** | http://localhost:3000/login |
| **Backend API** | http://localhost:4000 |
| **Database** | MongoDB |

## Next Steps

1. ✅ Login with admin credentials
2. ✅ Explore the management dashboard
3. ✅ Add some properties
4. ✅ Create blog posts
5. ✅ Manage projects
6. ✅ Set featured properties
7. ✅ Review pending submissions

Happy managing! 🎉
