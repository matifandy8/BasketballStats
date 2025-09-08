import { Router, Request, Response } from 'express';
import nbaRoutes from './nba.routes';
import wnbaRoutes from './wnba.routes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'NBA & WNBA Sports API',
    version: '1.0.0',
    endpoints: {
      nba: {
        schedule: '/nba/schedule/:year/:type',
        gamePBP: '/nba/game/:gameId/pbp',
        scheduleByDate: '/nba/schedule/date/:date',
        today: '/nba/schedule/today',
        teams: '/nba/teams',
        team: '/nba/teams/:teamId',
        standings: '/nba/standings/:year/:type',
        news: '/nba/news',
      },
      wnba: {
        schedule: '/wnba/schedule/:year/:type',
        gamePBP: '/wnba/game/:gameId/pbp',
        scheduleByDate: '/wnba/schedule/date/:date',
        today: '/wnba/schedule/today',
        teams: '/wnba/teams',
        team: '/wnba/teams/:teamId',
        standings: '/wnba/standings/:year/:type',
        news: '/wnba/news',
      },
      docs: 'https://github.com/yourusername/nba-wnba-api',
    },
    status: 'running',
    timestamp: new Date().toISOString(),
  });
});

router.use('/nba', nbaRoutes);
router.use('/wnba', wnbaRoutes);

export default router;
