import { Router, Request, Response } from 'express';
import nbaRoutes from './nba.routes';
import wnbaRoutes from './wnba.routes';
import { apiLimiter } from '../middlewares/cacheRateLimiter.middleware';
import {
  pbpCtrl,
  scheduleByDateCtrl,
  scheduleTodayCtrl,
  teamsCtrl,
} from '../controllers/nbawnba.controller';

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
        team: '/nba/teams/teamId',
      },
      wnba: {
        schedule: '/wnba/schedule/:year/:type',
        gamePBP: '/wnba/game/:gameId/pbp',
        scheduleByDate: '/wnba/schedule/date/:date',
        today: '/wnba/schedule/today',
        teams: '/wnba/teams',
        team: '/wnba/teams/teamId',
      },
      docs: 'https://github.com/yourusername/nba-wnba-api',
    },
    status: 'running',
    timestamp: new Date().toISOString(),
  });
});

router.use('/nba', nbaRoutes);

router.use('/wnba', wnbaRoutes);

router.get(
  '/teams',
  apiLimiter(60),
  (req, res, next) => {
    req.params.league = req.query.league === 'wnba' ? 'wnba' : 'nba';
    next();
  },
  teamsCtrl
);

router.get(
  '/schedule/date/:date',
  apiLimiter(60),
  (req, res, next) => {
    req.params.league = req.query.league === 'wnba' ? 'wnba' : 'nba';
    next();
  },
  scheduleByDateCtrl
);

router.get(
  '/schedule/today',
  apiLimiter(60),
  (req, res, next) => {
    req.params.league = req.query.league === 'wnba' ? 'wnba' : 'nba';
    next();
  },
  scheduleTodayCtrl
);

router.get(
  '/game/:gameId/pbp',
  apiLimiter(60),
  (req, res, next) => {
    req.params.league = req.query.league === 'wnba' ? 'wnba' : 'nba';
    next();
  },
  pbpCtrl
);

export default router;
