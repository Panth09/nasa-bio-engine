// index.js (Railway-compatible n8n server)
import express from 'express';
import n8n from 'n8n';

const app = express();
let n8nApp;

// Middleware for JSON bodies (for webhooks)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Initialize n8n
async function initN8n() {
  if (!n8nApp) {
    n8nApp = await n8n.createApp({
      config: {
        path: '/',
        workflowFolder: './workflows',
        database: { type: 'sqlite' },
        executionMode: 'regular',
        diagnostics: { enabled: false },
        telemetry: { enabled: false },
        port: process.env.PORT || 5678,  // Use Railway's PORT
        host: '0.0.0.0',  // Bind to all interfaces
      }
    });
    await n8nApp.prepare();
  }
  return n8nApp;
}

// Mount n8n routes
app.all('*', async (req, res) => {
  const n8nInstance = await initN8n();
  return n8nInstance.app(req, res);
});

// Start server on Railway PORT
const port = process.env.PORT || 5678;
app.listen(port, '0.0.0.0', () => {
  console.log(`n8n ready on 0.0.0.0, port ${port}`);
});

export default app;  // For potential serverless fallback