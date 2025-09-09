import { Request, Response, NextFunction } from 'express';
import {
  getSchedule,
  getPbp,
  getTeams,
  getDailySchedule,
  getTeamById,
  getStandings,
  getNews,
  getHighlights,
} from '../services/sportradar.service';
import { Player, SeasonType } from '../types/sportradar.types';
import { League } from '../utils/http';
import crypto from 'crypto';
import sharp from "sharp";
import { NewsArticle, NewsResponse } from '../types/news';

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
        schedule: '/api/nba/schedule/:year/:type',
        gamePBP: '/api/nba/game/:gameId/pbp',
        scheduleByDate: '/api/nba/schedule/date/:date',
        today: '/api/nba/schedule/today',
        teams: '/api/nba/teams',
        standings: '/api/nba/standings/:year/:type',
      },
      wnba: {
        schedule: '/api/wnba/schedule/:year/:type',
        gamePBP: '/api/wnba/game/:gameId/pbp',
        scheduleByDate: '/api/wnba/schedule/date/:date',
        today: '/api/wnba/schedule/today',
        teams: '/api/wnba/teams',
        standings: '/api/wnba/standings/:year/:type',
      },
      docs: 'https://github.com/matifandy8/BasketballStats',
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

export const newsCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const league = req.params.league as League;
    const data: NewsResponse = await getNews(league);

    const optimizedArticles: NewsArticle[] = await Promise.all(
      data.articles.map(async (article) => {
        if (!article.urlToImage) return article;

        try {
          const response = await fetch(article.urlToImage);

          if (!response.ok) {
            console.warn(`Error fetching image: ${article.urlToImage}`);
            return article;
          }

          const buffer = Buffer.from(await response.arrayBuffer());

          const optimizedBuffer = await sharp(buffer)
            .resize({ width: 800 })
            .webp({ quality: 80 })
            .toBuffer();

          const optimizedBase64 = `data:image/webp;base64,${optimizedBuffer.toString(
            "base64"
          )}`;

          return {
            ...article,
            urlToImage: optimizedBase64,
          };
        } catch (error) {
          console.error("Error optimizing image:", error);
          return article;
        }
      })
    );

    const responsePayload: NewsResponse = {
      ...data,
      articles: optimizedArticles,
    };

    res.json(responsePayload);
  } catch (e) {
    next(e);
  }
};

export const highlightsCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const league = req.params.league as League;
    const data = await getHighlights(league);
    res.json(data);
  } catch (e) {
    next(e);
  }
};
