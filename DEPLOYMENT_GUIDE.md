# Deployment Guide - OVH Cloud

## Pre-Deployment Checklist

### ✅ Completed
- [x] Frontend pages (Home, About, Contact, FAQ, etc.)
- [x] Admin panel (Properties, Blogs, Projects, Leads, Page Content)
- [x] Authentication system (Login, Register, Google OAuth)
- [x] Lead management system
- [x] Content management (About, FAQ, Contact, Privacy, Terms)
- [x] Email updated to support@patkarrealty.in
- [x] Phone number: +91 91360 97299
- [x] Office address: Charkop, Kandivali West, Mumbai

### 🔧 Required Before Deployment

#### 1. Environment Variables Setup

**Backend (.env)**
```env
# Server
PORT=4000
NODE_ENV=production

# MongoDB (OVH MongoDB or MongoDB Atlas)
MONGODB_URI=mongodb://your-ovh-mongodb-url:27017/patkars-realty
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/patkars-realty

# JWT Secret (Generate a strong secret)
JWT_SECRET=generate-a-strong-random-secret-key-here

# Frontend URL (Your OVH domain)
FRONTEND_URL=https://yourdomain.com

# Google OAuth (Optional - if using Google login)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

# Cloudinary (Optional - if using image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Frontend (.env)**
```env
# API URL (Your OVH backend URL)
VITE_API_URL=https://api.yourdomain.com/api

# Google OAuth Client ID (Optional)
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

#### 2. Database Setup

**Option A: MongoDB Atlas (Recommended)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Whitelist OVH server IP
4. Get connection string
5. Update MONGODB_URI in backend .env

**Option B: OVH MongoDB**
1. Order MongoDB service from OVH
2. Get connection details
3. Update MONGODB_URI in backend .env

#### 3. Create Admin User

After deployment, run:
```bash
cd backend
node scripts/createUsers.js
```

Admin credentials:
- Email: admin@patkarsrealty.com
- Password: admin123
- **⚠️ Change password immediately after first login!**

#### 4. Seed Initial Content

```bash
cd backend
node scripts/seedPageContent.js
```

This will populate:
- About Us page content
- FAQ page content
- Contact page content
- Privacy Policy content
- Terms & Conditions content

---

## OVH Cloud Deployment Steps

### Backend Deployment (Node.js API)

#### Option 1: OVH Web Hosting (Node.js)

1. **Prepare Backend**
```bash
cd backend
npm install --production
```

2. **Upload via FTP/SFTP**
- Upload all backend files to OVH server
- Exclude: node_modules, .env (upload separately)

3. **SSH into OVH Server**
```bash
ssh username@your-ovh-server.com
```

4. **Install Dependencies**
```bash
cd /path/to/backend
npm install --production
```

5. **Create .env file**
```bash
nano .env
# Paste production environment variables
```

6. **Start with PM2 (Process Manager)**
```bash
npm install -g pm2
pm2 start server.js --name patkars-backend
pm2 save
pm2 startup
```

7. **Setup Nginx Reverse Proxy**
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Option 2: OVH VPS/Dedicated Server

1. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. **Install MongoDB** (if not using Atlas)
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

3. **Clone/Upload Project**
```bash
cd /var/www
git clone your-repo-url patkars-backend
# OR upload via SFTP
```

4. **Install Dependencies**
```bash
cd patkars-backend/backend
npm install --production
```

5. **Setup Environment**
```bash
cp .env.example .env
nano .env
# Configure production variables
```

6. **Start with PM2**
```bash
npm install -g pm2
pm2 start server.js --name patkars-backend
pm2 save
pm2 startup
```

7. **Setup Firewall**
```bash
sudo ufw allow 4000
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

---

### Frontend Deployment (React/Vite)

#### Step 1: Build Frontend

```bash
cd frontend
npm install
npm run build
```

This creates a `dist` folder with optimized production files.

#### Step 2: Deploy to OVH

**Option A: OVH Web Hosting**

1. **Upload via FTP/SFTP**
- Upload contents of `dist` folder to `www` or `public_html`

2. **Configure .htaccess** (for React Router)
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Option B: OVH VPS with Nginx**

1. **Upload dist folder**
```bash
scp -r dist/* username@server:/var/www/patkars-frontend
```

2. **Configure Nginx**
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/patkars-frontend;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

3. **Restart Nginx**
```bash
sudo systemctl restart nginx
```

---

## SSL Certificate Setup (HTTPS)

### Using Let's Encrypt (Free)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com
sudo certbot renew --dry-run
```

---

## Post-Deployment Tasks

### 1. Create Admin User
```bash
ssh into server
cd /path/to/backend
node scripts/createUsers.js
```

### 2. Seed Content
```bash
node scripts/seedPageContent.js
```

### 3. Test Everything
- [ ] Frontend loads at https://yourdomain.com
- [ ] Backend API responds at https://api.yourdomain.com/api/health
- [ ] Admin login works at https://yourdomain.com/management
- [ ] Contact form submits successfully
- [ ] Lead management works
- [ ] Page content management works

### 4. Security Checklist
- [ ] Change default admin password
- [ ] Update JWT_SECRET to strong random value
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up firewall rules
- [ ] Enable rate limiting
- [ ] Regular backups configured

### 5. Monitoring Setup
```bash
# PM2 monitoring
pm2 monit

# View logs
pm2 logs patkars-backend

# Check status
pm2 status
```

---

## Domain Configuration

### DNS Settings (OVH DNS Manager)

```
Type    Name    Value                       TTL
A       @       your-server-ip              3600
A       www     your-server-ip              3600
A       api     your-server-ip              3600
```

---

## Backup Strategy

### Database Backup (Daily)

```bash
# Create backup script
nano /home/backup-db.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --uri="mongodb://localhost:27017/patkars-realty" --out="/backups/db_$DATE"
# Keep only last 7 days
find /backups -type d -mtime +7 -exec rm -rf {} \;
```

```bash
chmod +x /home/backup-db.sh
crontab -e
# Add: 0 2 * * * /home/backup-db.sh
```

---

## Troubleshooting

### Backend Issues

**API not responding:**
```bash
pm2 logs patkars-backend
pm2 restart patkars-backend
```

**Database connection failed:**
- Check MONGODB_URI in .env
- Verify MongoDB is running: `sudo systemctl status mongodb`
- Check firewall rules

**CORS errors:**
- Verify FRONTEND_URL in backend .env
- Check CORS configuration in server.js

### Frontend Issues

**Blank page:**
- Check browser console for errors
- Verify VITE_API_URL in .env
- Check .htaccess or nginx config for React Router

**API calls failing:**
- Verify backend is running
- Check VITE_API_URL points to correct backend
- Check CORS settings

---

## Performance Optimization

### Backend
- Enable compression middleware
- Use PM2 cluster mode: `pm2 start server.js -i max`
- Add Redis for caching (optional)
- Enable MongoDB indexes

### Frontend
- Already optimized by Vite build
- Enable Nginx gzip compression
- Add CDN (optional)
- Enable browser caching

---

## Maintenance Commands

```bash
# Update backend
cd /path/to/backend
git pull
npm install
pm2 restart patkars-backend

# Update frontend
cd /path/to/frontend
git pull
npm install
npm run build
# Upload new dist folder

# View logs
pm2 logs patkars-backend
tail -f /var/log/nginx/error.log

# Database backup
mongodump --uri="mongodb://localhost:27017/patkars-realty" --out="/backups/manual_backup"

# Restart services
pm2 restart all
sudo systemctl restart nginx
sudo systemctl restart mongodb
```

---

## Support Contacts

- **Email:** support@patkarrealty.in
- **Phone:** +91 91360 97299
- **Office:** Patkar's Realty, Charkop, Kandivali West, Mumbai, Maharashtra 400067

---

## Deployment Checklist Summary

### Before Deployment
- [ ] Update all environment variables
- [ ] Generate strong JWT_SECRET
- [ ] Setup MongoDB (Atlas or OVH)
- [ ] Configure domain DNS
- [ ] Build frontend (`npm run build`)

### During Deployment
- [ ] Upload backend files
- [ ] Install backend dependencies
- [ ] Upload frontend dist folder
- [ ] Configure Nginx/Apache
- [ ] Setup SSL certificate
- [ ] Start backend with PM2

### After Deployment
- [ ] Create admin user
- [ ] Seed page content
- [ ] Test all features
- [ ] Change admin password
- [ ] Setup monitoring
- [ ] Configure backups
- [ ] Test email functionality

---

## Quick Deploy Commands

```bash
# Backend
cd backend
npm install --production
pm2 start server.js --name patkars-backend
pm2 save

# Frontend
cd frontend
npm install
npm run build
# Upload dist/* to web server

# Database
node scripts/createUsers.js
node scripts/seedPageContent.js
```

---

**Your application is ready for deployment! 🚀**

Follow this guide step by step, and you'll have your website live on OVH Cloud.
