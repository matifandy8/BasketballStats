type LeagueSelectorProps = {
  onSelectLeague: (league: 'nba' | 'wnba') => void;
};

export const LeagueSelector: React.FC<LeagueSelectorProps> = ({ onSelectLeague }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
    <h2 className="text-2xl font-bold mb-8 dark:text-white">Choose a League</h2>
    <div className="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-md">
      <button
        onClick={() => onSelectLeague('nba')}
        className="flex flex-col items-center justify-center p-6 hover:bg-[#0257a27d] rounded-lg transition-colors group cursor-pointer"
      >
        <div className="w-24 h-full mb-3 flex items-center justify-center">
          <img
            src="/images/nba-logo.png"
            alt="NBA"
            className="w-full h-full object-contain rounded-full"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </button>

      <button
        onClick={() => onSelectLeague('wnba')}
        className="flex flex-col items-center justify-center p-6 hover:bg-[#ff47134a] rounded-lg transition-colors group cursor-pointer"
      >
        <div className="w-24 h-full mb-3 flex items-center justify-center">
          <img
            src="/images/wnba-logo.png"
            alt="WNBA"
            className="h-full w-auto object-contain rounded-full"
          />
        </div>
      </button>
    </div>
  </div>
);
