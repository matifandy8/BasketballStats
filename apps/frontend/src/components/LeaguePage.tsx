import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Trophy, Users, Play, BarChart2 } from 'lucide-react';

interface LeaguePageProps {
  leagueName: string;
  leagueSlug: string;
  description: string;
}

const LeaguePage: React.FC<LeaguePageProps> = ({ leagueName, leagueSlug, description }) => {
  const sections = [
    {
      title: 'Teams',
      description: `Explore all ${leagueName} teams, rosters, and team statistics`,
      icon: <Users className="w-8 h-8 text-stone-700 dark:text-stone-200" />,
      link: `/${leagueSlug}/teams`,
      bgColor: 'bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/30 dark:to-stone-900',
      hoverColor: 'hover:shadow-lg hover:-translate-y-1',
      borderColor: 'border border-stone-200 dark:border-stone-700',
    },
    {
      title: 'Standings',
      description: `View current season standings and ${leagueName === 'NBA' ? 'conference' : 'league'} rankings`,
      icon: <BarChart2 className="w-8 h-8 text-green-700 dark:text-green-400" />,
      link: `/${leagueSlug}/standings`,
      bgColor: 'bg-gradient-to-br from-green-50 to-white dark:from-green-900/30 dark:to-stone-900',
      hoverColor: 'hover:shadow-lg hover:-translate-y-1',
      borderColor: 'border border-stone-200 dark:border-stone-700',
    },
    {
      title: 'Schedule',
      description: `Check the full ${leagueName} season schedule and game times`,
      icon: <Calendar className="w-8 h-8 text-red-700 dark:text-red-400" />,
      link: `/${leagueSlug}/schedule`,
      bgColor: 'bg-gradient-to-br from-red-50 to-white dark:from-red-900/30 dark:to-stone-900',
      hoverColor: 'hover:shadow-lg hover:-translate-y-1',
      borderColor: 'border border-stone-200 dark:border-stone-700',
    },
    {
      title: 'Scores',
      description: `Live scores and game results from around the ${leagueName}`,
      icon: <Play className="w-8 h-8 text-purple-700 dark:text-purple-400" />,
      link: `/${leagueSlug}/scores`,
      bgColor:
        'bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/30 dark:to-stone-900',
      hoverColor: 'hover:shadow-lg hover:-translate-y-1',
      borderColor: 'border border-stone-200 dark:border-stone-700',
    },
    {
      title: 'Stats Leaders',
      description: 'Top performers in points, rebounds, assists and more',
      icon: <Trophy className="w-8 h-8 text-yellow-700 dark:text-yellow-400" />,
      link: `/${leagueSlug}/leaders`,
      bgColor:
        'bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/30 dark:to-stone-900',
      hoverColor: 'hover:shadow-lg hover:-translate-y-1',
      borderColor: 'border border-stone-200 dark:border-stone-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-t from-black to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-stone-900 dark:text-white mb-4 font-druk tracking-tight">
            {leagueName}
          </h1>
          <p className="text-xl text-stone-600 dark:text-stone-300 max-w-2xl mx-auto">
            {description}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {sections.map((section, index) => (
            <Link
              key={index}
              to={section.link}
              className={`group relative p-6 rounded-xl transition-all duration-200 ${section.bgColor} ${section.hoverColor} ${section.borderColor}`}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/80 dark:bg-black/20 rounded-lg shadow-sm">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-stone-900 dark:text-white group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors font-proxima-nova">
                    {section.title}
                  </h2>
                  <p className="mt-2 text-stone-600 dark:text-stone-300 font-proxima-nova">
                    {section.description}
                  </p>
                  <div className="mt-4 inline-flex items-center text-sm font-medium text-white hover:text-gray-500 transition-colors cursor-pointer">
                    View more
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-white/80 dark:bg-stone-800/50 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700 overflow-hidden backdrop-blur-sm">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-6 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-red-600 dark:text-red-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M11 7h2v10h-2zm0-4h2v2h-2zm1 14c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-18C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              </svg>
              Latest News
            </h2>
            <div className="space-y-4">
              {[1, 2].map(item => (
                <div
                  key={item}
                  className="p-5 bg-white/50 dark:bg-stone-700/30 rounded-xl hover:bg-stone-100/50 dark:hover:bg-stone-700/50 transition-colors backdrop-blur-sm"
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-stone-900 dark:text-white">
                        {item === 1
                          ? `Breaking: ${leagueName} ${leagueName === 'NBA' ? 'Trade' : 'Season'} Update`
                          : `${leagueName} ${leagueName === 'NBA' ? 'MVP' : 'Award'} Race Heats Up`}
                      </h3>
                      <p className="text-stone-600 dark:text-stone-300 mt-2">
                        {item === 1
                          ? `Latest updates and news from around the ${leagueName} as the season progresses.`
                          : `With the season in full swing, the race for the top individual honors is getting more competitive.`}
                      </p>
                      <div className="mt-3 text-sm text-stone-500 dark:text-stone-400">
                        <span className="font-medium font-proxima-nova">
                          {item === 1 ? '2 hours ago' : '5 hours ago'}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{`By ${leagueName} Insider`}</span>
                      </div>
                    </div>
                    <div className="ml-4 w-24 h-16 bg-stone-200/50 dark:bg-stone-600/50 rounded-lg flex-shrink-0"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button className="px-6 py-2.5 px-6 py-2 bg-white text-black rounded-md hover:bg-gray-500 transition-colors cursor-pointer font-druk">
                View All News
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaguePage;
