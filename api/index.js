// api/index.js
const { createN8nApp } = require('n8n');

let n8nApp;

module.exports = async (req, res) => {
  if (!n8nApp) {
    // First request → initialise n8n
    n8nApp = await createN8nApp({
      // Minimal config – everything else comes from env vars
      config: {
        path: '/api',               // optional, keeps UI at /api
        workflowFolder: '/vercel/path0/workflows',
      },
    });
    await n8nApp.prepare();
  }

  // Forward the request to n8n
  return n8nApp.app(req, res);
};