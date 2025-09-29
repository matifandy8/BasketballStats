export interface PlayByPlay {
  id: string;
  status: string;
  coverage: string;
  scheduled: string;
  duration: string;
  attendance: number;
  lead_changes: number;
  times_tied: number;
  clock: string;
  quarter: number;
  track_on_court: boolean;
  reference: string;
  entry_mode: string;
  sr_id: string;
  clock_decimal: string;
  broadcasts: Broadcast[];
  time_zones: TimeZones;
  season: Season;
  home: Home;
  away: Away;
  periods: Period[];
  deleted_events: DeletedEvent[];
}

export interface Broadcast {
  type: string;
  locale: string;
  network: string;
  channel?: string;
}

export interface TimeZones {
  venue: string;
  home: string;
  away: string;
}

export interface Season {
  id: string;
  year: number;
  type: string;
  name: string;
}

export interface Home {
  name: string;
  alias: string;
  market: string;
  id: string;
  points: number;
  bonus: boolean;
  sr_id: string;
  remaining_timeouts: number;
  reference: string;
}

export interface Away {
  name: string;
  alias: string;
  market: string;
  id: string;
  points: number;
  bonus: boolean;
  sr_id: string;
  remaining_timeouts: number;
  reference: string;
}

export interface Period {
  type: string;
  id: string;
  number: number;
  sequence: number;
  scoring: Scoring;
  events: Event[];
}

export interface Scoring {
  times_tied: number;
  lead_changes: number;
  home: Home2;
  away: Away2;
}

export interface Home2 {
  name: string;
  market: string;
  id: string;
  points: number;
}

export interface Away2 {
  name: string;
  market: string;
  id: string;
  points: number;
}

export interface Event {
  id: string;
  clock: string;
  updated: string;
  description: string;
  wall_clock: string;
  sequence: number;
  home_points: number;
  away_points: number;
  clock_decimal: string;
  created: string;
  number: number;
  event_type: string;
  attribution?: Attribution;
  on_court?: OnCourt;
  possession?: Possession;
  location?: Location;
  statistics?: Statistic[];
  qualifiers?: Qualifier[];
  turnover_type?: string;
  attempt?: string;
  duration?: number;
}

export interface Attribution {
  name: string;
  market: string;
  id: string;
  team_basket?: string;
  sr_id: string;
}

export interface OnCourt {
  home: Home3;
  away: Away3;
}

export interface Home3 {
  name: string;
  market: string;
  id: string;
  sr_id: string;
  reference: string;
  players: Player[];
}

export interface Player {
  full_name: string;
  jersey_number: string;
  id: string;
  sr_id: string;
  reference: string;
}

export interface Away3 {
  name: string;
  market: string;
  id: string;
  sr_id: string;
  reference: string;
  players: Player2[];
}

export interface Player2 {
  full_name: string;
  jersey_number: string;
  id: string;
  sr_id: string;
  reference: string;
}

export interface Possession {
  name: string;
  market: string;
  id: string;
  sr_id: string;
  reference: string;
}

export interface Location {
  coord_x: number;
  coord_y: number;
}

export interface Statistic {
  type: string;
  made?: boolean;
  shot_type?: string;
  points?: number;
  shot_distance?: number;
  team: Team;
  player?: Player3;
  rebound_type?: string;
  shot_type_desc?: string;
  three_point_shot?: boolean;
  free_throw_type?: string;
}

export interface Team {
  name: string;
  market: string;
  id: string;
  sr_id: string;
  reference: string;
}

export interface Player3 {
  full_name: string;
  jersey_number: string;
  id: string;
  sr_id: string;
  reference: string;
}

export interface Qualifier {
  qualifier: string;
}

export interface DeletedEvent {
  id: string;
}
