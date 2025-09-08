import React from 'react';

type LeagueSelectorProps = {
  onSelectLeague: (league: 'nba' | 'wnba') => void;
};

export const LeagueSelector: React.FC<LeagueSelectorProps> = ({ onSelectLeague }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
    <h2 className="text-2xl font-bold mb-8 dark:text-white">Choose a League</h2>
    <div className="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-md">
      <button
        onClick={() => onSelectLeague('nba')}
        className="flex flex-col items-center justify-center p-6 bg-[#0054a4] hover:bg-[#0078a5] rounded-lg transition-colors group"
      >
        <div className="w-24 h-24 mb-3 flex items-center justify-center">
          <img src="/images/nba-logo.png" alt="NBA" className="h-full w-auto object-contain" />
        </div>
        <span className="text-white font-medium">NBA Standings</span>
      </button>

      <button
        onClick={() => onSelectLeague('wnba')}
        className="flex flex-col items-center justify-center p-6 bg-[#ff4613] hover:bg-[#ff7713] rounded-lg transition-colors group"
      >
        <div className="w-24 h-24 mb-3 flex items-center justify-center">
          <img
            src="/images/wnba-logo.jpg"
            alt="WNBA"
            className="h-full w-auto object-contain rounded-full"
          />
        </div>
        <span className="text-white font-medium">WNBA Standings</span>
      </button>
    </div>
  </div>
);
