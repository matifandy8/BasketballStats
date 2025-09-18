import { useQuery } from '@tanstack/react-query';

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

const fetchTeamById = async (league: 'nba' | 'wnba', teamName: string) => {
  const endpoint = `/data/${league}/${teamName}.json`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error(`Something went wrong while loading team data. Please try again later.`);
  }
  const teamData = await res.json();
  return { team: teamData };
};

export const useTeam = (league: 'nba' | 'wnba', teamName: string) => {
  return useQuery({
    queryKey: ['team', league, teamName],
    queryFn: () => fetchTeamById(league, teamName),
    enabled: !!teamName,
  });
};
