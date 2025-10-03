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
import { SeasonType } from '../types/sportradar.types';
import { League } from '../utils/http';
import crypto from 'crypto';
import { NewsArticle, NewsResponse } from '../types/news';
import {
  getOptimizedHighlights,
  scheduleHighlightRefresh,
} from '../services/imageOptimizer.service';
import { optimizeImage } from '../utils/image';
import { attachImagesToPlayers } from '../utils/player';
import { getTodayDate } from '../utils/date';
import logger from '../utils/logger';

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
    const today = getTodayDate();

    const games = await getDailySchedule(league, today);

    res.set({
      'Cache-Control': 'public, max-age=3600',
      'Surrogate-Control': 'max-age=3600',
      'X-League': league,
    });

    res.json({
      success: true,
      date: today,
      league: league,
      games: games || [],
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    logger.error(
      {
        error: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined,
        context: 'scheduleTodayCtrl',
        league: req.params.league,
      },
      "Error fetching today's schedule"
    );

    res.status(500).json({
      success: false,
      error: {
        message: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && {
          debug: err instanceof Error ? err.message : 'Unknown error',
        }),
      },
    });

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

    if (Array.isArray(data.players)) {
      data.players = attachImagesToPlayers(data.players);
    }

    res.json(data);
  } catch (error) {
    logger.error(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        context: 'teamIdCtrl',
        teamId: req.params.teamId,
        league: req.params.league,
      },
      'Error fetching team'
    );
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
        scheduleByDate: '/api/nba/schedule/:date',
        today: '/api/nba/schedule/today',
        teams: '/api/nba/teams',
        standings: '/api/nba/standings/:year/:type',
      },
      wnba: {
        schedule: '/api/wnba/schedule/:year/:type',
        gamePBP: '/api/wnba/game/:gameId/pbp',
        scheduleByDate: '/api/wnba/schedule/:date',
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

export const newsCtrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const league = req.params.league as League;
    const data: NewsResponse = await getNews(league);

    const optimizedArticles: NewsArticle[] = await Promise.all(
      data.articles.map(async article => {
        if (!article.urlToImage) return article;

        const optimized = await optimizeImage(article.urlToImage);
        return {
          ...article,
          urlToImage: optimized || article.urlToImage,
        };
      })
    );

    res.json({ ...data, articles: optimizedArticles });
  } catch (e) {
    next(e);
  }
};

export const highlightsCtrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const league = req.params.league as League;

    const optimizedVideos = await getOptimizedHighlights(league);

    if (!optimizedVideos || optimizedVideos.length === 0) {
      res.set('Retry-After', '60');
      return res.status(503).json({
        error: 'Highlights are currently being loaded. Please try again in a moment.',
      });
    }

    const etag = crypto.createHash('md5').update(JSON.stringify(optimizedVideos)).digest('hex');

    if (req.headers['if-none-match'] === etag) {
      return res.status(304).end();
    }

    res.set({
      'Cache-Control': 'public, max-age=300, s-maxage=600, stale-while-revalidate=300',
      ETag: etag,
      Vary: 'Accept-Encoding',
      'CDN-Cache-Control': 'public, max-age=600, s-maxage=900, stale-while-revalidate=300',
    });

    res.json(optimizedVideos);
  } catch (e) {
    next(e);
  }
};

scheduleHighlightRefresh();
