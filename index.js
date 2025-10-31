// index.js
import n8n from 'n8n';

let app;

export default async function handler(req, res) {
  if (!app) {
    app = await n8n.createApp({
      config: {
        path: '/',
        workflowFolder: './workflows',
        database: { type: 'sqlite' },
        executionMode: 'regular',
        diagnostics: { enabled: false },
        telemetry: { enabled: false }
      }
    });
    await app.prepare();
  }
  return app.app(req, res);
}