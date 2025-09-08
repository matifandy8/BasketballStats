export interface Standing {
  league: League;
  season: Season;
  conferences: Conference[];
}

export interface League {
  id: string;
  name: string;
  alias: string;
}


export interface Season {
  id: string;
  year: number;
  type: string;
}

export interface Conference {
  id: string;
  name: string;
  alias: string;
  divisions: Division[];
  teams?: Team[];
}

export interface Division {
  id: string;
  name: string;
  alias: string;
  teams: Team[];
}

export interface Team {
  id: string;
  name: string;
  market: string;
  wins: number;
  losses: number;
  win_pct: number;
  points_for?: number;
  points_against?: number;
  point_diff?: number;
  sr_id?: string;
  reference: string;
  games_behind?: GamesBehind;
  streak?: Streak;
  calc_rank?: CalcRank;
  records?: Record[];
}

export interface GamesBehind {
  league: number;
  conference: number;
  division: number;
}

export interface Streak {
  kind: string;
  length: number;
}

export interface CalcRank {
  div_rank: number;
  conf_rank: number;
  div_tiebreak?: string;
  conf_tiebreak?: string;
}

export interface Record {
  record_type: string;
  wins: number;
  losses: number;
  win_pct: number;
}

export interface StandingResponse {
  league: {
    id: string;
    name: string;
    alias: string;
  };
  season: {
    id: string;
    year: number;
    type: string;
  };
  conferences: Array<{
    id: string;
    name: string;
    alias: string;
    divisions: Array<{
      id: string;
      name: string;
      alias: string;
      teams: Team[];
    }>;
  }>;
}
