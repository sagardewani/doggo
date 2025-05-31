import { useEffect, useState } from 'react'
import { fetchVendors, fetchVendorsByCity, type Vendor } from '../api/vendors'
import VendorCard from './VendorCard'

interface VendorListProps {
  selectedCity: string | null
}

const serviceCategories = [
  'Consultation',
  'Vaccination',
  'Surgery',
  'Dental Care',
  'Diagnostics',
  'Grooming',
  'Pet Food',
  // Add more as needed
]

const VendorList = ({ selectedCity }: VendorListProps) => {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  useEffect(() => {
    setLoading(true)
    setError(null)
    const fetchData = async () => {
      try {
        let data: Vendor[]
        if (selectedCity) {
          data = await fetchVendorsByCity(selectedCity)
        } else {
          data = await fetchVendors()
        }
        setVendors(data)
      } catch {
        setError('Failed to load vendors')
        setVendors([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [selectedCity])

  // Filter vendors by selected category if any
  const filteredVendors = selectedCategory
    ? vendors.filter(vendor => vendor.services_provided.includes(selectedCategory))
    : vendors

  if (loading) return <div className="text-gray-500 my-4">Loading vendors...</div>
  if (error) return <div className="text-red-500 my-4">{error}</div>
  if (!filteredVendors.length) return <div className="text-gray-400 my-4">No vendors found.</div>

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          className={`px-3 py-1 rounded border font-medium transition ${selectedCategory === '' ? 'bg-yellow-500 text-white border-yellow-500' : 'bg-white text-yellow-700 border-yellow-300 hover:bg-yellow-100'}`}
          onClick={() => setSelectedCategory('')}
        >
          All Services
        </button>
        {serviceCategories.map(category => (
          <button
            key={category}
            className={`px-3 py-1 rounded border font-medium transition ${selectedCategory === category ? 'bg-yellow-500 text-white border-yellow-500' : 'bg-white text-yellow-700 border-yellow-300 hover:bg-yellow-100'}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {filteredVendors.map(vendor => (
          <VendorCard key={vendor.id} {...vendor} />
        ))}
      </div>
    </div>
  )
}

export default VendorList
