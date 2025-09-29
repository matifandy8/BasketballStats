import { useParams } from 'react-router-dom';
import { PageLoading } from '../components/LoadingSpinner';
import { usePlayByPlay } from '../services/playByPlayService';
import React from 'react';

interface GamePlayByPlayProps {
  leagueName: string;
}

interface EventDescription {
  id: string;
  event_type: string;
  clock?: string;
  description?: string;
  points?: number;
  sequence?: number;
  period_type?: string;
  period_number?: number;
  home_points?: number;
  away_points?: number;
  player?: {
    full_name: string;
  };
  incoming_player?: {
    full_name: string;
  };
  outgoing_player?: {
    full_name: string;
  };
  team?: {
    market: string;
    name: string;
  };
}

const GamePlayByPlay: React.FC<GamePlayByPlayProps> = ({ leagueName }) => {
  const { gameId } = useParams<{ gameId: string; league: string }>();
  console.log(gameId, leagueName);
  const {
    data: playByPlay,
    isLoading,
    isError,
  } = usePlayByPlay(gameId, leagueName as 'nba' | 'wnba');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-t from-black to-transparent p-6 text-white container mx-auto my-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center font-druk">Loading Game Data...</h1>
        <PageLoading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-t from-black to-transparent p-6 text-white container mx-auto my-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center font-druk">Game Play by Play</h1>
        <p className="text-center text-red-500">
          Failed to load game data. Please try again later.
        </p>
      </div>
    );
  }

  if (!playByPlay) {
    return (
      <div className="min-h-screen bg-gradient-to-t from-black to-transparent p-6 text-white container mx-auto my-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center font-druk">Game Not Found</h1>
        <p className="text-center">The requested game could not be found.</p>
      </div>
    );
  }

  const { home, away, periods, clock, quarter } = playByPlay;

  const allEvents = periods.flatMap(period =>
    period.events.map(event => ({
      ...event,
      periodNumber: period.number,
      periodType: period.type,
    }))
  );

  const sortedEvents = [...allEvents].sort((a, b) => {
    if (a.periodNumber !== b.periodNumber) {
      return b.periodNumber - a.periodNumber;
    }
    return b.sequence - a.sequence;
  });

  const formatClockTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getEventDescription = (event: EventDescription) => {
    if (event.event_type === 'field_goal_made') {
      return `${event.player?.full_name} made ${event.points}pt shot`;
    } else if (event.event_type === 'free_throw_made') {
      return `${event.player?.full_name} made free throw`;
    } else if (event.event_type === 'rebound') {
      return `${event.player?.full_name} rebound`;
    } else if (event.event_type === 'turnover') {
      return `Turnover: ${event.player?.full_name}`;
    } else if (event.event_type === 'foul') {
      return `Foul on ${event.player?.full_name}`;
    } else if (event.event_type === 'timeout') {
      return `Timeout: ${event.team?.market} ${event.team?.name}`;
    } else if (event.event_type === 'substitution') {
      return `Substitution: ${event.incoming_player?.full_name} in, ${event.outgoing_player?.full_name} out`;
    } else if (event.event_type === 'period_start') {
      return `Start of ${event.period_type} ${event.period_number}`;
    } else if (event.event_type === 'period_end') {
      return `End of ${event.period_type} ${event.period_number}`;
    }
    return event.description || 'Play';
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-black to-transparent p-6 text-white container mx-auto my-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold mb-2 font-druk">
          {away.market} {away.name} @ {home.market} {home.name}
        </h1>
        <div className="text-xl">
          <span className="font-bold">Q{quarter}</span> • {clock}
        </div>
      </div>

      <div className="max-w-3xl mx-auto bg-gray-900 bg-opacity-50 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
          <div className="text-center">
            <div className="text-3xl font-bold">{away.points}</div>
            <div className="text-sm text-gray-300">
              {away.market} {away.name}
            </div>
          </div>
          <div className="text-xl">VS</div>
          <div className="text-center">
            <div className="text-3xl font-bold">{home.points}</div>
            <div className="text-sm text-gray-300">
              {home.market} {home.name}
            </div>
          </div>
        </div>

        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {sortedEvents.map((event, index) => (
            <div
              key={`${event.id}-${index}`}
              className="flex items-start p-3 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <div className="w-20 text-gray-400 text-sm">
                {event.periodType} {event.periodNumber}
              </div>
              <div className="flex-1">
                <div className="font-medium">{getEventDescription(event)}</div>
                {event.clock && (
                  <div className="text-xs text-gray-400 mt-1">
                    {formatClockTime(parseInt(event.clock, 10))}
                  </div>
                )}
              </div>
              <div className="ml-4 text-right">
                {event.home_points !== undefined && event.away_points !== undefined && (
                  <div className="text-sm">
                    <span className={event.away_points === home.points ? 'font-bold' : ''}>
                      {event.away_points}
                    </span>{' '}
                    -{' '}
                    <span className={event.home_points === away.points ? 'font-bold' : ''}>
                      {event.home_points}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamePlayByPlay;
