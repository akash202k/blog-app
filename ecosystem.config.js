module.exports = {
  apps: [
    {
      name: 'NextAppName',
      exec_mode: 'cluster',
      instances: 1, // Or a number of instances
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      env: {
        NODE_ENV: 'production', // APP_ENV=local
        PORT: 3000,
      }
    }
  ]
}