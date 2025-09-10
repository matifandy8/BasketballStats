import { Router } from 'express';
import {
  scheduleCtrl,
  pbpCtrl,
  scheduleByDateCtrl,
  scheduleTodayCtrl,
  teamsCtrl,
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
  type: union([literal('PRE'), literal('REG'), literal('CC'), literal('PST')]),
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
  cache(req => `schedule:nba:${req.params.year}:${req.params.type}`, 3600),
  (req, res, next) => {
    req.params.league = 'nba';
    next();
  },
  scheduleCtrl
);

router.get(
  '/schedule/date/:date',
  apiLimiter(60),
  validate(DateSchema, 'params'),
  cache(req => `schedule:date:nba:${req.params.date}`, 300),
  (req, res, next) => {
    req.params.league = 'nba';
    next();
  },
  scheduleByDateCtrl
);

router.get(
  '/schedule/today',
  apiLimiter(60),
  cache('schedule:today:nba', 300),
  (req, res, next) => {
    req.params.league = 'nba';
    next();
  },
  scheduleTodayCtrl
);

router.get(
  '/teams',
  apiLimiter(60),
  cache('teams:nba', 86400),
  (req, res, next) => {
    req.params.league = 'nba';
    next();
  },
  teamsCtrl
);

router.get(
  '/teams/:teamId',
  apiLimiter(60),
  validate(TeamIdSchema, 'params'),
  cache(req => `team:nba:${req.params.teamId}`, 3600),
  (req, res, next) => {
    req.params.league = 'nba';
    next();
  },
  teamIdCtrl
);

router.get(
  '/game/:gameId/pbp',
  apiLimiter(60),
  validate(GameIdSchema, 'params'),
  cache(req => `pbp:nba:${req.params.gameId}`, 300),
  (req, res, next) => {
    req.params.league = 'nba';
    next();
  },
  pbpCtrl
);

router.get(
  '/standings/:year/:type',
  apiLimiter(60),
  validate(ScheduleSchema, 'params'),
  cache(req => `standings:nba:${req.params.year}:${req.params.type}`, 3600),
  (req, res, next) => {
    req.params.league = 'nba';
    next();
  },
  standingsCtrl
);

router.get(
  '/news',
  apiLimiter(60),
  cache('news:nba', 43200),
  (req, res, next) => {
    req.params.league = 'nba';
    next();
  },
  newsCtrl
);

router.get(
  '/highlights',
  apiLimiter(60),
  cache('highlights:nba', 43200),
  (req, res, next) => {
    req.params.league = 'nba';
    next();
  },
  highlightsCtrl
);

export default router;
