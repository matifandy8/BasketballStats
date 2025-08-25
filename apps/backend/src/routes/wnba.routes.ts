import { Router } from 'express';
import { scheduleCtrl, pbpCtrl, scheduleByDateCtrl, scheduleTodayCtrl, teamsCtrl } from '../controllers/nbawnba.controller';
import { object, string, union, literal } from 'valibot';
import { apiLimiter, cache } from '../middlewares/cacheRateLimiter.middleware';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

const ScheduleSchema = object({
  year: string(),
  type: union([literal('PRE'), literal('REG'), literal('CC'), literal('PST')])
});

const PbpSchema = object({ gameId: string() });

// Schedule routes
router.get(
  '/schedule/:year/:type',
  apiLimiter(60),
  validate(ScheduleSchema, 'params'),
  cache(req => `schedule:wnba:${req.params.year}:${req.params.type}`, 60),
  (req, res, next) => {
    req.params.league = 'wnba';
    next();
  },
  scheduleCtrl
);

// Teams route
router.get(
  '/teams',
  apiLimiter(60),
  cache('teams:wnba', 3600),
  (req, res, next) => {
    req.params.league = 'wnba';
    next();
  },
  teamsCtrl
);

// Schedule by date
router.get(
  '/schedule/date/:date',
  apiLimiter(60),
  cache(req => `schedule:wnba:date:${req.params.date}`, 30),
  (req, res, next) => {
    req.params.league = 'wnba';
    next();
  },
  scheduleByDateCtrl
);

// Today's schedule
router.get(
  '/schedule/today',
  apiLimiter(60),
  cache(`schedule:wnba:today:${new Date().toISOString().split('T')[0]}`, 30),
  (req, res, next) => {
    req.params.league = 'wnba';
    next();
  },
  scheduleTodayCtrl
);

// Game play-by-play
router.get(
  '/game/:gameId/pbp',
  apiLimiter(60),
  validate(PbpSchema, 'params'),
  cache(req => `pbp:wnba:${req.params.gameId}`, 5),
  (req, res, next) => {
    req.params.league = 'wnba';
    next();
  },
  pbpCtrl
);

export default router;
