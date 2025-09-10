import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import path from 'path';
import { errorMiddleware } from './middlewares/error.middleware';
import routes from './routes/nbawnba.routes';
import { logger } from './utils/logger';

const app = express();

app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(express.json());
app.use(pinoHttp());

app.use('/images', express.static(path.join(__dirname, '../images')));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.redirect('/api');
});

app.get('/api', (req, res) => {
  res.json({
    message: 'NBA & WNBA API',
    version: '1.0.0',
    documentation: 'Available at /api',
    status: 'running',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

app.use(errorMiddleware);

if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
    logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    logger.info(
      `Redis: ${process.env.REDIS_URL ? 'Connected' : 'Not configured (using in-memory cache)'}`
    );
  });
}

export default app;
