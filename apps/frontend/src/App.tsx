import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import { SEO } from './components/SEO';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NbaPage from './pages/NbaPage';
import WnbaPage from './pages/WnbaPage';
import NotFoundPage from './pages/NotFoundPage';
import TeamsPage from './pages/TeamsPage';
import TeamPage from './pages/TeamPage';

function App() {
  console.log("render app()");
  return (
    <>
      <SEO />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/nba" element={<NbaPage />} />
              <Route path="/wnba" element={<WnbaPage />} />
              <Route path="/nba/teams" element={<TeamsPage leagueName='nba' />} />
              <Route path="/wnba/teams" element={<TeamsPage leagueName='wnba' />} />
              <Route
                path="/nba/teams/:teamId"
                element={<TeamPage league='nba' />}
              />
              <Route
                path="/wnba/teams/:teamId"
                element={<TeamPage league='wnba' />}
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
    </>
  );
}

export default App;