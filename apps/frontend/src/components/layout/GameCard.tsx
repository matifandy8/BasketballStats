import { Link } from 'react-router-dom';
import { usePlayByPlay } from '../../services/playByPlayService';
import type { Game } from '../../types/games';
import { formatGameTime } from '../../utils/formatGameTime';

function GameCard({ game, league }: { game: Game; league: 'nba' | 'wnba' }) {
  const { data: playByPlay } = usePlayByPlay(game.id, league);

  const isLive = game.status === 'inprogress';
  const homePoints = isLive ? (playByPlay?.home?.points ?? '-') : (game.home_points ?? '-');
  const awayPoints = isLive ? (playByPlay?.away?.points ?? '-') : (game.away_points ?? '-');

  const status = (() => {
    if (game.status === 'closed' || game.status === 'complete') return 'FINAL';
    if (game.status === 'scheduled') return formatGameTime(game.scheduled);
    if (isLive) {
      const q = playByPlay?.quarter;
      const clock = playByPlay?.clock;
      return q ? `Q${q} ${clock || ''}` : 'LIVE';
    }
  })();

  return (
    <Link to={`/${league}/games/${game.id}`}>
      <div className="flex-shrink-0 bg-stone-800 p-3 rounded-lg w-[180px] hover:bg-stone-700 transition-colors">
        <div className="text-xs bg-stone-700 px-2 py-1 rounded-full text-center mb-2 truncate">
          {status}
        </div>
        <div className="text-xs text-stone-200 text-center mb-1 truncate">{game.venue.city}</div>
        <div className="flex justify-between items-center">
          <div className="text-center flex-1 min-w-0">
            <div className="font-druk font-medium truncate">{game.away.alias}</div>
            <div className="text-lg font-bold">{awayPoints}</div>
          </div>
          <div className="text-stone-400 mx-1">@</div>
          <div className="text-center flex-1 min-w-0">
            <div className="font-druk font-medium truncate">{game.home.alias}</div>
            <div className="text-lg font-bold">{homePoints}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default GameCard;
