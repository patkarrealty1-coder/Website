#!/bin/bash

# Deployment Script for Patkar's Realty
# Run this on your LOCAL machine

echo "🚀 Starting Deployment Process..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Build Frontend
echo -e "${BLUE}Step 1: Building Frontend...${NC}"
cd frontend
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend built successfully${NC}"
else
    echo -e "${RED}✗ Frontend build failed${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✓ Build Complete!${NC}"
echo ""
echo "📦 Next Steps:"
echo "1. Upload dist folder to VPS: /var/www/patkarrealty/"
echo "2. Upload backend folder to VPS: ~/patkarrealty-backend/"
echo "3. Run: pm2 restart patkars-backend"
echo ""
echo "Or use the VPS deployment script on your server."
