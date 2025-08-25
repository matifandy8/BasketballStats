import { httpFetch, League } from '../utils/http';
import { 
  WNBAScheduleResponse, WNBAPbpResponse, SeasonType, WNBAScheduleGame, WNBATeamResponse 
} from '../types/sportradar.types';

export async function getSchedule(league: League, year: number, type: SeasonType): Promise<WNBAScheduleResponse> {
  return httpFetch<WNBAScheduleResponse>(league, `/games/${year}/${type}/schedule.json`);
}

export async function getPbp(league: League, gameId: string): Promise<WNBAPbpResponse> {
  return httpFetch<WNBAPbpResponse>(league, `/games/${gameId}/pbp.json`);
}

export async function getScheduleByDate(league: League, date: string, type: SeasonType = 'REG'): Promise<WNBAScheduleGame[]> {
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
  } catch (err: any) {
    if (err.message.includes('HTTP 404')) {
      return [];
    }
    throw err;
  }
}

export async function getTeams(league: League): Promise<WNBATeamResponse> {
  return httpFetch<WNBATeamResponse>(league, '/league/teams.json');
}
