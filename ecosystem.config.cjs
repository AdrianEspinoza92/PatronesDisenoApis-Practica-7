module.exports = {
  apps: [{
    name: 'practica7-api',
    cwd: __dirname + '/backend',
    script: './dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    autorestart: true,
    max_memory_restart: '300M',
    error_file: '/var/www/practica7/logs/error.log',
    out_file: '/var/www/practica7/logs/output.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    env_production: {
      NODE_ENV: 'production',
      HOST: '127.0.0.1',
      PORT: 3000,
    },
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: process.env.DEPLOY_HOST,
      ref: 'origin/main',
      repo: 'git@github.com:AdrianEspinoza92/PatronesDisenoApis-Practica-7.git',
      path: '/var/www/practica7',
      ssh_options: `IdentityFile=${process.env.DEPLOY_KEY}`,
      'post-deploy': 'ln -sfn /var/www/practica7/shared/.env backend/.env && mkdir -p /var/www/practica7/logs && cd backend && npm ci && npm run build && npm prune --omit=dev && cd .. && pm2 startOrReload ecosystem.config.cjs --env production && pm2 save',
    },
  },
};
