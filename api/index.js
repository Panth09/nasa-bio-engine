// api/index.js (Test version)
export default function handler(req, res) {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.send('<h1>n8n Vercel Test - UI Placeholder</h1><p>Webhook at /api/process</p>');
  } else if (req.url === '/api/process') {
    res.json({ message: 'Webhook triggered! (n8n would run here)' });
  } else if (req.url.startsWith('/api/')) {
    res.json({ api: true, path: req.url });
  } else {
    res.status(404).send('Not Found');
  }
}