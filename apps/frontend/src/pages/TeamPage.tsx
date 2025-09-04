import { useParams } from "react-router-dom";
import { useTeam } from "../services/teamsService";
import type { Team, TeamColor } from "../types/Team";
import TeamSkeleton from "../components/TeamSkeleton";

export default function TeamPage({ league }: { league: string }) {
  const { teamId } = useParams<{ teamId: string }>();
  const { data, isLoading } = useTeam(league, teamId!);

  const team: Team | null = data?.team ?? null;
  const primaryColor = team?.team_colors.find((c: TeamColor) => c.type === 'primary')?.hex_color ?? null;

  if (isLoading) {
    return <TeamSkeleton />;
  }

  return (
    <div className="bg-gradient-to-t from-black to-transparent py-8 px-2 container mx-auto">
      {team ? (
        <div className="text-white">
          <h1 className="text-2xl font-bold mb-6 text-center py-8 font-druk">{team.market} {team.name}</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-16">
            {team.players.map(player => (
              <div key={player.id} style={{ background: `linear-gradient(to bottom, ${primaryColor}, #1a1a1a)` }} className="flex flex-col items-start rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transform transition duration-300 p-4">
                <img src={player.image_url} alt={player.full_name} className="w-36 h-36 mb-4 object-contain" />
                <h3 className="text-lg font-bold mb-2 text-left font-druk">{player.full_name}</h3>
                <div className="flex flex-col items-start justify-start">
                  <p className="text-lg font-proxima-nova mb-2 text-left">{player.position}</p>
                  <p className="text-lg font-proxima-nova mb-2 text-left">{player.height} ft</p>
                  <p className="text-lg font-proxima-nova mb-2 text-left">{player.weight} lbs</p>
                  <p className="text-lg font-proxima-nova mb-2 text-left">#{player.jersey_number}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-t from-black to-transparent py-8 px-2 container mx-auto">
            <h2 className="text-white text-center font-druk font-bold text-2xl py-8 h-screen">Team not found. Please try again later. </h2>
        </div>

      )}
    </div>
  );
}
