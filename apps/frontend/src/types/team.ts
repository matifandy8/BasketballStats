export interface Team {
  id: string;
  name: string;
  market: string;
  alias: string;
  founded: number;
  sr_id: string;
  owner: string;
  general_manager: string;
  president: string;
  mascot: string;
  nicknames: string;
  sponsor: string;
  championships_won: number;
  conference_titles: number;
  division_titles: number;
  retired_numbers: string;
  playoff_appearances: number;
  gleague_affiliate: string;
  reference: string;
  venue: Venue;
  league: SimpleEntity;
  conference: SimpleEntity;
  division: SimpleEntity;
  coaches: Coach[];
  team_colors: TeamColor[];
  players: Player[];
}

export interface Venue {
  id: string;
  name: string;
  capacity: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  sr_id: string;
  location: {
    lat: string;
    lng: string;
  };
}

export interface SimpleEntity {
  id: string;
  name: string;
  alias: string;
}

export interface Coach {
  id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  position: string;
  experience: string;
  reference: string;
}

export interface TeamColor {
  type: string;
  hex_color: string;
  rgb_color: {
    red: number;
    green: number;
    blue: number;
  };
}

export interface Player {
  id: string;
  status: string;
  full_name: string;
  first_name: string;
  last_name: string;
  abbr_name: string;
  height: number;
  weight: number;
  position: string;
  primary_position: string;
  jersey_number?: string;
  experience: string;
  college?: string;
  high_school?: string;
  birth_place: string;
  birthdate: string;
  updated: string;
  sr_id: string;
  rookie_year?: number;
  salary?: number;
  reference: string;
  draft: Draft;
  references: PlayerReference[];
  name_suffix?: string;
  image_url: string;
}

export interface Draft {
  team_id?: string;
  year: number;
  round?: string;
  pick?: string;
}

export interface PlayerReference {
  source_id: string;
  scope: string;
  id_type: string;
}
