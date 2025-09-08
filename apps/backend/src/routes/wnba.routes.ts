import { Router } from 'express';
import {
  scheduleCtrl,
  pbpCtrl,
  scheduleByDateCtrl,
  scheduleTodayCtrl,
  teamsCtrl,
  teamIdCtrl,
  standingsCtrl,
} from '../controllers/nbawnba.controller';
import { object, string, union, literal } from 'valibot';
import { apiLimiter, cache } from '../middlewares/cacheRateLimiter.middleware';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

// Schemas
const ScheduleSchema = object({
  year: string(),
  type: union([literal('PRE'), literal('REG'), literal('POST')]),
});

const DateSchema = object({
  date: string(),
});

const GameIdSchema = object({
  gameId: string(),
});

const TeamIdSchema = object({
  teamId: string(),
});

// Routes
router.get(
  '/schedule/:year/:type',
  apiLimiter(60),
  validate(ScheduleSchema, 'params'),
  cache(req => `schedule:wnba:${req.params.year}:${req.params.type}`, 3600), // 1 hour cache
  (req, res, next) => {
    req.params.league = 'wnba';
    next();
  },
  scheduleCtrl
);

router.get(
  '/schedule/date/:date',
  apiLimiter(60),
  validate(DateSchema, 'params'),
  cache(req => `schedule:date:wnba:${req.params.date}`, 300), // 5 minute cache
  (req, res, next) => {
    req.params.league = 'wnba';
    next();
  },
  scheduleByDateCtrl
);

router.get(
  '/schedule/today',
  apiLimiter(60),
  cache('schedule:today:wnba', 300), // 5 minute cache
  (req, res, next) => {
    req.params.league = 'wnba';
    next();
  },
  scheduleTodayCtrl
);

router.get(
  '/teams',
  apiLimiter(60),
  cache('teams:wnba', 86400), // 24 hour cache
  (req, res, next) => {
    req.params.league = 'wnba';
    next();
  },
  teamsCtrl
);

router.get(
  '/teams/:teamId',
  apiLimiter(60),
  validate(TeamIdSchema, 'params'),
  cache(req => `team:wnba:${req.params.teamId}`, 3600), // 1 hour cache
  (req, res, next) => {
    req.params.league = 'wnba';
    next();
  },
  teamIdCtrl
);

router.get(
  '/game/:gameId/pbp',
  apiLimiter(60),
  validate(GameIdSchema, 'params'),
  cache(req => `pbp:wnba:${req.params.gameId}`, 300), // 5 minute cache
  (req, res, next) => {
    req.params.league = 'wnba';
    next();
  },
  pbpCtrl
);

router.get(
  '/standings/:year/:type',
  apiLimiter(60),
  validate(ScheduleSchema, 'params'),
  cache(req => `standings:wnba:${req.params.year}:${req.params.type}`, 3600), // 1 hour cache
  (req, res, next) => {
    req.params.league = 'wnba';
    next();
  },
  standingsCtrl
);

export default router;
