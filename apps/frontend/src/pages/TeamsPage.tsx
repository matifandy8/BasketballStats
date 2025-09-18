import { PageLoading } from '../components/LoadingSpinner';
import { useTeams } from '../services/teamsService';
import { Link } from 'react-router-dom';

interface TeamsPageProps {
  leagueName: string;
}

interface Team {
  id: string;
  name: string;
  alias: string;
  market: string;
  logo: string;
}

const TeamsPage: React.FC<TeamsPageProps> = ({ leagueName }) => {
  const { data: teams = [], isLoading, isError } = useTeams(leagueName as 'nba' | 'wnba');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-t from-black to-transparent p-6 text-white container mx-auto my-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center font-druk">
          {leagueName.toUpperCase()} Teams
        </h1>
        <PageLoading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-t from-black to-transparent p-6 text-white container mx-auto my-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center font-druk">
          {leagueName.toUpperCase()} Teams
        </h1>
        <p className="text-center text-red-500">Failed to load teams. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-t from-black to-transparent p-6 text-white container mx-auto my-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center font-druk">
        {leagueName.toUpperCase()} Teams
      </h1>
      {teams.length === 0 && (
        <p className="text-center text-gray-400 font-druk">No teams available.</p>
      )}
      {teams.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {teams.map((team: Team, index: number) => {
            const isLcpCandidate = index === 0;
            return (
              <Link
                key={team.id}
                to={`/${leagueName}/teams/${team.name.toLowerCase()}`}
                className="flex flex-col items-center bg-black rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transform transition duration-300 p-4"
              >
                <img
                  src={team.logo}
                  alt={team.name}
                  className="w-16 h-16 mb-4 object-contain"
                  loading={isLcpCandidate ? 'eager' : 'lazy'}
                  fetchPriority={isLcpCandidate ? 'high' : 'auto'}
                  width="64"
                  height="64"
                />
                <h2 className="text-lg font-bold text-center font-druk">{team.market}</h2>
                <p className="text-sm text-gray-400 font-druk">{team.name}</p>
                <span className="mt-2 text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded-full font-druk">
                  {team.alias}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TeamsPage;
