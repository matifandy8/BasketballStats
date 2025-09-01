import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import { SEO } from './components/SEO';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NbaPage from './pages/NbaPage';
import WnbaPage from './pages/WnbaPage';
import NotFoundPage from './pages/NotFoundPage';
import TeamsPage from './pages/TeamsPage';
import { lazy, Suspense } from 'react';
const TeamPage = lazy(() => import("./pages/TeamPage"));

function App() {
  console.log("render app()")
  return (
    <>
      <SEO />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/nba" element={<NbaPage />} />
            <Route path="/wnba" element={<WnbaPage />} />
            <Route path="/nba/teams" element={<TeamsPage leagueName='nba' />} />
            <Route path="/wnba/teams" element={<TeamsPage leagueName='wnba' />} />
            <Route
              path="/nba/teams/:teamId"
              element={
                <Suspense fallback={<div>Cargando equipo...</div>}>
                  <TeamPage league="NBA" />
                </Suspense>
              }
            />
            <Route
              path="/wnba/teams/:teamId"
              element={
                <Suspense fallback={<div>Cargando equipo...</div>}>
                  <TeamPage league="WNBA" />
                </Suspense>
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
