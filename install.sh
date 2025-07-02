
#!/bin/bash

# Employee Frontend Installation Script for Ubuntu 24.04
# This script installs Node.js, builds the React app, and sets up PM2 with NGINX

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="employee-frontend"
APP_DIR="/var/www/${APP_NAME}"
NODE_VERSION="20"
DOMAIN="your-domain.com"  # Change this to your actual domain

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   error "This script should not be run as root. Please run as a regular user with sudo privileges."
fi

# Check Ubuntu version
if ! grep -q "24.04" /etc/os-release; then
    warn "This script is designed for Ubuntu 24.04. Your system may not be compatible."
    read -p "Do you want to continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

log "Starting Employee Frontend installation..."

# Update system packages
log "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install essential packages
log "Installing essential packages..."
sudo apt install -y curl wget git build-essential software-properties-common

# Install Node.js using NodeSource repository
log "Installing Node.js ${NODE_VERSION}..."
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node.js installation
node_version=$(node --version)
npm_version=$(npm --version)
log "Node.js version: ${node_version}"
log "NPM version: ${npm_version}"

# Install PM2 globally
log "Installing PM2..."
sudo npm install -g pm2

# Install NGINX
log "Installing NGINX..."
sudo apt install -y nginx

# Create application directory
log "Creating application directory..."
sudo mkdir -p ${APP_DIR}
sudo chown -R $USER:$USER ${APP_DIR}

# Clone or copy application files (assuming current directory has the app)
log "Setting up application files..."
if [ -f "package.json" ]; then
    cp -r . ${APP_DIR}/
    cd ${APP_DIR}
else
    error "package.json not found. Please run this script from the application root directory."
fi

# Install dependencies
log "Installing Node.js dependencies..."
npm install

# Build the application
log "Building the application..."
npm run build

# Set up PM2 directories
log "Setting up PM2 directories..."
sudo mkdir -p /var/log/pm2
sudo chown -R $USER:$USER /var/log/pm2

# Start the application with PM2
log "Starting application with PM2..."
pm2 start ecosystem.config.js
pm2 save
pm2 startup | grep -E '^sudo' | sh || true

# Configure NGINX
log "Configuring NGINX..."
sudo cp nginx.conf /etc/nginx/sites-available/${APP_NAME}

# Update domain in NGINX config
sudo sed -i "s/your-domain.com/${DOMAIN}/g" /etc/nginx/sites-available/${APP_NAME}

# Enable the site
sudo ln -sf /etc/nginx/sites-available/${APP_NAME} /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test NGINX configuration
log "Testing NGINX configuration..."
sudo nginx -t

# Restart NGINX
log "Restarting NGINX..."
sudo systemctl restart nginx
sudo systemctl enable nginx

# Set up firewall (UFW)
log "Configuring firewall..."
sudo ufw --force enable
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH

# Create a simple health check endpoint (optional)
log "Setting up health check..."
cat > ${APP_DIR}/health.js << 'EOF'
const http = require('http');
const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'healthy', timestamp: new Date().toISOString() }));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});
server.listen(3002, () => {
  console.log('Health check server running on port 3002');
});
EOF

# Display status
log "Checking application status..."
pm2 status

# Final instructions
echo
log "Installation completed successfully!"
echo
echo -e "${BLUE}=== NEXT STEPS ===${NC}"
echo -e "${GREEN}1. Update your domain name in the NGINX configuration:${NC}"
echo -e "   sudo nano /etc/nginx/sites-available/${APP_NAME}"
echo
echo -e "${GREEN}2. For HTTPS (recommended), install SSL certificate:${NC}"
echo -e "   sudo apt install certbot python3-certbot-nginx"
echo -e "   sudo certbot --nginx -d ${DOMAIN}"
echo
echo -e "${GREEN}3. Access your application:${NC}"
echo -e "   http://${DOMAIN} (or your server's IP address)"
echo
echo -e "${GREEN}4. Useful PM2 commands:${NC}"
echo -e "   pm2 status          - Check application status"
echo -e "   pm2 restart ${APP_NAME}  - Restart application"
echo -e "   pm2 logs ${APP_NAME}     - View application logs"
echo -e "   pm2 monit           - Monitor applications"
echo
echo -e "${GREEN}5. NGINX commands:${NC}"
echo -e "   sudo systemctl status nginx   - Check NGINX status"
echo -e "   sudo systemctl restart nginx  - Restart NGINX"
echo -e "   sudo nginx -t                 - Test NGINX config"
echo
echo -e "${YELLOW}Note: Remember to update the API endpoint in your React app settings${NC}"
echo -e "${YELLOW}to point to your actual backend server.${NC}"
echo
log "Employee Frontend is now running on port 3001 and accessible via NGINX!"
