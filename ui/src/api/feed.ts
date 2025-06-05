import { BASE_URL } from './index';

export async function getDogFeed(offset = 0, limit = 10, token?: string) {
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}/feed?offset=${offset}&limit=${limit}`, {
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
