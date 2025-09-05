import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import path from 'path';
import { errorMiddleware } from './middlewares/error.middleware';
import routes from './routes/nbawnba.routes';

const app = express();

app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(express.json());
app.use(pinoHttp());

app.use('/images', express.static(path.join(__dirname, '../images')));

app.get('/', (req, res) => {
  res.redirect('/api');
});

app.get('/api', (req, res) => {
  res.json({
    message: 'NBA & WNBA API',
    version: '1.0.0',
    documentation: 'Available at /api/sports',
    status: 'running',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/sports', routes);

app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`,
  });
});

app.use(errorMiddleware);

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API Documentation: http://localhost:${PORT}/api`);
  });
}

export default app;
