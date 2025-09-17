import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import { SEO } from './components/layout/SEO';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NbaPage from './pages/NbaPage';
import WnbaPage from './pages/WnbaPage';
import NotFoundPage from './pages/NotFoundPage';
import TeamsPage from './pages/TeamsPage';
import TeamPage from './pages/TeamPage';
import StandingPage from './pages/StandingPage';
import NewsPage from './pages/NewsPage';

function App() {
  return (
    <>
      <SEO />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nba" element={<NbaPage />} />
          <Route path="/wnba" element={<WnbaPage />} />
          <Route path="/nba/teams" element={<TeamsPage leagueName="nba" />} />
          <Route path="/wnba/teams" element={<TeamsPage leagueName="wnba" />} />
          <Route path="/nba/teams/:teamId" element={<TeamPage league="nba" />} />
          <Route path="/wnba/teams/:teamId" element={<TeamPage league="wnba" />} />
          <Route path="/standings" element={<StandingPage />} />
          <Route path="/nba/standings" element={<StandingPage defaultLeague="nba" />} />
          <Route path="/wnba/standings" element={<StandingPage defaultLeague="wnba" />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/index.html" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
