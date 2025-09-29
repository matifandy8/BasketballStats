import { useQuery } from '@tanstack/react-query';
import type { PlayByPlay } from '../types/playbyplay';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const usePlayByPlay = (gameId: string | undefined, league: 'nba' | 'wnba') => {
  return useQuery<PlayByPlay, Error>({
    queryKey: ['playByPlay', gameId],
    queryFn: async () => {
      if (!gameId) throw new Error('Game ID is required');
      const response = await fetch(`${API_BASE_URL}/${league}/game/${gameId}/pbp`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    enabled: !!gameId,
    refetchInterval: 120000,
  });
};
