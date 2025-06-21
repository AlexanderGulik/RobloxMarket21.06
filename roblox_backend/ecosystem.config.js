module.exports = {
    apps: [
      {
        name: 'RobloxMarket',
        script: './src/app.js', 
        instances: '2',
        exec_mode: 'cluster',
        autorestart: true,
        watch: false, 
        max_memory_restart: '1G',
      },
    ],
  };