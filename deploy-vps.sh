#!/bin/bash

# VPS Deployment Script
# Run this ON YOUR VPS after uploading files

echo "🚀 Deploying on VPS..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configuration
BACKEND_DIR=~/patkarrealty-backend/backend
FRONTEND_DIST=~/patkarrealty-backend/frontend/dist
WEB_DIR=/var/www/patkarrealty

echo -e "${BLUE}Step 1: Installing Backend Dependencies...${NC}"
cd $BACKEND_DIR
npm install --production

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install dependencies${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}Step 2: Copying Frontend Files...${NC}"
sudo cp -r $FRONTEND_DIST/* $WEB_DIR/

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend files copied${NC}"
else
    echo -e "${RED}✗ Failed to copy frontend files${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}Step 3: Restarting Backend...${NC}"
pm2 restart patkars-backend

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend restarted${NC}"
else
    echo -e "${YELLOW}⚠ PM2 restart failed, trying to start...${NC}"
    cd $BACKEND_DIR
    pm2 start server.js --name patkars-backend
fi

echo ""
echo -e "${BLUE}Step 4: Restarting Nginx...${NC}"
sudo systemctl restart nginx

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Nginx restarted${NC}"
else
    echo -e "${RED}✗ Nginx restart failed${NC}"
fi

echo ""
echo -e "${GREEN}✓ Deployment Complete!${NC}"
echo ""
echo "📊 Status Check:"
pm2 status
echo ""
echo "🌐 Your site should be live at: http://patkarrealty.in"
echo ""
echo "📝 Check logs with:"
echo "  pm2 logs patkars-backend"
echo "  sudo tail -f /var/log/nginx/error.log"
