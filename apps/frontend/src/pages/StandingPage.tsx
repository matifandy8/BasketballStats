import { useState } from 'react';
import { useStandings } from '../services/standingsService';
import { useParams } from 'react-router-dom';
import type { Conference } from '../types/Standing';
import { LeagueSelector } from '../components/standings/LeagueSelector';
import { NoDataState } from '../components/standings/NoDataState';
import { StandingsTable } from '../components/standings/StandingsTable';
import { PageError } from '../components/ErrorComponent';
import { PageLoading } from '../components/LoadingSpinner';

type StandingPageProps = {
  defaultLeague?: 'nba' | 'wnba';
};

const StandingPage = ({ defaultLeague }: StandingPageProps) => {
  const { league: leagueFromUrl } = useParams<{ league?: 'nba' | 'wnba' }>();
  const [selectedLeague, setSelectedLeague] = useState<'nba' | 'wnba' | null>(
    leagueFromUrl || defaultLeague || null
  );

  const { data, isLoading, isError, error } = useStandings(selectedLeague!);

  const handleSelectLeague = (league: 'nba' | 'wnba') => {
    setSelectedLeague(league);
    window.history.pushState({}, '', `/${league}/standings`);
  };

  if (!selectedLeague) {
    return <LeagueSelector onSelectLeague={handleSelectLeague} />;
  }

  if (isLoading) {
    return <PageLoading />;
  }

  if (isError) {
    return <PageError error={error} />;
  }

  if (!data || !Array.isArray(data.conferences) || data.conferences.length === 0) {
    return <NoDataState league={selectedLeague} seasonYear={data?.season?.year} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold dark:text-white">
            {selectedLeague?.toUpperCase()} {data.season?.year} {data.season?.type} Standings
          </h1>
          <button
            onClick={() => setSelectedLeague(null)}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Change League
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {data.conferences.map((conference: Conference) => (
            <div
              key={conference.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div
                className={`${selectedLeague === 'nba' ? 'bg-blue-700' : 'bg-[#ff4613]'} text-white p-4`}
              >
                <h2 className="text-xl font-semibold">{conference.name}</h2>
              </div>
              <StandingsTable conference={conference} league={selectedLeague} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StandingPage;
