import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { UploadPage } from './components/UploadPage';
import { ResultsPage } from './components/ResultsPage';
import { WeatherPage } from './components/WeatherPage';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen theme-gradient texture-noise">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/weather" element={<WeatherPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
