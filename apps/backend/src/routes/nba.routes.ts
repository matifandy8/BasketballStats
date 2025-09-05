import { Router } from 'express';
import {
  scheduleCtrl,
  pbpCtrl,
  scheduleByDateCtrl,
  scheduleTodayCtrl,
  teamsCtrl,
  teamIdCtrl,
} from '../controllers/nbawnba.controller';
import { object, string, union, literal } from 'valibot';
import { apiLimiter, cache } from '../middlewares/cacheRateLimiter.middleware';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

const ScheduleSchema = object({
  year: string(),
  type: union([literal('PRE'), literal('REG'), literal('CC'), literal('PST')]),
});

const PbpSchema = object({ gameId: string() });

router.get(
  '/schedule/:year/:type',
  apiLimiter(60),
  validate(ScheduleSchema, 'params'),
  cache(req => `schedule:nba:${req.params.year}:${req.params.type}`, 60),
  (req, res, next) => {
    req.params.league = 'nba';
    next();
  },
  scheduleCtrl
);

router.get(
  '/teams',
  apiLimiter(60),
  cache('teams:nba', 3600),
  (req, res, next) => {
    req.params.league = 'nba';
    next();
  },
  teamsCtrl
);

router.get(
  '/teams/:teamId',
  apiLimiter(60),
  cache(req => `pbp:team:${req.params.teamId}`, 5),
  (req, res, next) => {
    req.params.league = 'nba';
    next();
  },
  teamIdCtrl
);

router.get(
  '/schedule/date/:date',
  apiLimiter(60),
  cache(req => `schedule:nba:date:${req.params.date}`, 30),
  (req, res, next) => {
    req.params.league = 'nba';
    next();
  },
  scheduleByDateCtrl
);

router.get(
  '/schedule/today',
  apiLimiter(60),
  cache(`schedule:nba:today:${new Date().toISOString().split('T')[0]}`, 30),
  (req, res, next) => {
    req.params.league = 'nba';
    next();
  },
  scheduleTodayCtrl
);

router.get(
  '/game/:gameId/pbp',
  apiLimiter(60),
  validate(PbpSchema, 'params'),
  cache(req => `pbp:nba:${req.params.gameId}`, 5),
  (req, res, next) => {
    req.params.league = 'nba';
    next();
  },
  pbpCtrl
);

export default router;
