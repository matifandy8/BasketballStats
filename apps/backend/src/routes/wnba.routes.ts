import { Router } from 'express';
import {
  scheduleCtrl,
  pbpCtrl,
  scheduleByDateCtrl,
  scheduleTodayCtrl,
  teamIdCtrl,
  standingsCtrl,
  newsCtrl,
  highlightsCtrl,
} from '../controllers/nbawnba.controller';
import { object, string, union, literal } from 'valibot';
import { apiLimiter, cache } from '../middlewares/cacheRateLimiter.middleware';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

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

router.get(
  '/schedule/:year/:type',
  apiLimiter(60),
  validate(ScheduleSchema, 'params'),
  cache(req => `schedule:wnba:${req.params.year}:${req.params.type}`, 3600),
  (req, res, next) => {
    req.params.league = 'wnba';
    next();
  },
  scheduleCtrl
);

router.get(
  '/schedule/today',
  apiLimiter(60),
  (req, res, next) => {
    const today = new Date().toISOString().split('T')[0];
    req.params.league = 'wnba';
    req.params.date = today;
    next();
  },
  cache(req => `schedule:wnba:${req.params.date}`, 3600),
  scheduleTodayCtrl
);

router.get(
  '/schedule/:date',
  apiLimiter(60),
  validate(DateSchema, 'params'),
  (req, res, next) => {
    req.params.league = 'wnba';
    next();
  },
  cache(req => `schedule:wnba:${req.params.date}`, 1600),
  scheduleByDateCtrl
);

router.get(
  '/teams/:teamId',
  apiLimiter(60),
  validate(TeamIdSchema, 'params'),
  cache(req => `team:wnba:${req.params.teamId}`, 3600),
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
  cache(req => `pbp:wnba:${req.params.gameId}`, 300),
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
  cache(req => `standings:wnba:${req.params.year}:${req.params.type}`, 3600),
  (req, res, next) => {
    req.params.league = 'wnba';
    next();
  },
  standingsCtrl
);

router.get(
  '/news',
  apiLimiter(60),
  cache('news:wnba', 300),
  (req, res, next) => {
    req.params.league = 'wnba';
    next();
  },
  newsCtrl
);

router.get(
  '/highlights',
  apiLimiter(60),
  cache('highlights:wnba', 300),
  (req, res, next) => {
    req.params.league = 'wnba';
    next();
  },
  highlightsCtrl
);

export default router;
