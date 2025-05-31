import { useEffect, useState } from 'react'
import { fetchVendors, fetchVendorsByCity, type Vendor } from '../api/vendors'
import VendorCard from './VendorCard'

interface VendorListProps {
  selectedCity: string | null
}

const VendorList = ({ selectedCity }: VendorListProps) => {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  if (loading) return <div className="text-gray-500 my-4">Loading vendors...</div>
  if (error) return <div className="text-red-500 my-4">{error}</div>
  if (!vendors.length) return <div className="text-gray-400 my-4">No vendors found.</div>

  return (
    <div className="flex flex-col gap-4">
      {vendors.map(vendor => (
        <VendorCard key={vendor.id} {...vendor} />
      ))}
    </div>
  )
}

export default VendorList
