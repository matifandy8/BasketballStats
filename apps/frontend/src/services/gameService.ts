import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import API_CONFIG from '../config/api';

const fetchGamesByLeague = async (league: 'nba' | 'wnba') => {
  const endpoint = `${API_CONFIG.baseURL}${API_CONFIG.endpoints[league].games.today}`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Something went wrong while loading team data. Please try again later.`);
  }

  return response.json();
};

export const useTodaysGames = () => {
  const [activeLeague, setActiveLeague] = useState<'nba' | 'wnba'>('nba');
  const queryClient = useQueryClient();

  const {
    data: nbaGames = [],
    isLoading: isLoadingNba,
    error: errorNba,
  } = useQuery({
    queryKey: ['games', 'nba'],
    queryFn: () => fetchGamesByLeague('nba'),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const {
    data: wnbaGames = [],
    isLoading: isLoadingWnba,
    error: errorWnba,
    isFetching: isFetchingWnba,
  } = useQuery({
    queryKey: ['games', 'wnba'],
    queryFn: () => fetchGamesByLeague('wnba'),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: activeLeague === 'wnba' || !!queryClient.getQueryData(['games', 'wnba']),
  });

  const prefetchWnbaGames = () => {
    if (!queryClient.getQueryData(['games', 'wnba'])) {
      queryClient.prefetchQuery({
        queryKey: ['games', 'wnba'],
        queryFn: () => fetchGamesByLeague('wnba'),
        staleTime: 5 * 60 * 1000,
      });
    }
  };

  const isLoading = activeLeague === 'nba' ? isLoadingNba : isLoadingWnba || isFetchingWnba;
  const error = errorNba || errorWnba;

  return {
    nbaGames,
    wnbaGames,
    isLoading,
    error,
    activeLeague,
    setActiveLeague,
    prefetchWnbaGames,
  };
};
