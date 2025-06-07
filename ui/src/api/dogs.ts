import { BASE_URL } from './index';
import { getAuthToken } from './utils';

export async function createDogProfile(profile: {
  owner_id: string;
  name: string;
  bio?: string;
  breed_id?: number;
  age?: number;
  photo_url?: string;
  audio?: Blob | File;
}) {
  const formData = new FormData();
  formData.append('owner_id', profile.owner_id);
  formData.append('name', profile.name);
  if (profile.breed_id !== undefined) formData.append('breed_id', String(profile.breed_id));
  if (profile.age !== undefined) formData.append('age', String(profile.age));
  if (profile.photo_url) formData.append('photo_url', profile.photo_url);
  if (profile.audio) formData.append('audio', profile.audio);
  if (profile.bio) formData.append('bio', profile.bio);

  const res = await fetch(`${BASE_URL}/dogs`, {
    method: 'POST',
    body: formData,
    // No Content-Type header: browser sets it for FormData
    // credentials: 'include', // ensure cookies/session are sent
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to create dog profile');
  return data;
}

export async function getDogProfiles(owner_id?: string) {
  const url = owner_id ? `${BASE_URL}/dogs?owner_id=${owner_id}` : `${BASE_URL}/dogs`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch dog profiles');
  return res.json();
}

export async function getDogProfile(id?: string) {
  const headers: Record<string, string> = {};
  const token = getAuthToken();
  if (!token) throw new Error('No authentication token found');
  headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}/dogs`, {
    headers,
    method: 'GET',
  });
  if (!res.ok) throw new Error('Failed to fetch dog profile');
  return res.json();
}
