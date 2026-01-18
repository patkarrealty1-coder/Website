#!/bin/bash

# VPS Final Setup Script for Patkar's Realty
# Run this script on the VPS after SSH access is restored

echo "🚀 Starting final VPS setup..."

# Navigate to backend directory
cd /var/www/patkars-realty/backend

# Create .env file with correct MongoDB connection
cat > .env << 'EOF'
PORT=5000
MONGODB_URI=mongodb+srv://Patkarrealty:Patkarrealty2025@cluster0.2capyp7.mongodb.net/patkars-realty?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=patkarrealty-super-secret-jwt-key-2025-production
NODE_ENV=production
FRONTEND_URL=http://patkarrealty.in
EOF

echo "✅ Backend .env file created"

# Restart backend with PM2
pm2 restart patkars-backend
echo "✅ Backend restarted"

# Wait for backend to start
sleep 3

# Create admin user
echo "📝 Creating admin user..."
node scripts/createUsers.js

# Seed page content
echo "📝 Seeding page content..."
node scripts/seedPageContent.js

# Show PM2 status
echo ""
echo "📊 PM2 Status:"
pm2 status

# Show backend logs
echo ""
echo "📋 Recent backend logs:"
pm2 logs patkars-backend --lines 20 --nostream

echo ""
echo "✅ Setup complete!"
echo ""
echo "🌐 Your website should now be accessible at:"
echo "   Frontend: http://51.79.147.13"
echo "   Backend API: http://51.79.147.13/api"
echo ""
echo "🔐 Admin Login Credentials:"
echo "   Email: admin@patkarsrealty.com"
echo "   Password: Patkarrealty2025"
echo ""
echo "⚠️  Next steps:"
echo "   1. Point your domain patkarrealty.in to 51.79.147.13"
echo "   2. Setup SSL certificate with: sudo certbot --nginx -d patkarrealty.in -d www.patkarrealty.in"
echo "   3. Fix firewall: sudo ufw allow 22/tcp && sudo ufw allow 'Nginx Full'"
