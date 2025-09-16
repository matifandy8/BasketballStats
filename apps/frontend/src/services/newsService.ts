import { useQuery } from '@tanstack/react-query';
import API_CONFIG from '../config/api';
import type { NewsResponse } from '../types/news';

const fetchNews = async (league: 'nba' | 'wnba'): Promise<NewsResponse> => {
  try {
    const endpoint = API_CONFIG.endpoints[league].news;
    const url = `${API_CONFIG.baseURL}${endpoint}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`Error fetching ${league} news:`, response.status, errorData);
      throw new Error(`Something went wrong while loading team data. Please try again later.`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Error in fetchNews for ${league}:`, error);
    throw error;
  }
};

export const useNews = (league: 'nba' | 'wnba' | null) => {
  return useQuery<NewsResponse, Error>({
    queryKey: ['news', league],
    queryFn: () => {
      if (!league) {
        throw new Error('No league selected');
      }
      return fetchNews(league);
    },
    enabled: !!league,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
