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

  if (loading) {
    return (
      <div className="flex justify-center my-8">
        <div className="spinner" aria-label="Loading" />
      </div>
    )
  }

  return (
    <div className="flex mx-auto w-full bg-card-primary p-4 rounded-lg shadow-lg gap-4">
      <div className="flex flex-col items-center gap-2">
        <select
          id="city-select"
          className="border border-primary rounded px-3 py-2 min-w-[180px]"
          value={selectedCity || ''}
          onChange={e => onSelectCity(e.target.value || null)}
        >
          <option value="">All Cities</option>
          {cities.map(city => (
            <option key={city.name} value={city.name}>{city.name}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2 flex-1">
        <input
          id="search-input"
          type="text"
          placeholder="Search vendors..."
          className="border border-primary rounded px-3 py-2 w-full"
          onChange={e => setSearchQuery ? setSearchQuery(e.target.value) : null}
        />
      </div>
    </div>
  )
}

export default CitySelector
