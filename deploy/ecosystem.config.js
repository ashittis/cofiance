// pm2 process manager config — starts BOTH apps with one command:
//   pm2 start ~/cofiance/deploy/ecosystem.config.js
//   pm2 save && pm2 startup   (run the line pm2 startup prints, for reboot persistence)
//
// Assumes the repo was cloned to /home/ubuntu/cofiance. Adjust the paths if different.
module.exports = {
  apps: [
    {
      name: "web", // Next.js — reads frontend/.env.production
      cwd: "/home/ubuntu/cofiance/frontend",
      script: "npm",
      args: "start", // = next start on port 3000
      env: { NODE_ENV: "production" },
    },
    {
      name: "api", // FastAPI via the venv's uvicorn — reads backend/.env
      cwd: "/home/ubuntu/cofiance/backend",
      script: "./.venv/bin/uvicorn",
      interpreter: "none", // run the uvicorn binary directly (not via node)
      args: "app.main:app --host 127.0.0.1 --port 8000 --workers 2",
    },
  ],
};
