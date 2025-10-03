import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Trophy, Newspaper, Info, Menu, X } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="../images/logo.avif"
            width={60}
            height={60}
            alt="NBA/WNBA Logo"
            loading="eager"
            fetchPriority="high"
          />
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
          <ul className="font-medium font-druk flex flex-col p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-gray-900 md:bg-transparent md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <Link
                to="/"
                className="flex items-center gap-2 py-2 px-3 text-white rounded hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-gray-300 md:p-0 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/nba"
                className="flex items-center gap-2 py-2 px-3 text-white rounded hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-gray-300 md:p-0 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span>NBA</span>
              </Link>
            </li>
            <li>
              <Link
                to="/wnba"
                className="flex items-center gap-2 py-2 px-3 text-white rounded hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-gray-300 md:p-0 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span>WNBA</span>
              </Link>
            </li>
            <li>
              <Link
                to="/news"
                className="flex items-center gap-2 py-2 px-3 text-white rounded hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-gray-300 md:p-0 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Newspaper className="w-5 h-5 text-white" />
                <span>News</span>
              </Link>
            </li>
            <li>
              <Link
                to="/standings"
                className="flex items-center gap-2 py-2 px-3 text-white rounded hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-gray-300 md:p-0 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Trophy className="w-5 h-5 text-white" />
                <span>Standings</span>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="flex items-center gap-2 py-2 px-3 text-white rounded hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-gray-300 md:p-0 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Info className="w-5 h-5 text-white" />
                <span>About</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
