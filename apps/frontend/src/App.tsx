import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import NewsSection from './components/NewsSection';
import AboutPage from './pages/AboutPage';

function App() {
  console.log("render app()")
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={
            <div className="mx-autorounded-lg shadow-md">
              <NewsSection />
            </div>
          } />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
