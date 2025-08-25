export type SeasonType = 'PRE' | 'REG' | 'CC' | 'PST';

export interface WNBAScheduleGame {
  id: string;
  status: string;         // e.g. 'scheduled' | 'inprogress' | 'closed'
  scheduled: string;      // ISO date
  home_points?: number;
  away_points?: number;
  home: { id: string; name: string; alias: string; };
  away: { id: string; name: string; alias: string; };
}

export interface WNBAScheduleResponse {
  league: { id: string; name: string; alias: string; };
  season: { year: number; type: SeasonType; id: string; };
  games: WNBAScheduleGame[];
}

export interface WNBAPbpEvent {
  id: string;
  event_type: string;     // e.g. 'twopointmade', 'foul', 'rebound'
  clock?: string;
  description?: string;
  // ... agrega más campos a medida que uses
}
export interface WNBAPbpResponse {
  game: { id: string; status: string; quarter?: number; };
  periods?: Array<{ number: number; events: WNBAPbpEvent[] }>;
}


export interface WNBATeam {
  id: string;
  name: string;
  alias: string;
  market: string;
}

export interface WNBATeamResponse {
  league: {
    id: string;
    name: string;
    alias: string;
  };
  teams: WNBATeam[];
  _comment?: string;
}
