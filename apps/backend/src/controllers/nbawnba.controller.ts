import { Request, Response, NextFunction } from 'express';
import { getSchedule, getPbp, getTeams, getDailySchedule } from '../services/sportradar.service';
import { SeasonType } from '../types/sportradar.types';
import { League } from '../utils/http';

export async function scheduleCtrl(req: Request, res: Response, next: NextFunction) {
  try {
    const league = req.params.league as League;
    const year = Number(req.params.year);
    const type = req.params.type as SeasonType;
    const data = await getSchedule(league, year, type);
    res.json(data);
  } catch (e) { next(e); }
}

export async function pbpCtrl(req: Request, res: Response, next: NextFunction) {
  try {
    const league = req.params.league as League;
    const { gameId } = req.params;
    const data = await getPbp(league, gameId);
    res.json(data);
  } catch (e) { next(e); }
}

export async function scheduleByDateCtrl(req: Request, res: Response, next: NextFunction) {
  try {
    const league = req.params.league as League;
    const { date } = req.params; 
    const games = await getDailySchedule(league, date);
    res.json(games);
  } catch (err) { next(err); }
}

export async function scheduleTodayCtrl(req: Request, res: Response, next: NextFunction) {
  try {
    const league = req.params.league as League;
    const today = new Date().toISOString().slice(0,10);
    const games = await getDailySchedule(league, today);
    res.json(games);
  } catch (err) { next(err); }
}

export async function teamsCtrl(req: Request, res: Response, next: NextFunction) {
  try {
    const league = req.params.league as League;
    const data = await getTeams(league);
    res.json(data);
  } catch (err) { next(err); }
}

export const apiInfoCtrl = (req: Request, res: Response) => {
  res.json({
    message: 'NBA & WNBA API',
    version: '1.0.0',
    endpoints: {
      nba: {
        schedule: '/api/sports/nba/schedule/:year/:type',
        gamePBP: '/api/sports/nba/game/:gameId/pbp',
        scheduleByDate: '/api/sports/nba/schedule/date/:date',
        today: '/api/sports/nba/schedule/today',
        teams: '/api/sports/nba/teams'
      },
      wnba: {
        schedule: '/api/sports/wnba/schedule/:year/:type',
        gamePBP: '/api/sports/wnba/game/:gameId/pbp',
        scheduleByDate: '/api/sports/wnba/schedule/date/:date',
        today: '/api/sports/wnba/schedule/today',
        teams: '/api/sports/wnba/teams'
      },
      docs: 'https://github.com/yourusername/nba-wnba-api'
    },
    status: 'running',
    timestamp: new Date().toISOString()
  });
};
