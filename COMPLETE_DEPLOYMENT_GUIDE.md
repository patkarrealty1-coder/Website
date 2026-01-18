# 🚀 COMPLETE DEPLOYMENT GUIDE

**Your Domain:** patkarrealty.in (GoDaddy)  
**VPS:** Your existing VPS  
**Status:** Ready to deploy!

---

## 📋 PART 1: BUILD & DEPLOY CODE

### Step 1: Build Frontend (On Your Local Machine)

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies (if not already done)
npm install

# Build for production
npm run build

# This creates a 'dist' folder with optimized files
# Should take 15-30 seconds
```

**Expected Output:**
```
✓ built in 20s
✓ dist/index.html
✓ dist/assets/
```

---

### Step 2: Connect to Your VPS

```bash
# Replace with your VPS details
ssh root@your-vps-ip

# Or if you have a username
ssh username@your-vps-ip
```

**Example:**
```bash
ssh root@123.45.67.89
# Enter password when prompted
```

---

### Step 3: Prepare VPS Directories

```bash
# Create web directory if it doesn't exist
sudo mkdir -p /var/www/patkarrealty

# Set permissions
sudo chown -R $USER:$USER /var/www/patkarrealty

# Create backend directory
mkdir -p ~/patkarrealty-backend
```

---

### Step 4: Upload Frontend Files

**Option A: Using SCP (From Your Local Machine)**

```bash
# Open NEW terminal on your local machine (don't close SSH)
cd frontend

# Upload dist folder to VPS
scp -r dist/* root@your-vps-ip:/var/www/patkarrealty/

# Example:
scp -r dist/* root@123.45.67.89:/var/www/patkarrealty/
```

**Option B: Using Git (Recommended)**

```bash
# On your local machine
git add .
git commit -m "Production ready - final deployment"
git push origin main

# On your VPS
cd ~/patkarrealty-backend
git pull origin main
cd frontend
npm install
npm run build
sudo cp -r dist/* /var/www/patkarrealty/
```

---

### Step 5: Upload Backend Files

**On your VPS:**

```bash
# Navigate to backend directory
cd ~/patkarrealty-backend

# If using Git (pull latest)
git pull origin main

# Or upload via SCP from local machine:
# scp -r backend/* root@your-vps-ip:~/patkarrealty-backend/

# Install dependencies
cd backend
npm install --production
```

---

### Step 6: Configure Backend Environment

```bash
# Edit .env file on VPS
cd ~/patkarrealty-backend/backend
nano .env
```

**Make sure these are set:**
```bash
NODE_ENV=production
PORT=5000
FRONTEND_URL=http://patkarrealty.in
MONGODB_URI=mongodb+srv://Patkarrealty:Patkarrealty2025@cluster0.2capyp7.mongodb.net/patkars-realty?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=patkarrealty-super-secret-jwt-key-2025-production
JWT_EXPIRE=30d
```

**Save:** `Ctrl + X`, then `Y`, then `Enter`

---

### Step 7: Start Backend with PM2

```bash
# Navigate to backend folder
cd ~/patkarrealty-backend/backend

# Stop old process if running
pm2 stop patkars-backend
pm2 delete patkars-backend

# Start new process
pm2 start server.js --name patkars-backend

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Copy and run the command it shows

# Check status
pm2 status

# View logs
pm2 logs patkars-backend --lines 50
```

**Expected Output:**
```
┌─────┬──────────────────┬─────────┬─────────┐
│ id  │ name             │ status  │ restart │
├─────┼──────────────────┼─────────┼─────────┤
│ 0   │ patkars-backend  │ online  │ 0       │
└─────┴──────────────────┴─────────┴─────────┘
```

---

## 📋 PART 2: CONFIGURE NGINX

### Step 8: Create Nginx Configuration

```bash
# Create Nginx config file
sudo nano /etc/nginx/sites-available/patkarrealty
```

**Paste this configuration:**

```nginx
server {
    listen 80;
    server_name patkarrealty.in www.patkarrealty.in;

    # Frontend - Serve React app
    root /var/www/patkarrealty;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json image/svg+xml;

    # Frontend routes - React Router
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # Static assets - Cache for 1 year
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Backend API - Proxy to Node.js
    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # No caching for API
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Max upload size
    client_max_body_size 10M;
}
```

**Save:** `Ctrl + X`, then `Y`, then `Enter`

---

### Step 9: Enable Nginx Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/patkarrealty /etc/nginx/sites-enabled/

# Remove default site if exists
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Should show:
# nginx: configuration file /etc/nginx/nginx.conf test is successful

# Restart Nginx
sudo systemctl restart nginx

# Check Nginx status
sudo systemctl status nginx
```

---

## 📋 PART 3: CONNECT GODADDY DOMAIN

### Step 10: Get Your VPS IP Address

```bash
# On your VPS, run:
curl ifconfig.me

# Or
hostname -I

# Note down the IP address (e.g., 123.45.67.89)
```

---

### Step 11: Configure GoDaddy DNS

**Go to GoDaddy:**

1. **Login to GoDaddy**
   - Go to https://www.godaddy.com/
   - Click "Sign In"
   - Enter your credentials

2. **Access DNS Management**
   - Click on your profile icon (top right)
   - Click "My Products"
   - Find "patkarrealty.in"
   - Click "DNS" or "Manage DNS"

3. **Add/Edit A Records**

   **Delete existing A records (if any) and add these:**

   | Type | Name | Value | TTL |
   |------|------|-------|-----|
   | A | @ | YOUR_VPS_IP | 600 |
   | A | www | YOUR_VPS_IP | 600 |

   **Example:**
   ```
   Type: A
   Name: @
   Value: 123.45.67.89
   TTL: 600 seconds (10 minutes)

   Type: A
   Name: www
   Value: 123.45.67.89
   TTL: 600 seconds
   ```

4. **Save Changes**
   - Click "Save" or "Save Changes"
   - DNS propagation takes 10-60 minutes

---

### Step 12: Wait for DNS Propagation

```bash
# Check DNS propagation (on your local machine)
# Wait 10-30 minutes, then test:

# Check if domain points to your VPS
nslookup patkarrealty.in

# Or
ping patkarrealty.in

# Should show your VPS IP address
```

**Online Tools:**
- https://www.whatsmydns.net/
- Enter: patkarrealty.in
- Check if it shows your VPS IP globally

---

## 📋 PART 4: INSTALL SSL CERTIFICATE (HTTPS)

### Step 13: Install Certbot

```bash
# On your VPS
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

---

### Step 14: Get SSL Certificate

```bash
# Get certificate for your domain
sudo certbot --nginx -d patkarrealty.in -d www.patkarrealty.in

# Follow prompts:
# 1. Enter email address
# 2. Agree to terms (Y)
# 3. Share email (N or Y)
# 4. Redirect HTTP to HTTPS? (2 - Yes, recommended)
```

**Expected Output:**
```
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/patkarrealty.in/fullchain.pem
Key is saved at: /etc/letsencrypt/live/patkarrealty.in/privkey.pem
```

---

### Step 15: Test Auto-Renewal

```bash
# Test certificate renewal
sudo certbot renew --dry-run

# Should show: "Congratulations, all simulated renewals succeeded"
```

---

## 📋 PART 5: FINAL VERIFICATION

### Step 16: Test Your Website

**Open browser and test:**

1. **HTTP (should redirect to HTTPS):**
   - http://patkarrealty.in
   - Should redirect to https://patkarrealty.in

2. **HTTPS:**
   - https://patkarrealty.in
   - Should show your website with green padlock

3. **WWW:**
   - https://www.patkarrealty.in
   - Should work

4. **API:**
   - https://patkarrealty.in/api/health
   - Should return: `{"status":"OK",...}`

---

### Step 17: Test All Features

**Test these on your live site:**

1. **Home Page** ✅
   - Hero image loads
   - Text displays correctly
   - Animations work

2. **Navigation** ✅
   - All menu items work
   - Pages load

3. **Auth System** ✅
   - Click "Login"
   - Try signing up
   - Try Google login (if configured)

4. **Properties** ✅
   - Visit /listings
   - Properties load
   - Images display

5. **Admin Panel** ✅
   - Visit /management
   - Login as admin
   - Add test property
   - Check if it appears on frontend

6. **AI Agent** ✅
   - Visit /ai-agent
   - Send test message
   - Check n8n receives it

---

## 🐛 TROUBLESHOOTING

### Issue: Website Not Loading

**Check 1: DNS**
```bash
nslookup patkarrealty.in
# Should show your VPS IP
```

**Check 2: Nginx**
```bash
sudo systemctl status nginx
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

**Check 3: Files**
```bash
ls -la /var/www/patkarrealty/
# Should show index.html and assets folder
```

---

### Issue: API Not Working

**Check 1: Backend Running**
```bash
pm2 status
pm2 logs patkars-backend --lines 50
```

**Check 2: Port**
```bash
sudo netstat -tulpn | grep 5000
# Should show node process on port 5000
```

**Check 3: Test Directly**
```bash
curl http://localhost:5000/api/health
# Should return JSON
```

---

### Issue: SSL Not Working

**Check Certificate:**
```bash
sudo certbot certificates
```

**Renew Certificate:**
```bash
sudo certbot renew
sudo systemctl restart nginx
```

---

### Issue: 502 Bad Gateway

**Means backend is not running:**
```bash
pm2 restart patkars-backend
pm2 logs patkars-backend
```

---

### Issue: 404 on Refresh

**Means Nginx not configured for React Router:**
```bash
# Check Nginx config has:
# try_files $uri $uri/ /index.html;

sudo nginx -t
sudo systemctl restart nginx
```

---

## 📊 MONITORING

### Check Backend Logs
```bash
pm2 logs patkars-backend --lines 100
```

### Check Nginx Logs
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Check System Resources
```bash
pm2 monit
# Or
htop
```

---

## 🔄 UPDATING YOUR SITE

### When You Make Changes:

```bash
# On local machine
cd frontend
npm run build
git add .
git commit -m "Update: description"
git push

# On VPS
cd ~/patkarrealty-backend
git pull
cd frontend
npm run build
sudo cp -r dist/* /var/www/patkarrealty/

# Restart backend if needed
cd ../backend
pm2 restart patkars-backend
```

---

## ✅ DEPLOYMENT CHECKLIST

### Before Going Live:
- [ ] Frontend built successfully
- [ ] Backend uploaded to VPS
- [ ] PM2 running backend
- [ ] Nginx configured
- [ ] GoDaddy DNS configured
- [ ] SSL certificate installed
- [ ] Website loads on domain
- [ ] API working
- [ ] Auth working
- [ ] Admin panel accessible

### After Going Live:
- [ ] Test all pages
- [ ] Test auth system
- [ ] Test admin panel
- [ ] Test on mobile
- [ ] Check SSL certificate
- [ ] Monitor logs
- [ ] Test performance

---

## 🎉 YOU'RE LIVE!

**Your website is now accessible at:**
- https://patkarrealty.in
- https://www.patkarrealty.in

**Admin panel:**
- https://patkarrealty.in/management

**API:**
- https://patkarrealty.in/api/health

---

## 📞 QUICK COMMANDS REFERENCE

```bash
# Check backend status
pm2 status

# View backend logs
pm2 logs patkars-backend

# Restart backend
pm2 restart patkars-backend

# Check Nginx
sudo systemctl status nginx

# Restart Nginx
sudo systemctl restart nginx

# Test Nginx config
sudo nginx -t

# View Nginx logs
sudo tail -f /var/log/nginx/error.log

# Check SSL certificate
sudo certbot certificates

# Renew SSL
sudo certbot renew
```

---

**Deployment Guide Created By:** Kiro AI Assistant  
**Status:** ✅ COMPLETE STEP-BY-STEP GUIDE  
**Ready to Deploy:** YES! 🚀
