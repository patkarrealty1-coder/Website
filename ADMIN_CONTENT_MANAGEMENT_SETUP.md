# Admin Content Management System Setup

## Files Created:

### Backend:
1. `backend/models/PageContent.js` - Database model for page content
2. `backend/routes/pageContent.js` - API routes for managing content

### Frontend:
1. `frontend/src/pages/AdminPageContent.jsx` - Admin panel for editing pages

## Setup Instructions:

### 1. Add Route to Backend Server

In `backend/server.js`, add:

```javascript
const pageContentRoutes = require('./routes/pageContent');
app.use('/api/page-content', pageContentRoutes);
```

### 2. Add Route to Frontend App

In `frontend/src/App.jsx`, add the import:

```javascript
import AdminPageContent from './pages/AdminPageContent'
```

And add the route inside the admin routes section:

```javascript
<Route path="/admin/page-content" element={
  <ProtectedRoute requireAdmin>
    <AdminPageContent />
  </ProtectedRoute>
} />
```

### 3. Add Link to Admin Dashboard

In `frontend/src/pages/AdminDashboard.jsx`, add a new card:

```javascript
<Link to="/admin/page-content" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
  <div className="flex items-center justify-between mb-4">
    <FileText className="h-8 w-8 text-purple-600" />
  </div>
  <h3 className="text-xl font-semibold text-gray-900 mb-2">Page Content</h3>
  <p className="text-gray-600">Manage FAQ, About, Contact, Privacy & Terms pages</p>
</Link>
```

## Features:

### Admin Can Edit:
1. **FAQ Page** - Add/edit/remove FAQ items
2. **Contact Us** - Update phone, email, address, office hours
3. **About Us** - Manage content sections
4. **Privacy Policy** - Edit policy sections
5. **Terms & Conditions** - Edit terms sections

### Frontend Pages Will:
- Fetch content from API instead of hardcoded data
- Display dynamic content managed by admin
- Fall back to default content if API fails

## Next Steps:

1. Update frontend pages (FAQ, Contact, About, Privacy, Terms) to fetch from API
2. Test the admin panel
3. Add rich text editor for better content formatting (optional)

## API Endpoints:

- `GET /api/page-content/:pageType` - Get page content (public)
- `POST /api/page-content` - Create/update page content (admin only)
- `GET /api/page-content/admin/all` - List all pages (admin only)

## Page Types:
- `faq`
- `contact`
- `about`
- `privacy-policy`
- `terms-conditions`
