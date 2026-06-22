const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Serve static files from dist folder
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath, {
  maxAge: '1d',
  etag: false
}));

// SPA fallback - serve index.html for all non-file routes
app.use((req, res) => {
  // Check if the requested path looks like a file (has an extension)
  if (path.extname(req.path)) {
    res.status(404).send('Not Found');
    return;
  }

  // Serve index.html for all other routes
  const indexPath = path.join(distPath, 'index.html');
  res.set('Content-Type', 'text/html');
  res.sendFile(indexPath);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

module.exports = app;
