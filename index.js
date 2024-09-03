const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from Vercel!');
});

// Example of an async route with error handling
app.get('/api/data', async (req, res, next) => {
  try {
    // Simulating an async operation
    const data = await fetchSomeData();
    res.json(data);
  } catch (error) {
    next(error); // Pass errors to the error handler
  }
});

// Custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// For Vercel, we need to export the Express app
module.exports = app;

// For local development, we'll listen on a port
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

// Simulated async function
async function fetchSomeData() {
  // In a real app, this might be a database query or API call
  return new Promise(resolve => setTimeout(() => resolve({ message: 'Data fetched successfully' }), 100));
}