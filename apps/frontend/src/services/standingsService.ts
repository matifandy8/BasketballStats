import { useQuery } from '@tanstack/react-query';
import API_CONFIG from '../config/api';
import type { StandingResponse } from '../types/standing';

const fetchStandings = async (league: 'nba' | 'wnba'): Promise<StandingResponse> => {
  try {
    const endpoint = API_CONFIG.endpoints[league].standings();
    const url = `${API_CONFIG.baseURL}${endpoint}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`Error fetching ${league} standings:`, response.status, errorData);
      throw new Error(`Something went wrong while loading team data. Please try again later.`);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.conferences)) {
      console.error(`Unexpected response format for ${league} standings:`, data);
      throw new Error(`Invalid data format received from ${league} standings API`);
    }

    return data;
  } catch (error) {
    console.error(`Error in fetchStandings for ${league}:`, error);
    throw error;
  }
};

export const useStandings = (league: 'nba' | 'wnba' | null) => {
  return useQuery<StandingResponse, Error>({
    queryKey: ['standings', league],
    queryFn: () => {
      if (!league) {
        throw new Error('No league selected');
      }
      return fetchStandings(league);
    },
    enabled: !!league,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
