// api/index.js
const { createN8nApp } = require('n8n');

let app;

module.exports = async (req, res) => {
  if (!app) {
    app = await createN8nApp({
      config: {
        path: '/',
        workflowFolder: '/vercel/path0/workflows',
        database: {
          type: 'sqlite',
          sqlite: {
            database: '/tmp/n8n.sqlite'
          }
        },
        executionMode: 'queue',
        diagnostics: { enabled: false },
        telemetry: { enabled: false }
      }
    });
    await app.prepare();
  }
  return app.app(req, res);
};