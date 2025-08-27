import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NbaPage from './pages/NbaPage';
import WnbaPage from './pages/WnbaPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  console.log("render app()")
  return (
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
  );
}

export default App;
