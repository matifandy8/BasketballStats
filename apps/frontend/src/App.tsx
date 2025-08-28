import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import { SEO } from './components/SEO';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NbaPage from './pages/NbaPage';
import WnbaPage from './pages/WnbaPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  console.log("render app()")
  return (
    <HelmetProvider>
      <SEO />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/nba" element={<NbaPage />} />
            <Route path="/wnba" element={<WnbaPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}

export default App;
