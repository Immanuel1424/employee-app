
module.exports = {
  apps: [{
    name: 'employee-frontend',
    script: 'npm',
    args: 'run preview',
    cwd: '/var/www/employee-frontend',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: '/var/log/pm2/employee-frontend-error.log',
    out_file: '/var/log/pm2/employee-frontend-out.log',
    log_file: '/var/log/pm2/employee-frontend-combined.log',
    time: true
  }]
};
