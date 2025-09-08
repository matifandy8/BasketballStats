import { Request, Response, NextFunction } from 'express';
import {
  getSchedule,
  getPbp,
  getTeams,
  getDailySchedule,
  getTeamById,
  getStandings,
  getNews,
} from '../services/sportradar.service';
import { Player, SeasonType } from '../types/sportradar.types';
import { League } from '../utils/http';
import crypto from 'crypto';

export async function scheduleCtrl(req: Request, res: Response, next: NextFunction) {
  try {
    const league = req.params.league as League;
    const year = Number(req.params.year);
    const type = req.params.type as SeasonType;
    const data = await getSchedule(league, year, type);
    res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function pbpCtrl(req: Request, res: Response, next: NextFunction) {
  try {
    const league = req.params.league as League;
    const { gameId } = req.params;
    const data = await getPbp(league, gameId);
    res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function scheduleByDateCtrl(req: Request, res: Response, next: NextFunction) {
  try {
    const league = req.params.league as League;
    const { date } = req.params;
    const games = await getDailySchedule(league, date);
    res.json(games);
  } catch (err) {
    next(err);
  }
}

export async function scheduleTodayCtrl(req: Request, res: Response, next: NextFunction) {
  try {
    const league = req.params.league as League;
    const today = new Date().toISOString().slice(0, 10);
    const games = await getDailySchedule(league, today);

    const etag = crypto.createHash('md5').update(JSON.stringify(games)).digest('hex');

    if (req.headers['if-none-match'] === etag) {
      return res.status(304).send();
    }

    res.setHeader('ETag', etag);
    res.json(games);
  } catch (err) {
    next(err);
  }
}

export async function teamsCtrl(req: Request, res: Response, next: NextFunction) {
  try {
    const league = req.params.league as League;
    const data = await getTeams(league);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function teamIdCtrl(req: Request, res: Response, next: NextFunction) {
  try {
    const league = req.params.league as League;
    const { teamId } = req.params;

    if (!teamId) {
      return res.status(400).json({ error: 'Team ID is required' });
    }

    const data = await getTeamById(league, teamId);

    if (!data.players || !Array.isArray(data.players)) {
      return res.json(data);
    }

    const BASE_URL =
      'https://cdn.jsdelivr.net/gh/matifandy8/BasketballStats@main/apps/backend/images/players-headshot';

    const playersWithImages = data.players.map((player: Player) => {
      if (!player?.full_name) return player;

      const nameParts = player.full_name.split(' ');
      const formattedName = nameParts
        .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join('_');

      const filename = `${formattedName}.png`;
      return {
        ...player,
        image_url: `${BASE_URL}/${filename}`,
      };
    });

    data.players = playersWithImages;
    res.json(data);
  } catch (error) {
    console.error(`Error fetching team ${req.params.teamId}:`, error);
    next(error);
  }
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
        teams: '/api/sports/nba/teams',
        standings: '/api/sports/nba/standings/:year/:type',
      },
      wnba: {
        schedule: '/api/sports/wnba/schedule/:year/:type',
        gamePBP: '/api/sports/wnba/game/:gameId/pbp',
        scheduleByDate: '/api/sports/wnba/schedule/date/:date',
        today: '/api/sports/wnba/schedule/today',
        teams: '/api/sports/wnba/teams',
        standings: '/api/sports/wnba/standings/:year/:type',
      },
      docs: 'https://github.com/yourusername/nba-wnba-api',
    },
    status: 'running',
    timestamp: new Date().toISOString(),
  });
};

export const standingsCtrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const league = req.params.league as League;
    const year = Number(req.params.year);
    const type = req.params.type as SeasonType;
    const data = await getStandings(league, year, type);
    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const newsCtrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getNews(req.params.league as League);
    res.json(data);
  } catch (e) {
    next(e);
  }
};
