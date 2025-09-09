import { useQuery } from '@tanstack/react-query';
import API_CONFIG from '../config/api';
import type { HighlightItem } from '../types/highlights';

const fetchHighlights = async (league: 'nba' | 'wnba'): Promise<HighlightItem[]> => {
  try {
    const endpoint = API_CONFIG.endpoints[league].highlights;
    const url = `${API_CONFIG.baseURL}${endpoint}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`Error fetching ${league} highlights:`, response.status, errorData);
      throw new Error(`Failed to fetch ${league} highlights: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    console.log(`${league} highlights response:`, data);

    return data;
  } catch (error) {
    console.error(`Error in fetchHighlights for ${league}:`, error);
    throw error;
  }
};

export const useHighlights = (league: 'nba' | 'wnba' | null) => {
  return useQuery<HighlightItem[], Error>({
    queryKey: ['highlights', league],
    queryFn: () => {
      if (!league) {
        throw new Error('No league selected');
      }
      return fetchHighlights(league);
    },
    enabled: !!league,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
