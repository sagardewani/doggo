import './App.css'
import Header from './components/Header'
import CitySelector from './components/CitySelector'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom'
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import VendorList from './components/VendorList'
import VendorProfilePage from './pages/vendorPage'
import Assistant from './components/Assistant'
import woofSound from './assets/woof.wav';
import VendorPanel from './pages/VendorPanel';
import FunLanding from './components/FunLanding';
import DogFeed from './pages/DogFeed';
import AddDogProfile from './pages/AddDogProfile';
import AddDogHighlight from './pages/AddDogHighlight';
import BarkAI from './pages/BarkAI';
import DogOwnerLogin from './pages/DogOwnerLogin';
import AuthButtons from './components/AuthButtons';
import { DogProfileProvider } from './components/DogProfileContext';

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
      {/* Remove Dog Feed and Bark to text AI buttons from FunLanding */}
      <FunLanding />
      <AuthButtons />
      <CitySelector selectedCity={selectedCity} onSelectCity={setSelectedCity} setSearchQuery={setSearchQuery} />
      <VendorList selectedCity={selectedCity} searchQuery={searchQuery} />
    </div>
  )
}

function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isAuthed = Boolean(localStorage.getItem('doggo_owner_token'));
  if (!isAuthed) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

function AuthenticatedLayout() {
  return (
    <RequireAuth>
      <Outlet />
    </RequireAuth>
  );
}

function WithAssistant({ children }: { children: React.ReactNode }) {
  return <>
    {children}
    <Assistant />
  </>;
}

function WithAssistantWrapper() {
  return (
    <WithAssistant>
      <Outlet />
    </WithAssistant>
  );
}

function App() {
  return (
    <DogProfileProvider>
      <div className="app-root w-full px-4 sm:px-8">
        <div className="doggo-bg" />
        <Router>
          <Header />
          <Routes>
            <Route element={<WithAssistantWrapper />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<AddDogProfile />} />
              <Route path="/login" element={<DogOwnerLogin />} />
              <Route path="/vendor/:id" element={<VendorProfilePage />} />
              <Route path="/vendor-panel" element={<VendorPanel />} />
            </Route>

            {/* Authenticated routes grouped under AuthenticatedLayout */}
            <Route element={<AuthenticatedLayout />}>
              <Route path="/feed" element={<DogFeed />} />
              <Route path="/dogs/:dogId/add-highlight" element={<AddDogHighlight />} />
              <Route path="/bark-ai" element={<BarkAI />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </DogProfileProvider>
  )
}

export default App
