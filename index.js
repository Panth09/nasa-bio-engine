// index.js
import { createN8nApp } from 'n8n';

let n8nApp;

export default async function handler(req, res) {
  if (!n8nApp) {
    n8nApp = await createN8nApp({
      config: {
        path: '/',
        workflowFolder: './workflows',
        database: { type: 'sqlite' },
        executionMode: 'queue',
        diagnostics: { enabled: false },
        telemetry: { enabled: false }
      }
    });
    await n8nApp.prepare();
  }
  return n8nApp.app(req, res);
}