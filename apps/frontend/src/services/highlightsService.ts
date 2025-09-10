import { useQuery } from '@tanstack/react-query';
import API_CONFIG from '../config/api';
import type { HighlightItem } from '../types/highlights';

const fetchHighlights = async (league: 'nba' | 'wnba'): Promise<HighlightItem[]> => {
  const endpoint = API_CONFIG.endpoints[league].highlights;
  const url = `${API_CONFIG.baseURL}${endpoint}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error(`Error fetching ${league} highlights:`, response.status, errorData);
    throw new Error(
      `Failed to fetch ${league} highlights: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  if (process.env.NODE_ENV === 'development') {
    console.log(`${league} highlights response:`, data);
  }

  return data;
};

export const useHighlights = (league: 'nba' | 'wnba' | null) => {
  return useQuery<HighlightItem[], Error>({
    queryKey: ['highlights', league],
    queryFn: () => fetchHighlights(league as 'nba' | 'wnba'),
    enabled: !!league,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useAllHighlights = () => {
  return useQuery<{ nba: HighlightItem[]; wnba: HighlightItem[] }, Error>({
    queryKey: ['all-highlights'],
    queryFn: async () => {
      const [nba, wnba] = await Promise.all([fetchHighlights('nba'), fetchHighlights('wnba')]);
      return { nba, wnba };
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
