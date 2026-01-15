# Deploy Patkar's Realty - Step by Step

## Your Server Details
- **VPS IP:** 51.79.147.13
- **Domain:** patkarrealty.in
- **OS:** Ubuntu 24.04
- **Username:** ubuntu

---

## Step 1: Get Your VPS Password (Do This First!)

1. Go to: https://www.ovh.com/manager/secret/#?id=5781c48d-09ac-4551-a4b9-4dc8bbe06404
2. Copy the password (valid for 30 days, then 7 days after opening)
3. Save it securely

---

## Step 2: Connect to Your VPS

Open your terminal (or PuTTY on Windows) and connect:

```bash
ssh ubuntu@51.79.147.13
```

Enter the password you got from Step 1.

---

## Step 3: Initial Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Nginx (Web Server)
sudo apt install -y nginx

# Install Git
sudo apt install -y git

# Install Certbot (for SSL)
sudo apt install -y certbot python3-certbot-nginx
```

---

## Step 4: Setup MongoDB Atlas (Free Database)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a free cluster (M0 - Free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/patkars-realty
   ```
6. **Save this connection string** - you'll need it later

---

## Step 5: Configure Domain DNS (GoDaddy)

1. Go to https://dcc.godaddy.com/control/portfolio/patkarrealty.in/settings
2. Click "DNS" → "Manage DNS"
3. Add these records:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 51.79.147.13 | 600 |
| A | www | 51.79.147.13 | 600 |
| A | api | 51.79.147.13 | 600 |

4. Save changes (DNS propagation takes 5-30 minutes)

---

## Step 6: Upload Your Project to VPS

### Option A: Using Git (Recommended)

```bash
# On your VPS
cd /var/www
sudo mkdir patkars-realty
sudo chown ubuntu:ubuntu patkars-realty
cd patkars-realty

# If you have a Git repository
git clone YOUR_REPO_URL .

# OR continue with Option B if no Git repo
```

### Option B: Using SCP (from your local machine)

```bash
# On your LOCAL machine (not VPS)
# Compress your project
cd /path/to/your/project
tar -czf patkars-realty.tar.gz backend frontend

# Upload to VPS
scp patkars-realty.tar.gz ubuntu@51.79.147.13:/home/ubuntu/

# Back on VPS
ssh ubuntu@51.79.147.13
sudo mkdir -p /var/www/patkars-realty
cd /var/www/patkars-realty
sudo tar -xzf /home/ubuntu/patkars-realty.tar.gz
sudo chown -R ubuntu:ubuntu /var/www/patkars-realty
```

---

## Step 7: Setup Backend

```bash
cd /var/www/patkars-realty/backend

# Install dependencies
npm install --production

# Create .env file
nano .env
```

**Paste this into .env** (update MongoDB URI with your Atlas connection string):

```env
# Server
PORT=4000
NODE_ENV=production

# MongoDB Atlas (UPDATE THIS with your connection string from Step 4)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/patkars-realty?retryWrites=true&w=majority

# JWT Secret (Generate a random string)
JWT_SECRET=your-super-secret-random-string-change-this-to-something-secure

# Frontend URL
FRONTEND_URL=https://patkarrealty.in

# Google OAuth (Optional - leave empty for now)
GOOGLE_CLIENT_ID=
```

**Save and exit:** Press `Ctrl+X`, then `Y`, then `Enter`

```bash
# Start backend with PM2
pm2 start server.js --name patkars-backend
pm2 save
pm2 startup
# Copy and run the command it shows

# Check if running
pm2 status
pm2 logs patkars-backend
```

---

## Step 8: Build and Deploy Frontend

```bash
cd /var/www/patkars-realty/frontend

# Create .env file
nano .env
```

**Paste this:**

```env
VITE_API_URL=https://api.patkarrealty.in/api
VITE_GOOGLE_CLIENT_ID=
```

**Save and exit:** `Ctrl+X`, `Y`, `Enter`

```bash
# Install dependencies and build
npm install
npm run build

# Move build to web directory
sudo mkdir -p /var/www/html
sudo cp -r dist/* /var/www/html/
sudo chown -R www-data:www-data /var/www/html
```

---

## Step 9: Configure Nginx

```bash
# Remove default config
sudo rm /etc/nginx/sites-enabled/default

# Create main site config
sudo nano /etc/nginx/sites-available/patkarrealty
```

**Paste this configuration:**

```nginx
# Frontend - patkarrealty.in
server {
    listen 80;
    server_name patkarrealty.in www.patkarrealty.in;
    root /var/www/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}

# Backend API - api.patkarrealty.in
server {
    listen 80;
    server_name api.patkarrealty.in;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Save and exit:** `Ctrl+X`, `Y`, `Enter`

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/patkarrealty /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## Step 10: Setup SSL (HTTPS)

```bash
# Get SSL certificates for all domains
sudo certbot --nginx -d patkarrealty.in -d www.patkarrealty.in -d api.patkarrealty.in

# Follow prompts:
# - Enter email: support@patkarrealty.in
# - Agree to terms: Y
# - Share email: N (optional)
# - Redirect HTTP to HTTPS: 2 (Yes)

# Test auto-renewal
sudo certbot renew --dry-run
```

---

## Step 11: Setup Firewall

```bash
# Configure firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Check status
sudo ufw status
```

---

## Step 12: Initialize Database

```bash
cd /var/www/patkars-realty/backend

# Create admin user
node scripts/createUsers.js

# Seed page content
node scripts/seedPageContent.js
```

**Admin Login Credentials:**
- Email: admin@patkarsrealty.com
- Password: admin123
- **⚠️ Change this password immediately after first login!**

---

## Step 13: Test Your Website

1. **Frontend:** https://patkarrealty.in
2. **Admin Panel:** https://patkarrealty.in/management
3. **API Health:** https://api.patkarrealty.in/api/health

---

## Step 14: Post-Deployment Tasks

### Change Admin Password
1. Go to https://patkarrealty.in/management
2. Login with admin@patkarsrealty.com / admin123
3. Change password immediately

### Test All Features
- [ ] Homepage loads
- [ ] All pages work (About, Contact, FAQ, etc.)
- [ ] Contact form submits
- [ ] Admin panel accessible
- [ ] Can create/edit properties
- [ ] Can manage page content
- [ ] Lead management works

---

## Useful Commands

```bash
# View backend logs
pm2 logs patkars-backend

# Restart backend
pm2 restart patkars-backend

# Check backend status
pm2 status

# View Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Restart Nginx
sudo systemctl restart nginx

# Check SSL certificate status
sudo certbot certificates

# Renew SSL (auto-renews, but you can force)
sudo certbot renew
```

---

## Backup Setup (Important!)

```bash
# Create backup script
nano /home/ubuntu/backup.sh
```

**Paste this:**

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/ubuntu/backups"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup MongoDB (if using local MongoDB)
# mongodump --uri="mongodb://localhost:27017/patkars-realty" --out="$BACKUP_DIR/db_$DATE"

# Backup uploaded files (if any)
tar -czf $BACKUP_DIR/files_$DATE.tar.gz /var/www/patkars-realty/backend/uploads 2>/dev/null

# Keep only last 7 days
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup completed: $DATE"
```

**Save and make executable:**

```bash
chmod +x /home/ubuntu/backup.sh

# Add to crontab (runs daily at 2 AM)
crontab -e
# Add this line:
0 2 * * * /home/ubuntu/backup.sh >> /home/ubuntu/backup.log 2>&1
```

---

## Troubleshooting

### Backend not starting
```bash
pm2 logs patkars-backend
# Check for errors in MongoDB connection or .env file
```

### Frontend shows blank page
```bash
# Check browser console (F12)
# Verify API URL in frontend .env
# Check Nginx configuration
sudo nginx -t
```

### Domain not resolving
```bash
# Check DNS propagation
ping patkarrealty.in
# Wait 5-30 minutes for DNS to propagate
```

### SSL certificate issues
```bash
sudo certbot certificates
sudo certbot renew --force-renewal
```

---

## Update/Redeploy

```bash
# Update backend
cd /var/www/patkars-realty/backend
git pull  # or upload new files
npm install
pm2 restart patkars-backend

# Update frontend
cd /var/www/patkars-realty/frontend
git pull  # or upload new files
npm install
npm run build
sudo cp -r dist/* /var/www/html/
```

---

## Support

- **Email:** support@patkarrealty.in
- **Phone:** +91 91360 97299
- **Office:** Charkop, Kandivali West, Mumbai

---

## Quick Reference

**Server IP:** 51.79.147.13
**Domain:** patkarrealty.in
**Frontend:** https://patkarrealty.in
**Admin:** https://patkarrealty.in/management
**API:** https://api.patkarrealty.in

**Admin Login:**
- Email: admin@patkarsrealty.com
- Password: admin123 (change immediately!)

---

## Deployment Checklist

- [ ] Step 1: Get VPS password
- [ ] Step 2: Connect to VPS
- [ ] Step 3: Install software (Node, Nginx, etc.)
- [ ] Step 4: Setup MongoDB Atlas
- [ ] Step 5: Configure DNS on GoDaddy
- [ ] Step 6: Upload project files
- [ ] Step 7: Setup backend + .env
- [ ] Step 8: Build and deploy frontend
- [ ] Step 9: Configure Nginx
- [ ] Step 10: Setup SSL certificates
- [ ] Step 11: Configure firewall
- [ ] Step 12: Create admin user + seed data
- [ ] Step 13: Test website
- [ ] Step 14: Change admin password
- [ ] Setup backups

---

**You're ready to deploy! Follow each step carefully. Good luck! 🚀**
