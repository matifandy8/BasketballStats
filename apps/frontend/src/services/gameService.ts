const API_BASE_URL = 'http://localhost:3000/api/sports';

export const fetchTodaysGames = async () => {
    try {
        const [nbaResponse, wnbaResponse] = await Promise.all([
            fetch(`${API_BASE_URL}/nba/schedule/today`),
            fetch(`${API_BASE_URL}/wnba/schedule/today`)
        ]);

        if (!nbaResponse.ok || !wnbaResponse.ok) {
            throw new Error('Failed to fetch games');
        }

        const nbaData = await nbaResponse.json();
        const wnbaData = await wnbaResponse.json();

        return {
            nbaGames: Array.isArray(nbaData) ? nbaData : [],
            wnbaGames: Array.isArray(wnbaData) ? wnbaData : []
        };
    } catch (error) {
        console.error('Error fetching games:', error);
        return { nbaGames: [], wnbaGames: [] };
    }
};

export const fetchTeams = async ({ league }: { league: string }) => {
    try {
      const res = await fetch(`/data/${league}Teams.json`);
      const data = await res.json();
      return { teams: data.teams };
    } catch (error) {
      console.error("Error fetching teams:", error);
      return { teams: [] };
    }
  };

