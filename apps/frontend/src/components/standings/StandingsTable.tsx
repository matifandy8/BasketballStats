import React from 'react';
import type { Conference, Team } from '../../types/standing';
import { TeamRow } from './TeamRow';

type StandingsTableProps = {
  conference: Conference;
  league: 'nba' | 'wnba';
};

const getLeagueStyles = (league: 'nba' | 'wnba') => ({
  headerBg: league === 'nba' ? 'bg-blue-700' : 'bg-[#ff4613]',
  headerText: 'text-white',
  divisionBg: league === 'nba' ? 'bg-blue-600' : 'bg-[#ff6e3d]',
  divisionText: 'text-white',
});

export const StandingsTable: React.FC<StandingsTableProps> = ({ conference, league }) => {
  const leagueStyles = getLeagueStyles(league);

  const sortTeams = (teams: Team[] = []) => {
    return [...teams].sort((a, b) => (b.win_pct || 0) - (a.win_pct || 0));
  };

  const getConferenceTeams = (conf: Conference) => {
    if (conf.teams) return conf.teams;
    if (conf.divisions) {
      return conf.divisions.flatMap(division => division.teams || []);
    }
    return [];
  };

  const teams = getConferenceTeams(conference);
  const hasDivisions = conference.divisions && conference.divisions.length > 0;

  if (!hasDivisions) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className={`${leagueStyles.headerBg} ${leagueStyles.headerText}`}>
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
                Team
              </th>
              <th className="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider">
                W
              </th>
              <th className="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider">
                L
              </th>
              <th className="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider">
                PCT
              </th>
              <th className="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider">
                GB
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {sortTeams(teams).map((team, index) => (
              <TeamRow key={team.id} team={team} index={index} league={league} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      {conference.divisions?.map(division => (
        <div key={division.id} className="mb-6">
          <h3
            className={`text-lg font-medium p-3 ${leagueStyles.divisionBg} ${leagueStyles.divisionText}`}
          >
            {division.name} Division
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className={`${leagueStyles.headerBg} ${leagueStyles.headerText}`}>
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
                    Team
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider">
                    W
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider">
                    L
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider">
                    PCT
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider">
                    GB
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {sortTeams(division.teams).map((team, index) => (
                  <TeamRow key={team.id} team={team} index={index} league={league} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </>
  );
};
