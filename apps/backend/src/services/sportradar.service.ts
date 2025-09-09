import { FetchOptions, httpFetch, httpFetchNews, httpFetchYouTubeVideos, League } from '../utils/http';
import {
  WNBAScheduleResponse,
  WNBAPbpResponse,
  SeasonType,
  WNBAScheduleGame,
  WNBATeamResponse,
  Team,
} from '../types/sportradar.types';
import { Standing } from '../types/standing';
import { YouTubeVideo } from '../types/highlights';

export async function getSchedule(
  league: League,
  year: number,
  type: SeasonType
): Promise<WNBAScheduleResponse> {
  return httpFetch<WNBAScheduleResponse>(league, `/games/${year}/${type}/schedule.json`);
}

export async function getPbp(league: League, gameId: string): Promise<WNBAPbpResponse> {
  return httpFetch<WNBAPbpResponse>(league, `/games/${gameId}/pbp.json`);
}

export async function getScheduleByDate(
  league: League,
  date: string,
  type: SeasonType = 'REG'
): Promise<WNBAScheduleGame[]> {
  const year = new Date(date).getFullYear();
  const schedule = await getSchedule(league, year, type);
  return schedule.games.filter(game => game.scheduled.startsWith(date));
}

export async function getDailySchedule(league: League, date: string): Promise<WNBAScheduleGame[]> {
  try {
    const [year, month, day] = date.split('-');
    const data = await httpFetch<WNBAScheduleResponse>(
      league,
      `/games/${year}/${month}/${day}/schedule.json`
    );
    return data.games || [];
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes('HTTP 404')) {
      return [];
    }
    throw err;
  }
}

export async function getTeams(league: League): Promise<WNBATeamResponse> {
  return httpFetch<WNBATeamResponse>(league, '/teams.json');
}

export async function getTeamById(league: League, teamId: string): Promise<Team> {
  return httpFetch<Team>(league, `/teams/${teamId}/profile.json`);
}

export async function getStandings(
  league: League,
  year: number,
  type: SeasonType
): Promise<Standing> {
  try {
    const endpoint =
      league === 'nba'
        ? `/seasons/${year}/${type}/standings.json`
        : `/seasons/${year}/${type}/standings.json`;

    const data = await httpFetch<Standing>(league, endpoint);
    return data;
  } catch (error) {
    console.error('Error in getStandings:', error);
    throw error;
  }
}

export async function getNews<T>(query: 'nba' | 'wnba', options: FetchOptions = {}): Promise<T> {
  return httpFetchNews<T>(query, options);
}

export async function getHighlights(query: 'nba' | 'wnba', options: FetchOptions = {}): Promise<YouTubeVideo[]> {
  const maxResults = options.queryParams?.maxResults && typeof options.queryParams.maxResults === 'number' 
    ? options.queryParams.maxResults 
    : 5;
  return httpFetchYouTubeVideos(query, maxResults);
}

