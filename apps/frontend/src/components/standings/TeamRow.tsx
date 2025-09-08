import React from 'react';
import type { Team } from '../../types/Standing';

type TeamRowProps = {
  team: Team;
  index: number;
  league: 'nba' | 'wnba';
};

export const TeamRow: React.FC<TeamRowProps> = ({ team, index, league }) => (
  <tr className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
    <td className="px-3 py-3 whitespace-nowrap">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-8 w-8">
          <img
            className="h-8 w-8 rounded-full"
            src={`/images/logos-${league}/logo-${team.name.toLowerCase().replace(/\s+/g, '-')}.${league === 'wnba' ? 'png' : 'svg'}`}
            alt={`${team.market} ${team.name}`}
          />
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {team.market} {team.name}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-300">
            {team.wins}-{team.losses}
          </div>
        </div>
      </div>
    </td>
    <td className="px-3 py-3 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-300">
      {team.wins}
    </td>
    <td className="px-3 py-3 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-300">
      {team.losses}
    </td>
    <td className="px-3 py-3 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-300">
      {team.win_pct ? team.win_pct.toFixed(3).replace(/^0/, '') : '.000'}
    </td>
    <td className="px-3 py-3 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-300">
      {team.games_behind?.conference?.toFixed(1) || '0.0'}
    </td>
  </tr>
);
