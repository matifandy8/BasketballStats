import React, { useState, useRef } from 'react';
import { useTodaysGames } from '../../services/gameService';

interface Team {
  name: string;
  alias: string;
  id: string;
  sr_id: string;
}

interface Game {
  id: string;
  status: 'scheduled' | 'inprogress' | 'closed' | 'complete';
  scheduled: string;
  home_points?: number;
  away_points?: number;
  home: Team;
  away: Team;
  venue: {
    name: string;
    city: string;
    state: string;
  };
  broadcasts?: Array<{
    network: string;
    type: string;
    locale: string;
    channel?: string;
  }>;
}

const formatGameTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  });
};

const getGameStatus = (game: Game) => {
  if (game.status === 'closed' || game.status === 'complete') return 'FINAL';
  if (game.status === 'scheduled') return formatGameTime(game.scheduled);
  return 'LIVE';
};

const ScoreTicker: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'nba' | 'wnba'>('wnba');
  const { nbaGames, wnbaGames, isLoading, error } = useTodaysGames();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTabChange = (tab: 'nba' | 'wnba') => {
    if (tab === activeTab) return;
    setIsTransitioning(true);
    setActiveTab(tab);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const currentGames = activeTab === 'nba' ? nbaGames : wnbaGames;
  const tabColor = activeTab === 'nba' ? 'blue-400' : 'pink-400';

  const renderSkeleton = () => (
    <div className="flex space-x-2 px-2">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex-shrink-0 bg-stone-800 p-3 rounded-lg w-[180px] h-[120px] animate-pulse"
        />
      ))}
    </div>
  );

  if (error) {
    return (
      <div className="bg-black text-white py-4 text-center min-h-[120px] flex items-center justify-center">
        <div>
          Error loading {activeTab.toUpperCase()} games: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white py-4 min-h-[180px]">
      <div className="container mx-auto">
        <div className="flex border-b border-stone-700 mb-2">
          <button
            className={`px-4 py-2 font-medium transition-all ${
              activeTab === 'nba'
                ? `text-${tabColor} border-b-2 border-${tabColor} font-bold`
                : 'text-stone-400 hover:text-white'
            }`}
            onClick={() => handleTabChange('nba')}
            aria-label="Show NBA games"
          >
            NBA
          </button>
          <button
            className={`px-4 py-2 font-medium transition-all ${
              activeTab === 'wnba'
                ? `text-${tabColor} border-b-2 border-${tabColor} font-bold`
                : 'text-stone-400 hover:text-white'
            }`}
            onClick={() => handleTabChange('wnba')}
            aria-label="Show WNBA games"
          >
            WNBA
          </button>
        </div>

        <div
          ref={sliderRef}
          className="relative overflow-x-auto scrollbar-hide py-2 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          aria-label={`${activeTab} games ticker`}
        >
          {isLoading || isTransitioning ? (
            renderSkeleton()
          ) : currentGames.length > 0 ? (
            <div className="flex space-x-2 px-2">
              {currentGames.map((game: Game) => (
                <div
                  key={game.id}
                  className="flex-shrink-0 bg-stone-800 p-3 rounded-lg w-[180px] hover:bg-stone-700 transition-colors"
                >
                  <div className="text-xs bg-stone-700 px-2 py-1 rounded-full text-center mb-2 truncate">
                    {getGameStatus(game)}
                  </div>
                  <div className="text-xs text-stone-200 text-center mb-1 truncate">
                    {game.venue.city}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-center flex-1 min-w-0">
                      <div className="font-druk font-medium truncate">{game.away.alias}</div>
                      <div className="text-lg font-bold">{game.away_points ?? '-'}</div>
                    </div>
                    <div className="text-stone-400 mx-1">@</div>
                    <div className="text-center flex-1 min-w-0">
                      <div className="font-druk font-medium truncate">{game.home.alias}</div>
                      <div className="text-lg font-bold">{game.home_points ?? '-'}</div>
                    </div>
                  </div>
                  {game.broadcasts && game.broadcasts.length > 0 && (
                    <div
                      className="text-xs text-stone-300 text-center mt-1 truncate"
                      title={game.broadcasts.map(b => b.network).join(', ')}
                    >
                      {game.broadcasts[0].network}
                      {game.broadcasts.length > 1 ? ' +' + (game.broadcasts.length - 1) : ''}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-stone-400 py-4 px-6 w-full text-center">
              No games today for {activeTab.toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreTicker;
