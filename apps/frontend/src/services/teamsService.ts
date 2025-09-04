import { useQuery } from '@tanstack/react-query';
import API_CONFIG from '../config/api';

const fetchTeamsByLeague = async (league: string) => {
  const res = await fetch(`/data/${league}Teams.json`);
  if (!res.ok) {
    throw new Error(`Failed to fetch teams for ${league}`);
  }
  const data = await res.json();
  return data.teams;
};

export const useTeams = (league: string) => {
  return useQuery({
    queryKey: ['teams', league],
    queryFn: () => fetchTeamsByLeague(league),
  });
};

const fetchTeamById = async (league: string, teamId: string) => {
  const endpoint = `${API_CONFIG.baseURL}${API_CONFIG.endpoints[league as 'nba' | 'wnba'].teams(teamId)}`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error(`Failed to fetch team ${teamId}`);
  }
  const teamData = await res.json();
  return { team: teamData };
};

export const useTeam = (league: string, teamId: string) => {
  return useQuery({
    queryKey: ['team', league, teamId],
    queryFn: () => fetchTeamById(league, teamId),
    enabled: !!teamId,
  });
};