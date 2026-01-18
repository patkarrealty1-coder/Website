# 🚀 DEPLOY NOW - Simple Steps

**Follow these steps exactly. No errors guaranteed!**

---

## ✅ STEP 1: Build Frontend (Your Computer)

```bash
cd frontend
npm run build
```

**Wait for:** `✓ built in XX seconds`

**✅ Done?** → Go to Step 2

---

## ✅ STEP 2: Connect to VPS

```bash
ssh root@your-vps-ip
# Enter password
```

**Replace `your-vps-ip` with your actual VPS IP**

**✅ Connected?** → Go to Step 3

---

## ✅ STEP 3: Prepare VPS (First Time Only)

**On VPS, run:**

```bash
# Create directories
sudo mkdir -p /var/www/patkarrealty
sudo chown -R $USER:$USER /var/www/patkarrealty
mkdir -p ~/patkarrealty-backend

# Install PM2 if not installed
npm install -g pm2

# Install Nginx if not installed
sudo apt update
sudo apt install nginx -y
```

**✅ Done?** → Go to Step 4

---

## ✅ STEP 4: Upload Files to VPS

**Option A: Using Git (Recommended)**

```bash
# On VPS
cd ~
git clone YOUR_GITHUB_REPO_URL patkarrealty-backend
# Or if already cloned:
cd ~/patkarrealty-backend
git pull
```

**Option B: Using SCP (From Your Computer)**

```bash
# Open NEW terminal on your computer
# Upload backend
scp -r backend root@your-vps-ip:~/patkarrealty-backend/

# Upload frontend dist
scp -r frontend/dist root@your-vps-ip:~/patkarrealty-backend/frontend/
```

**✅ Files uploaded?** → Go to Step 5

---

## ✅ STEP 5: Deploy Backend (On VPS)

```bash
# Navigate to backend
cd ~/patkarrealty-backend/backend

# Install dependencies
npm install --production

# Stop old process
pm2 stop patkars-backend 2>/dev/null
pm2 delete patkars-backend 2>/dev/null

# Start backend
pm2 start server.js --name patkars-backend

# Save PM2 config
pm2 save

# Check status
pm2 status
```

**Expected:** `patkars-backend │ online`

**✅ Backend running?** → Go to Step 6

---

## ✅ STEP 6: Deploy Frontend (On VPS)

```bash
# Copy frontend files
sudo cp -r ~/patkarrealty-backend/frontend/dist/* /var/www/patkarrealty/

# Verify files copied
ls -la /var/www/patkarrealty/
```

**Expected:** You should see `index.html` and `assets` folder

**✅ Files copied?** → Go to Step 7

---

## ✅ STEP 7: Configure Nginx (First Time Only)

**Check if config exists:**

```bash
ls /etc/nginx/sites-available/patkarrealty
```

**If file doesn't exist, create it:**

```bash
sudo nano /etc/nginx/sites-available/patkarrealty
```

**Paste this:**

```nginx
server {
    listen 80;
    server_name patkarrealty.in www.patkarrealty.in;

    root /var/www/patkarrealty;
    index index.html;

    # Frontend
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    client_max_body_size 10M;
}
```

**Save:** `Ctrl+X`, `Y`, `Enter`

**Enable site:**

```bash
sudo ln -s /etc/nginx/sites-available/patkarrealty /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default 2>/dev/null
```

**✅ Config created?** → Go to Step 8

---

## ✅ STEP 8: Restart Nginx

```bash
# Test config
sudo nginx -t

# Should show: "test is successful"

# Restart Nginx
sudo systemctl restart nginx

# Check status
sudo systemctl status nginx
```

**Expected:** `active (running)`

**✅ Nginx running?** → Go to Step 9

---

## ✅ STEP 9: Test Your Website

**Open browser and visit:**

1. **Backend API:**
   ```
   http://your-vps-ip/api/health
   ```
   **Expected:** JSON response with `"status":"OK"`

2. **Frontend:**
   ```
   http://your-vps-ip
   ```
   **Expected:** Your website loads

**✅ Both working?** → Go to Step 10

---

## ✅ STEP 10: Check Logs (If Issues)

**Backend logs:**
```bash
pm2 logs patkars-backend --lines 50
```

**Nginx logs:**
```bash
sudo tail -f /var/log/nginx/error.log
```

**Check what's running:**
```bash
pm2 status
sudo systemctl status nginx
sudo netstat -tulpn | grep 5000
```

---

## 🐛 QUICK FIXES

### Issue: Backend not starting

```bash
cd ~/patkarrealty-backend/backend
pm2 logs patkars-backend
# Check error message
```

**Common fix:**
```bash
# Check .env file exists
cat .env

# Restart
pm2 restart patkars-backend
```

---

### Issue: 502 Bad Gateway

**Means backend not running:**

```bash
pm2 restart patkars-backend
pm2 logs patkars-backend
```

---

### Issue: API calls failing

**Check backend is on port 5000:**

```bash
sudo netstat -tulpn | grep 5000
# Should show node process
```

**Test API directly:**

```bash
curl http://localhost:5000/api/health
```

---

### Issue: Frontend not loading

**Check files exist:**

```bash
ls -la /var/www/patkarrealty/
# Should show index.html
```

**Check Nginx:**

```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

## ✅ SUCCESS CHECKLIST

After deployment, verify:

- [ ] Backend running: `pm2 status` shows "online"
- [ ] API works: `curl http://localhost:5000/api/health`
- [ ] Nginx running: `sudo systemctl status nginx`
- [ ] Frontend loads: Visit `http://your-vps-ip`
- [ ] No errors in logs: `pm2 logs patkars-backend`

---

## 🎉 DEPLOYMENT COMPLETE!

**Your site is now live!**

**Next:** Configure your GoDaddy domain to point to your VPS IP

---

## 📞 QUICK COMMANDS

```bash
# Check backend
pm2 status
pm2 logs patkars-backend

# Restart backend
pm2 restart patkars-backend

# Check Nginx
sudo systemctl status nginx
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# View logs
pm2 logs patkars-backend --lines 50
sudo tail -f /var/log/nginx/error.log
```

---

**Ready to start?** Begin with Step 1! 🚀
