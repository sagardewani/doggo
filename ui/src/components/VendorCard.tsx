import { FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export interface VendorCardProps {
  id: string
  name: string
  profile_photo: string
  locality: string
  phone: string
  services_provided: string[]
  price_range: string
  whatsapp_link?: string
  whatsapp?: string
  map_link: string
  category?: string
  address?: string
  description?: string
  rating?: number
  city?: string
  price_range_value?: { min: number; max: number }
}

const VendorCard = ({
  id,
  name,
  profile_photo,
  locality,
  phone,
  services_provided,
  price_range,
  price_range_value,
  whatsapp_link,
  whatsapp,
  map_link,
}: VendorCardProps) => {
  // Format price range value if available
  const formattedPriceRange = price_range_value
    ? `₹${price_range_value.min} - ₹${price_range_value.max}`
    : price_range;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white shadow rounded-lg p-4 my-4 w-full">
      <img
        src={profile_photo}
        alt={name}
        className="w-20 h-20 rounded-full object-cover border border-primary"
      />
      <div className="flex-1 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full">
          <Link to={`/vendor/${id}`} className="text-lg font-bold text-primary mb-1 hover:underline">
            {name}
          </Link>
          <span className="text-sm text-gray-500">{locality}</span>
        </div>
        <div className="flex flex-wrap gap-2 my-2">
          {services_provided.map(service => (
            <span key={service} className="bg-tag text-dark px-2 py-1 rounded text-xs font-medium">
              {service}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm mt-2">
          <span className="font-semibold text-gray-700">{formattedPriceRange}</span>
        </div>
        <div className="flex gap-3 mt-3">
          <a href={phone} className="flex items-center gap-1 px-3 py-1 bg-primary text-white rounded hover:bg-opacity-90 transition" title="Call">
            <FaPhoneAlt /> Call
          </a>
          <a href={whatsapp_link || whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200 transition" title="WhatsApp">
            <FaWhatsapp /> WhatsApp
          </a>
          <a href={map_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition" title="Directions">
            <FaMapMarkerAlt /> Directions
          </a>
        </div>
      </div>
    </div>
  )
}

export default VendorCard
