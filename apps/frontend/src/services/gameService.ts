import { useQuery } from '@tanstack/react-query';
import API_CONFIG from '../config/api';

const fetchGamesByLeague = async (league: 'nba' | 'wnba') => {
    const endpoint = `${API_CONFIG.baseURL}${API_CONFIG.endpoints[league].games.today}`;
    const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error(`Failed to fetch ${league} games`);
    }

    return response.json();
};

export const useTodaysGames = () => {
    const { data: nbaGames, isLoading: isLoadingNba, error: errorNba } = useQuery({
        queryKey: ['games', 'nba'],
        queryFn: () => fetchGamesByLeague('nba'),
        staleTime: 5 * 60 * 1000, 
        refetchOnWindowFocus: false
    });

    const { data: wnbaGames, isLoading: isLoadingWnba, error: errorWnba } = useQuery({
        queryKey: ['games', 'wnba'],
        queryFn: () => fetchGamesByLeague('wnba'),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false
    });

    return {
        nbaGames,
        wnbaGames,
        isLoading: isLoadingNba || isLoadingWnba,
        error: errorNba || errorWnba,
    };
};
