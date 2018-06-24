module.exports = {
    apps : [
    {
      name       : "web-server",
      script     : "web-server/app.js",
      instances  : 1,
      exec_mode  : "fork",
      env: {
        "NODE_ENV"  : "development",
        "PORT": 3001
      },
    },
    {
      name          : "game-server",
      script        : "game-server/app.js",
      exec_mode     : "fork",
      env: {
        "NODE_ENV"  : "development",
      },
      env_production    : {
         "NODE_ENV": "production"
      }
    }]
}