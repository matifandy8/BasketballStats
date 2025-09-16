import { useQuery } from '@tanstack/react-query';
import API_CONFIG from '../config/api';

const fetchTeamsByLeague = async (league: string) => {
  const res = await fetch(`/data/${league}Teams.json`);
  if (!res.ok) {
    throw new Error(`Something went wrong while loading team data. Please try again later.`);
  }
  const data = await res.json();
  return data.teams;
};

export const useTeams = (league: 'nba' | 'wnba') => {
  return useQuery({
    queryKey: ['teams', league],
    queryFn: () => fetchTeamsByLeague(league),
  });
};

const fetchTeamById = async (league: 'nba' | 'wnba', teamId: string) => {
  const endpoint = `${API_CONFIG.baseURL}${API_CONFIG.endpoints[league].teams(teamId)}`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error(`Something went wrong while loading team data. Please try again later.`);
  }
  const teamData = await res.json();
  return { team: teamData };
};

export const useTeam = (league: 'nba' | 'wnba', teamId: string) => {
  return useQuery({
    queryKey: ['team', league, teamId],
    queryFn: () => fetchTeamById(league, teamId),
    enabled: !!teamId,
  });
};
