import React, { useState, useRef, useEffect } from 'react';
import { fetchTodaysGames } from '../services/gameService';

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
    timeZoneName: 'short'
  });
};

const getGameStatus = (game: Game) => {
  if (game.status === 'closed' || game.status === 'complete') return 'FINAL';
  if (game.status === 'scheduled') return formatGameTime(game.scheduled);
  return 'LIVE';
};

const ScoreTicker: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'nba' | 'wnba'>('wnba');
  const [nbaGames, setNbaGames] = useState<Game[]>([]);
  const [wnbaGames, setWnbaGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const initialFetch = async () => {
      setLoading(true);
      const { nbaGames, wnbaGames } = await fetchTodaysGames();
      setNbaGames(nbaGames);
      setWnbaGames(wnbaGames);
      setLoading(false);
    };

    const updateGames = async () => {
      const { nbaGames, wnbaGames } = await fetchTodaysGames();
      setNbaGames(nbaGames);
      setWnbaGames(wnbaGames);
    };

    initialFetch();
    const intervalId = setInterval(updateGames, 60000);
    return () => clearInterval(intervalId);
  }, []);

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

  if (loading) {
    return (
      <div className="bg-black text-white py-2 text-center py-4">
        Loading {activeTab.toUpperCase()} games...
      </div>
    );
  }



  return (
    <div className="bg-black text-white py-4">
      <div className="container mx-auto">
        <div className="flex border-b border-stone-700">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'nba' 
                ? `text-${tabColor} border-b-2 border-${tabColor}` 
                : 'text-stone-400 hover:text-white'
            } transition-colors`}
            onClick={() => setActiveTab('nba')}
          >
            NBA
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'wnba' 
                ? `text-${tabColor} border-b-2 border-${tabColor}` 
                : 'text-stone-400 hover:text-white'
            } transition-colors`}
            onClick={() => setActiveTab('wnba')}
          >
            WNBA
          </button>
        </div>
        
        <div 
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-hide py-2 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className="flex space-x-2 px-2">
            {currentGames.length > 0 ? (
                currentGames.map((game) => (
              <div 
                key={game.id} 
                className="flex-shrink-0 bg-stone-800 p-3 rounded-lg min-w-[180px] hover:bg-stone-700 transition-colors"
              >
                <div className="text-xs bg-stone-700 px-2 py-1 rounded-full text-center mb-2">
                  {getGameStatus(game)}
                </div>
                <div className="text-xs text-stone-400 text-center mb-1">
                  {game.venue.city}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-center flex-1">
                    <div className="font-druk font-medium">{game.away.alias}</div>
                    <div className="text-lg font-bold">{game.away_points ?? '-'}</div>
                  </div>
                  <div className="text-stone-400 mx-1">@</div>
                  <div className="text-center flex-1">
                    <div className="font-druk font-medium">{game.home.alias}</div>
                    <div className="text-lg font-bold">{game.home_points ?? '-'}</div>
                  </div>
                </div>
                {game.broadcasts && game.broadcasts.length > 0 && (
                  <div className="text-xs text-stone-500 text-center mt-1 truncate" title={game.broadcasts.map(b => b.network).join(', ')}>
                    {game.broadcasts[0].network}
                    {game.broadcasts.length > 1 ? ' +' + (game.broadcasts.length - 1) : ''}
                  </div>
                )}
              </div>
            )))  : (
                <div className="text-stone-400 py-4 px-6 w-full text-center">
                  No games today for {activeTab.toUpperCase()}
                </div>
              )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreTicker;
