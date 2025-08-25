import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import { errorMiddleware } from './middlewares/error.middleware';
import routes from './routes/nbawnba.routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(pinoHttp());

// Root route
app.get('/', (req, res) => {
  res.redirect('/api');
});

// API documentation route
app.get('/api', (req, res) => {
  res.json({
    message: 'NBA & WNBA API',
    version: '1.0.0',
    documentation: 'Available at /api/sports',
    endpoints: {
      nba: '/api/sports/nba',
      wnba: '/api/sports/wnba'
    },
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/sports', routes);

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`
  });
});

app.use(errorMiddleware);

// Only start the server if this file is run directly
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API Documentation: http://localhost:${PORT}/api`);
  });
}

export default app;
