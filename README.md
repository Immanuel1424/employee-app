
# Employee Frontend Application

A professional React-based Employee Management System frontend built with modern technologies and best practices. This application provides a comprehensive interface for managing employee data, analytics, and system settings.

## 🚀 Features

- **Dashboard**: Overview of employee statistics and key metrics
- **Employee Management**: Search, filter, and view employee information
- **Analytics**: Visual insights with charts and graphs
- **Settings**: System configuration and preferences
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components

## 🛠 Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Process Management**: PM2
- **Web Server**: NGINX (reverse proxy)

## 📋 Prerequisites

Before installing the application, ensure you have:

- Ubuntu 24.04 LTS (recommended)
- Sudo privileges on the system
- Internet connection for downloading packages
- A domain name (optional, for production setup)

## 🔧 Installation

### Automated Installation (Recommended)

1. **Clone or download the application files** to your local machine

2. **Run the installation script**:
   ```bash
   chmod +x install.sh
   ./install.sh
   ```

   The script will automatically:
   - Update system packages
   - Install Node.js 20
   - Install PM2 process manager
   - Install and configure NGINX
   - Build the React application
   - Set up the production environment

### Manual Installation

If you prefer to install manually:

1. **Update system and install Node.js**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs build-essential
   ```

2. **Install PM2 and NGINX**:
   ```bash
   sudo npm install -g pm2
   sudo apt install -y nginx
   ```

3. **Set up application**:
   ```bash
   sudo mkdir -p /var/www/employee-frontend
   sudo chown -R $USER:$USER /var/www/employee-frontend
   cp -r . /var/www/employee-frontend/
   cd /var/www/employee-frontend
   npm install
   npm run build
   ```

4. **Configure PM2**:
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

5. **Configure NGINX**:
   ```bash
   sudo cp nginx.conf /etc/nginx/sites-available/employee-frontend
   sudo ln -s /etc/nginx/sites-available/employee-frontend /etc/nginx/sites-enabled/
   sudo rm /etc/nginx/sites-enabled/default
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## 🚀 Starting the Application

### Using PM2 (Production)

```bash
# Start the application
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs employee-frontend

# Restart application
pm2 restart employee-frontend

# Stop application
pm2 stop employee-frontend

# Monitor applications
pm2 monit
```

### Development Mode

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 NGINX Configuration

The application includes a production-ready NGINX configuration with:

- **Reverse Proxy**: Routes requests to the React app on port 3001
- **SSL Ready**: Prepared for HTTPS certificates
- **Compression**: Gzip compression for better performance
- **Security Headers**: XSS protection, content type options, etc.
- **Static File Caching**: Optimized caching for assets
- **Health Checks**: Built-in health check endpoint

### Setting up SSL (HTTPS)

For production environments, set up SSL certificates:

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate (replace with your domain)
sudo certbot --nginx -d your-domain.com

# Auto-renewal test
sudo certbot renew --dry-run
```

## 📁 Project Structure

```
employee-frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   ├── EmployeeCard.tsx
│   │   └── EmployeeList.tsx
│   ├── pages/              # Main application pages
│   │   ├── Dashboard.tsx
│   │   ├── Employees.tsx
│   │   ├── Analytics.tsx
│   │   └── Settings.tsx
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── components/ui/      # shadcn/ui components
├── public/                 # Static assets
├── ecosystem.config.js     # PM2 configuration
├── nginx.conf             # NGINX configuration
├── install.sh             # Installation script
└── README.md              # This file
```

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=Employee Management System
VITE_APP_VERSION=1.0.0
```

### API Integration

Update the API endpoints in your components to point to your backend server. The application is designed to consume REST APIs and can be easily integrated with any backend technology.

### Customization

- **Branding**: Update colors and logos in `src/index.css` and components
- **API Endpoints**: Modify API calls in components to match your backend
- **Features**: Add or remove pages and components as needed
- **Styling**: Customize the Tailwind CSS configuration in `tailwind.config.ts`

## 🔍 Monitoring and Logging

### PM2 Monitoring

```bash
# Real-time monitoring dashboard
pm2 monit

# View logs
pm2 logs employee-frontend

# Log rotation setup
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
```

### Log Files

- **PM2 Logs**: `/var/log/pm2/employee-frontend-*.log`
- **NGINX Logs**: `/var/log/nginx/employee-frontend-*.log`

## 🔧 Troubleshooting

### Common Issues

1. **Port 3001 already in use**:
   ```bash
   sudo lsof -i :3001
   sudo kill -9 <PID>
   ```

2. **PM2 process not starting**:
   ```bash
   pm2 delete employee-frontend
   pm2 start ecosystem.config.js
   ```

3. **NGINX configuration errors**:
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

4. **Permission issues**:
   ```bash
   sudo chown -R $USER:$USER /var/www/employee-frontend
   ```

### Health Checks

- **Application Health**: `http://your-domain.com/health`
- **PM2 Status**: `pm2 status`
- **NGINX Status**: `sudo systemctl status nginx`

## 🔄 Updates and Deployment

### Updating the Application

```bash
# Navigate to app directory
cd /var/www/employee-frontend

# Pull latest changes (if using git)
git pull origin main

# Install new dependencies
npm install

# Build updated application
npm run build

# Restart with PM2
pm2 restart employee-frontend
```

### Backup

Regular backups are recommended:

```bash
# Backup application files
sudo tar -czf /backup/employee-frontend-$(date +%Y%m%d).tar.gz /var/www/employee-frontend

# Backup NGINX configuration
sudo cp /etc/nginx/sites-available/employee-frontend /backup/
```

## 📞 Support

For issues and questions:

1. Check the logs: `pm2 logs employee-frontend`
2. Verify NGINX configuration: `sudo nginx -t`
3. Check system resources: `htop` or `pm2 monit`
4. Review the installation script output

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Note**: This is a frontend application that requires a separate backend API. Make sure to update the API endpoints in the application settings to point to your actual backend server.
