import './App.css'
import Header from './components/Header'
import CitySelector from './components/CitySelector'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import VendorCard from './components/VendorCard'
import type { VendorCardProps } from './components/VendorCard'

function HomePage() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)

  // Dummy vendor data for demonstration
  const vendors: VendorCardProps[] = [
    {
      id: 'vendor_001',
      name: 'Paws & Claws Grooming',
      profile_photo: 'https://example.com/photos/pawsclaws.jpg',
      locality: 'Malviya Nagar',
      phone: '+91-9876543210',
      services_provided: ['Grooming', 'Pet Food'],
      price_range: '₹300 - ₹1500',
      whatsapp_link: 'https://wa.me/919876543210',
      map_link: 'https://maps.google.com/?q=Malviya+Nagar+Jaipur',
    },
    // Add more vendors as needed
  ]

  return (
    <div>
      <CitySelector selectedCity={selectedCity} onSelectCity={setSelectedCity} />
      <div className="flex flex-col gap-4">
        {vendors.map(vendor => (
          <VendorCard key={vendor.id} {...vendor} />
        ))}
      </div>
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
