module.exports = {
  apps: [{
    name: 'employee-frontend',
    script: 'serve',
    args: '-s build -l 3001',
    cwd: '/var/www/employee-frontend',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    },
    error_file: '/var/log/pm2/employee-frontend-error.log',
    out_file: '/var/log/pm2/employee-frontend-out.log',
    log_file: '/var/log/pm2/employee-frontend-combined.log',
    time: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};

