#!/bin/bash

# VPS Fix Script - Run this via KVM console
# This will fix the firewall, backend .env, and setup the database

echo "🔧 Fixing VPS configuration..."

# Fix firewall to allow SSH
echo "1. Fixing firewall..."
sudo ufw allow 22/tcp
sudo ufw allow OpenSSH
sudo ufw reload
echo "✅ Firewall fixed - SSH now allowed"

# Update backend .env file
echo "2. Updating backend .env..."
cd /var/www/patkars-realty/backend

cat > .env << 'EOF'
PORT=5000
MONGODB_URI=mongodb+srv://Patkarrealty:Patkarrealty2025@cluster0.2capyp7.mongodb.net/patkars-realty?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=patkarrealty-super-secret-jwt-key-2025-production
NODE_ENV=production
FRONTEND_URL=http://patkarrealty.in
EOF

echo "✅ Backend .env updated"

# Restart backend
echo "3. Restarting backend..."
pm2 restart patkars-backend
sleep 3
echo "✅ Backend restarted"

# Create admin user
echo "4. Creating admin user..."
node scripts/createUsers.js

# Seed page content
echo "5. Seeding page content..."
node scripts/seedPageContent.js

# Show status
echo ""
echo "✅ All done!"
echo ""
echo "📊 Backend status:"
pm2 status

echo ""
echo "🔐 Admin credentials:"
echo "   Email: admin@patkarsrealty.com"
echo "   Password: Patkarrealty2025"
echo ""
echo "🌐 Website: http://51.79.147.13"
echo "🔌 SSH is now working: ssh ubuntu@51.79.147.13"
