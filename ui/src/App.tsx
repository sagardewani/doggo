import './App.css'
import Header from './components/Header'
import CitySelector from './components/CitySelector'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import VendorList from './components/VendorList'
import VendorProfilePage from './pages/vendorPage'
import Assistant from './components/Assistant'
import woofSound from './assets/woof.wav';
import VendorPanel from './pages/VendorPanel';

function HomePage() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    let played = false;
    let audio: HTMLAudioElement | null = null;
    const playWoof = () => {
      if (!played) {
        played = true;
        audio = new Audio(woofSound);
        audio.volume = 0.5;
        audio.play().catch(() => {});
      }
    };
    window.addEventListener('pointerdown', playWoof);
    return () => {
      window.removeEventListener('pointerdown', playWoof);
      if (audio) {
        audio.pause();
        audio = null;
      }
    };
  }, []);

  return (
    <div>
      <CitySelector selectedCity={selectedCity} onSelectCity={setSelectedCity} setSearchQuery={setSearchQuery} />
      <VendorList selectedCity={selectedCity} searchQuery={searchQuery} />
    </div>
  )
}

function App() {
  return (
    <div className="app-root w-full px-4 sm:px-8">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vendor/:id" element={<VendorProfilePage />} />
          <Route path="/vendor-panel" element={<VendorPanel />} />
        </Routes>
        <Assistant />
      </Router>
    </div>
  )
}

export default App
