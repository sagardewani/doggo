// api/vendors.ts
import { BASE_URL } from './index'

export interface Vendor {
  id: string
  city: string
  name: string
  category: string
  description: string
  locality: string
  rating: number
  price_range: string
  price_range_value: {
    min: number
    max: number
  }
  phone: string
  whatsapp: string
  address: string
  map_link: string
  profile_photo: string
  services_provided: string[]
}

interface VendorResponse {
  vendors: Vendor[]
}
// Type for the output of the vendor list API
export type VendorListOutput = Vendor[];

/**
 * Fetches the list of all vendors from the backend API.
 * @returns Promise<Vendor[]> - Array of vendor objects
 */
export async function fetchVendors(): Promise<VendorListOutput> {
  const response = await fetch(`${BASE_URL}/vendors`)
  if (!response.ok) {
    throw new Error('Failed to fetch vendors')
  }
  const data = await response.json();
  if (Array.isArray(data)) {
    return data as VendorListOutput;
  } else if (data && Array.isArray(data.vendors)) {
    return data.vendors as VendorListOutput;
  } else {
    return [];
  }
}

/**
 * Fetches the list of vendors for a specific city from the backend API.
 * @param city - The city name
 * @returns Promise<Vendor[]> - Array of vendor objects for the city
 */
export async function fetchVendorsByCity(city: string): Promise<VendorListOutput> {
  const response = await fetch(`${BASE_URL}/vendors/${encodeURIComponent(city)}`)
  if (!response.ok) {
    throw new Error('Failed to fetch vendors for city')
  }
  const data = await response.json();
  if (Array.isArray(data)) {
    return data as VendorListOutput;
  } else if (data && Array.isArray(data.vendors)) {
    return data.vendors as VendorListOutput;
  } else {
    return [];
  }
}
