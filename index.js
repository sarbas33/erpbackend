const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Vercel!');
});

// For Vercel, we need to export the Express app
module.exports = app;

// For local development, we'll listen on a port
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}