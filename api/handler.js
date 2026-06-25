const fs = require('fs');
const path = require('path');

const distPath = path.resolve(__dirname, '../dist');
const indexPath = path.join(distPath, 'index.html');

module.exports = (req, res) => {
  // Serve index.html for all requests
  const indexContent = fs.readFileSync(indexPath, 'utf-8');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  res.status(200).send(indexContent);
};
