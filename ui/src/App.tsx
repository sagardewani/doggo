import './App.css'
import Header from './components/Header'
import CitySelector from './components/CitySelector'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

function HomePage() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)

  return (
    <div>
      <CitySelector selectedCity={selectedCity} onSelectCity={setSelectedCity} />
      {/* Vendor list and other homepage content will go here */}
    </div>
  )
}

function VendorProfile() {
  return <div>{/* Vendor profile content will go here */}</div>
}

function App() {
  return (
    <div className="app-root w-full px-4 sm:px-8">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vendor/:id" element={<VendorProfile />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
