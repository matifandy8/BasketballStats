import { Link } from 'react-router-dom';

function Footer() {
  console.log('render Footer()');
  return (
    <footer className="bg-white rounded-lg shadow-sm dark:bg-black py-8">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-300 sm:text-center dark:text-gray-200 font-druk">
          © 2025{' '}
          <Link to="/" className="hover:underline">
            Matias
          </Link>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-300 dark:text-gray-200 sm:mt-0">
          <li>
            <Link
              to="/about"
              className="hover:underline me-4 md:me-6 hover:text-gray-400 font-druk"
            >
              About
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:underline me-4 md:me-6 hover:text-gray-400 font-druk">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:underline me-4 md:me-6 hover:text-gray-400 font-druk">
              Licensing
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:underline hover:text-gray-400 font-druk">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
