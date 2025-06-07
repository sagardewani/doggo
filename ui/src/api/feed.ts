import { BASE_URL } from './index';
import { getAuthToken } from './utils';

export async function getDogFeed(offset = 0, limit = 10) {
  const headers: Record<string, string> = {};
  const token = getAuthToken();
  if (!token) throw new Error('No authentication token found');
  headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}/dogs/feed?offset=${offset}&limit=${limit}`, {
    headers,
  });
  if (!res.ok) throw new Error('Failed to fetch dog feed');
  return res.json();
}

export async function createDogHighlight({ dog_id, caption, video }: { dog_id: string; caption: string; video: File }) {
  const formData = new FormData();
  formData.append('dog_id', dog_id);
  formData.append('caption', caption);
  formData.append('video', video);

  const res = await fetch(`/doggo-api/dogs/${dog_id}/highlights`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to add dog highlight');
  return data;
}
