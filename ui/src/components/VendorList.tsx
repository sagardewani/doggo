import { useEffect, useState } from 'react'
import { fetchVendors, fetchVendorsByCity, type Vendor } from '../api/vendors'
import VendorCard from './VendorCard'

interface VendorListProps {
  selectedCity: string | null
  searchQuery: string;
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

const VendorList = ({ selectedCity, searchQuery }: VendorListProps) => {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [vendorsFiltered, setVendorsFiltered] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  useEffect(() => {
    if (searchQuery) {
      const filtered = vendors.filter(vendor =>
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.services_provided.some(service =>
          service.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
      setVendorsFiltered(filtered)
    } else {
      setVendorsFiltered(vendors)
    }
  }, [searchQuery, vendors])

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
        setVendors(data);
        setVendorsFiltered(data);
      } catch {
        setError('Failed to load vendors')
        setVendors([]);
        setVendorsFiltered([]);
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [selectedCity])

  // Filter vendors by selected category if any
  const filteredVendors = selectedCategory
    ? vendorsFiltered.filter(vendor => vendor.services_provided.includes(selectedCategory))
    : vendorsFiltered

  if (loading) {
    return (
      <div className="flex justify-center my-8">
        <div className="spinner" aria-label="Loading" />
      </div>
    );
  }
  if (error) return <div className="text-red-500 my-4">{error}</div>
  if (!filteredVendors.length) return <div className="text-gray-400 my-4">No vendors found.</div>

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          className={`px-3 py-1 rounded border font-medium transition ${selectedCategory === '' ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-secondary hover:bg-yellow-100'}`}
          onClick={() => setSelectedCategory('')}
        >
          All Services
        </button>
        {serviceCategories.map(category => (
          <button
            key={category}
            className={`px-3 py-1 rounded border font-medium transition ${selectedCategory === category ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-secondary hover:bg-yellow-100'}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="w-full max-h-[500px] p-4 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVendors.map(vendor => (
          <VendorCard key={vendor.id} {...vendor} />
        ))}
        </div>
      </div>
    </div>
  )
}

export default VendorList
