import { useEffect, useState } from 'react'
import { fetchVendors, fetchVendorsByCity, type Vendor } from '../api/vendors'
import VendorCard from './VendorCard'

interface VendorListProps {
  selectedCity: string | null
  searchQuery: string;
}

const VendorList = ({ selectedCity, searchQuery }: VendorListProps) => {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [vendorsFiltered, setVendorsFiltered] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  if (loading) return <div className="text-gray-500 my-4">Loading vendors...</div>
  if (error) return <div className="text-red-500 my-4">{error}</div>
  if (!vendors.length) return <div className="text-gray-400 my-4">No vendors found.</div>

  return (
    <div className="flex flex-col gap-4">
      {vendorsFiltered.map(vendor => (
        <VendorCard key={vendor.id} {...vendor} />
      ))}
    </div>
  )
}

export default VendorList
