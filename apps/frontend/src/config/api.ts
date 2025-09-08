const API_CONFIG = {
  baseURL: import.meta.env.DEV
    ? import.meta.env.VITE_API_BASE_URL_DEV || 'http://localhost:3000/api/sports'
    : import.meta.env.VITE_API_BASE_URL_PROD || 'https://basketballstats-1.onrender.com/api/sports',
  endpoints: {
    nba: {
      teams: (teamId?: string) => (teamId ? `/nba/teams/${teamId}` : '/nba/teams'),
      games: {
        today: '/nba/schedule/today',
      },
      standings: (year: number = new Date().getFullYear(), type: 'REG' | 'PRE' | 'POST' = 'REG') =>
        `/nba/standings/${year}/${type}`,
      news: '/nba/news',
    },
    wnba: {
      teams: (teamId?: string) => (teamId ? `/wnba/teams/${teamId}` : '/wnba/teams'),
      games: {
        today: '/wnba/schedule/today',
      },
      standings: (year: number = new Date().getFullYear(), type: 'REG' | 'PRE' | 'POST' = 'REG') =>
        `/wnba/standings/${year}/${type}`,
      news: '/wnba/news',
    },
  },
} as const;

export default API_CONFIG;
