import express, { Request, Response, NextFunction } from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Vercel!');
});

// Example of an async route with error handling
app.get('/api/data', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Simulating an async operation
    const data = await fetchSomeData();
    res.json(data);
  } catch (error) {
    next(error); // Pass errors to the error handler
  }
});

// Custom error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// Simulated async function
async function fetchSomeData(): Promise<{ message: string }> {
  // In a real app, this might be a database query or API call
  return new Promise(resolve => setTimeout(() => resolve({ message: 'Data fetched successfully' }), 100));
}

// For local development, we'll listen on a port
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

// For Vercel, we need to export the Express app
export default app;