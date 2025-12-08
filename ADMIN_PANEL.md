# Admin Panel Documentation

## Overview
The admin panel allows administrators to manage properties, blogs, and projects through a comprehensive dashboard interface.

## Access
- URL: `http://localhost:3000/admin`
- Requires admin authentication

## Features

### 1. Dashboard (`/admin`)
- Overview statistics for properties, blogs, and projects
- Quick access cards to manage each section
- Logout functionality

### 2. Properties Management (`/admin/properties`)
- View all properties in a table format
- Search properties by title or location
- Add new properties
- Edit existing properties
- Delete properties
- Features:
  - Property details (title, price, type, bedrooms, bathrooms, sqft)
  - Location information
  - Listing agent details
  - Amenities selection
  - Multiple image uploads
  - Featured property toggle
  - Status management (Available, Sold, Under Contract, Off Market)

### 3. Blogs Management (`/admin/blogs`)
- View all blogs in a grid layout
- Search blogs by title or category
- Add new blog posts
- Edit existing blogs
- Delete blogs
- Features:
  - Title, excerpt, and content
  - Category selection (Real Estate Tips, Market Trends, etc.)
  - Tags support
  - Featured image upload
  - Status management (draft, published, archived)
  - Featured blog toggle
  - View count tracking

### 4. Projects Management (`/admin/projects`)
- View all projects in a grid layout
- Search projects by name or location
- Add new projects
- Edit existing projects
- Delete projects
- Features:
  - Project name and description
  - Location (city, state)
  - Year and units information
  - Status (Completed, Ongoing, Upcoming, On Hold)
  - Project stats (floors, parking, amenities)
  - Project image upload
  - Featured project toggle

## API Endpoints

### Properties
- GET `/api/properties` - Get all properties
- GET `/api/properties/:id` - Get single property
- POST `/api/properties` - Create property (Admin only)
- PUT `/api/properties/:id` - Update property (Admin only)
- DELETE `/api/properties/:id` - Delete property (Admin only)

### Blogs
- GET `/api/blogs` - Get all blogs
- GET `/api/blogs/:id` - Get single blog
- POST `/api/blogs` - Create blog (Admin only)
- PUT `/api/blogs/:id` - Update blog (Admin only)
- DELETE `/api/blogs/:id` - Delete blog (Admin only)

### Projects
- GET `/api/projects` - Get all projects
- GET `/api/projects/:id` - Get single project
- POST `/api/projects` - Create project (Admin only)
- PUT `/api/projects/:id` - Update project (Admin only)
- DELETE `/api/projects/:id` - Delete project (Admin only)

## Database Models

### Property Model
- Basic info: title, description, price, type
- Details: bedrooms, bathrooms, sqft, yearBuilt
- Location: address, city, state, pincode
- Images: multiple images with URLs
- Amenities: array of selected amenities
- Agent: name, email, phone
- Status: Available, Sold, Under Contract, Off Market
- Featured: boolean

### Blog Model
- Title, slug, excerpt, content
- Featured image
- Author reference
- Category and tags
- Status: draft, published, archived
- Views and likes count
- SEO metadata
- Published date

### Project Model
- Name, description
- Location: city, state
- Year, units, status
- Main image
- Stats: floors, parking, amenities
- Gallery images
- Featured flag

## Usage Instructions

### Adding a Property
1. Navigate to `/admin/properties`
2. Click "Add New Property"
3. Fill in all required fields:
   - Basic information (title, description, price, type)
   - Property details (bedrooms, bathrooms, sqft)
   - Location information
   - Listing agent details
   - Select amenities
   - Upload images
4. Click "Create Property"

### Adding a Blog Post
1. Navigate to `/admin/blogs`
2. Click "Add New Blog"
3. Fill in:
   - Title and excerpt
   - Full content
   - Category and tags
   - Upload featured image
   - Set status (draft/published)
4. Click "Create Blog"

### Adding a Project
1. Navigate to `/admin/projects`
2. Click "Add New Project"
3. Fill in:
   - Project name and description
   - Location details
   - Year and units
   - Project stats
   - Upload project image
4. Click "Create Project"

## Security
- All admin routes require authentication
- JWT token-based authentication
- Admin role verification on backend
- Protected API endpoints

## Notes
- Images are uploaded to the server's upload directory
- All forms include validation
- Confirmation dialogs for delete operations
- Search functionality for easy filtering
- Responsive design for mobile access
