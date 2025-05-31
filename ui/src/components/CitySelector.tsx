import { useEffect, useState } from 'react'
import { fetchCities, type City } from '../api/cities'

interface CitySelectorProps {
  selectedCity: string | null
  onSelectCity: (city: string | null) => void
  setSearchQuery?: (query: string) => void
}

const CitySelector = ({ selectedCity, onSelectCity, setSearchQuery }: CitySelectorProps) => {
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchCities()
      .then((data) => {
        if (Array.isArray(data)) {
          setCities(data)
          setError(null)
        } else {
          setCities([])
          setError('Invalid cities data received')
        }
      })
      .catch(() => setError('Failed to load cities'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex justify-between mx-auto w-full">
      <div className="flex flex-col items-start gap-2 my-4 bg-white shadow rounded-lg p-4">
        <label htmlFor="city-select" className="font-medium text-gray-700">Select City:</label>
        <select
          id="city-select"
          className="border border-gray-300 rounded px-3 py-2 min-w-[180px]"
          value={selectedCity || ''}
          onChange={e => onSelectCity(e.target.value || null)}
        >
          <option value="">All Cities</option>
          {cities.map(city => (
            <option key={city.name} value={city.name}>{city.name}</option>
          ))}
        </select>
        {loading && <span className="text-xs text-gray-400">Loading cities...</span>}
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
      <div className="flex flex-col items-start gap-2 my-4 bg-white shadow rounded-lg p-4 w-full">
        <label htmlFor="search-input" className="font-medium text-gray-700">Search:</label>
        <input
          id="search-input"
          type="text"
          placeholder="Search vendors..."
          className="border border-gray-300 rounded px-3 py-2 w-full"
          onChange={e => setSearchQuery ? setSearchQuery(e.target.value) : null}
        />
      </div>
    </div>
  )
}

export default CitySelector
