import { useQuery } from '@tanstack/react-query';
import API_CONFIG from '../config/api';
import type { StandingResponse } from '../types/Standing';

const fetchStandings = async (league: 'nba' | 'wnba'): Promise<StandingResponse> => {
  try {
    const endpoint = API_CONFIG.endpoints[league].standings();
    const url = `${API_CONFIG.baseURL}${endpoint}`;
    console.log(`Fetching ${league} standings from:`, url);

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`Error fetching ${league} standings:`, response.status, errorData);
      throw new Error(
        `Failed to fetch ${league} standings: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    console.log(`${league} standings response:`, data);

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
