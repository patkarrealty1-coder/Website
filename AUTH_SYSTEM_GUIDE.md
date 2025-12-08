# Authentication & Wishlist System Guide

## Overview
Complete user authentication system with registration, login, session management, and wishlist functionality.

## Backend Implementation

### 1. User Model (`backend/models/User.js`)
- **Fields**: fullName, email, password (hashed), phone, profileImage, wishlist, role, isActive
- **Password Security**: Bcrypt hashing with salt rounds of 12
- **Wishlist**: Array of Property ObjectIds
- **Methods**:
  - `comparePassword()`: Verify password
  - `addToWishlist()`: Add property to wishlist
  - `removeFromWishlist()`: Remove property from wishlist

### 2. Authentication Controller (`backend/controllers/authController.js`)
**Endpoints**:
- `POST /api/auth/register`: Register new user
- `POST /api/auth/login`: Login user (supports "Remember Me")
- `GET /api/auth/me`: Get current user profile
- `PUT /api/auth/profile`: Update user profile
- `PUT /api/auth/change-password`: Change password

### 3. Wishlist Controller (`backend/controllers/wishlistController.js`)
**Endpoints**:
- `GET /api/wishlist`: Get user's wishlist
- `POST /api/wishlist/:propertyId`: Add property to wishlist
- `DELETE /api/wishlist/:propertyId`: Remove property from wishlist
- `PUT /api/wishlist/toggle/:propertyId`: Toggle property in wishlist
- `DELETE /api/wishlist`: Clear entire wishlist

### 4. Authentication Middleware (`backend/middleware/auth.js`)
- `protect`: Verify JWT token and authenticate user
- `authorize`: Check user role permissions

## API Usage Examples

### Register User
```javascript
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login User
```javascript
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123",
  "rememberMe": true
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "fullName": "John Doe",
      "email": "john@example.com",
      "wishlistCount": 5
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get Current User
```javascript
GET /api/auth/me
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "fullName": "John Doe",
      "email": "john@example.com",
      "wishlist": [...],
      "wishlistCount": 5
    }
  }
}
```

### Add to Wishlist
```javascript
POST /api/wishlist/:propertyId
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Property added to wishlist",
  "data": {
    "wishlist": [...],
    "wishlistCount": 6
  }
}
```

### Toggle Wishlist
```javascript
PUT /api/wishlist/toggle/:propertyId
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Property added to wishlist",
  "data": {
    "wishlist": [...],
    "wishlistCount": 6,
    "isInWishlist": true
  }
}
```

## Frontend Integration

### 1. Store Token
```javascript
// After login/register
localStorage.setItem('token', data.token)
localStorage.setItem('user', JSON.stringify(data.user))
```

### 2. Add Authorization Header
```javascript
const token = localStorage.getItem('token')

fetch('http://localhost:5000/api/wishlist', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

### 3. Check Authentication
```javascript
const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  return !!token
}
```

### 4. Logout
```javascript
const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.href = '/login'
}
```

## Security Features

1. **Password Hashing**: Bcrypt with 12 salt rounds
2. **JWT Tokens**: Secure token-based authentication
3. **Token Expiry**: 7 days (default) or 30 days (remember me)
4. **Protected Routes**: Middleware authentication
5. **Role-Based Access**: Admin vs User permissions
6. **Account Status**: Active/Inactive user management

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  fullName: String,
  email: String (unique, lowercase),
  password: String (hashed),
  phone: String,
  profileImage: String,
  wishlist: [ObjectId] (ref: Property),
  role: String (enum: ['user', 'admin']),
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables

Add to `.env` file:
```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
MONGODB_URI=mongodb://localhost:27017/patkars-realty
```

## Installation

1. Install required packages:
```bash
cd backend
npm install bcryptjs jsonwebtoken
```

2. Restart your backend server:
```bash
npm run dev
```

## Testing the API

Use Postman or curl to test:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@example.com","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Get Profile (replace TOKEN with actual token)
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

## Next Steps

1. Create frontend registration page
2. Create frontend login page
3. Add wishlist UI components
4. Implement protected routes in React
5. Add wishlist icon to property cards
6. Show wishlist count in navigation

## Troubleshooting

**Issue**: "User already exists"
- Solution: Use a different email or check database

**Issue**: "Not authorized"
- Solution: Ensure token is included in Authorization header

**Issue**: "Token failed"
- Solution: Token may be expired, login again

**Issue**: "Property not found"
- Solution: Verify property ID exists in database
