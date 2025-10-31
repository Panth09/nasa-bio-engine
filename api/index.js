// api/index.js
import { createN8nApp } from 'n8n';
import { readFile } from 'fs/promises';
import { join } from 'path';

let n8nApp;
let uiHtml;

// Load n8n's built-in UI HTML once
async function loadUI() {
  if (!uiHtml) {
    const uiPath = join(process.cwd(), 'node_modules/n8n/dist/index.html');
    uiHtml = await readFile(uiPath, 'utf-8');
  }
  return uiHtml;
}

export default async function handler(req, res) {
  // Initialize n8n
  if (!n8nApp) {
    n8nApp = await createN8nApp({
      config: {
        path: '/api',  // n8n API & Webhook at /api
        workflowFolder: './workflows',
        database: { type: 'sqlite' },
        executionMode: 'queue',
        diagnostics: { enabled: false },
        telemetry: { enabled: false }
      }
    });
    await n8nApp.prepare();
  }

  // Serve n8n UI at root "/"
  if (req.url === '/' || req.url === '/index.html') {
    const html = await loadUI();
    res.setHeader('Content-Type', 'text/html');
    return res.send(html.replace('/api', '/api')); // Fix asset paths
  }

  // Forward all other requests to n8n (API, webhook, assets)
  return n8nApp.app(req, res);
}