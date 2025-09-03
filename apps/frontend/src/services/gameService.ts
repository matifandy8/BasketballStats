import { useQuery } from '@tanstack/react-query';

const API_BASE_URL = 'http://localhost:3000/api/sports';

const fetchGamesByLeague = async (league: 'nba' | 'wnba') => {
    const response = await fetch(`${API_BASE_URL}/${league}/schedule/today`);

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
        nbaGames: nbaGames || [],
        wnbaGames: wnbaGames || [],
        isLoading: isLoadingNba || isLoadingWnba,
        error: errorNba || errorWnba,
    };
};
