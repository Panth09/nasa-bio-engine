// api/index.js
const { createN8nApp } = require('n8n');

let n8nApp;

module.exports = async (req, res) => {
  if (!n8nApp) {
    n8nApp = await createN8nApp({
      config: {
        path: '/',
        workflowFolder: '/vercel/path0/workflows',
        database: { type: 'sqlite' },
        executionMode: 'queue',
        diagnostics: { enabled: false },
        telemetry: { enabled: false }
      }
    });
    await n8nApp.prepare();
  }
  return n8nApp.app(req, res);
};