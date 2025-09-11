export interface Team {
  name: string;
  alias: string;
  id: string;
  sr_id: string;
}

export interface Game {
  id: string;
  status: 'scheduled' | 'inprogress' | 'closed' | 'complete';
  scheduled: string;
  home_points?: number;
  away_points?: number;
  home: Team;
  away: Team;
  venue: {
    name: string;
    city: string;
    state: string;
  };
  broadcasts?: Array<{
    network: string;
    type: string;
    locale: string;
    channel?: string;
  }>;
}
