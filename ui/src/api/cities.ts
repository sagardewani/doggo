// api/cities.ts
import { BASE_URL } from './index'

export interface City {
  name: string;
  tier: string;
}

interface CityResponse {
  cities: City[];
}

type CityListOutput = City[];

/**
 * Fetches the list of all supported cities from the backend API.
 * @returns Promise<string[]> - Array of city names
 */
export async function fetchCities(): Promise<CityListOutput> {
  const response = await fetch(`${BASE_URL}/cities`);
  if (!response.ok) {
    throw new Error('Failed to fetch cities');
  }
  const data: CityResponse = await response.json();
  if (!data.cities || !Array.isArray(data.cities)) {
    console.log('Invalid cities data received');
    return [];
  }
  return data.cities;
}
