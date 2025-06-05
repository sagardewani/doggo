import { BASE_URL } from './index';

export async function getDogBreeds() {
  const res = await fetch(`${BASE_URL}/breeds`);
  if (!res.ok) throw new Error('Failed to fetch dog breeds');
  return res.json();
}
