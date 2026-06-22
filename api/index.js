const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  // Get the requested path
  const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;

  // Serve static files from dist
  if (pathname.startsWith('/assets/') || pathname.endsWith('.js') || pathname.endsWith('.css') || pathname.endsWith('.json')) {
    const filePath = path.join(__dirname, '../dist', pathname);
    try {
      const data = fs.readFileSync(filePath);
      res.setHeader('Content-Type', 'application/octet-stream');
      res.status(200).send(data);
      return;
    } catch (err) {
      res.status(404).send('Not Found');
      return;
    }
  }

  // Serve index.html for all other routes (SPA fallback)
  try {
    const indexPath = path.join(__dirname, '../dist/index.html');
    const data = fs.readFileSync(indexPath, 'utf-8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
}
