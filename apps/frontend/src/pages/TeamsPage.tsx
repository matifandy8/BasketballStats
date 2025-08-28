import { useEffect, useState } from "react";
import { fetchTeams } from "../services/gameService";

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
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeams = async () => {
      setLoading(true);
      setError(null);
      try {
        const { teams } = await fetchTeams({ league: leagueName });
        setTeams(teams);
      } catch (err) {
        console.error("Error fetching teams:", err);
        setError("Failed to load teams. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, [leagueName]);

  return (
    <div className="min-h-screen bg-gradient-to-t from-black to-transparent p-6 text-white">
      <h1 className="text-4xl font-extrabold mb-8 text-center">
        {leagueName.toUpperCase()} Teams
      </h1>

      {loading && (
        <p className="text-center text-gray-400 animate-pulse">
          Loading teams...
        </p>
      )}

      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && teams.length === 0 && (
        <p className="text-center text-gray-400">No teams available.</p>
      )}

      {!loading && !error && teams.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {teams.map((team) => (
            <div
              key={team.id}
              className="flex flex-col items-center bg-black rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transform transition duration-300 p-4"
            >
              <img
                src={team.logo}
                alt={team.name}
                className="w-16 h-16 mb-4 object-contain"
              />
              <h2 className="text-lg font-bold text-center">{team.market}</h2>
              <p className="text-sm text-gray-400">{team.name}</p>
              <span className="mt-2 text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded-full">
                {team.alias}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamsPage;
