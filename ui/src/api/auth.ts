import { BASE_URL } from './index';

// Authentication APIs for dog owner (login, registration, etc.)

export async function dogOwnerLogin(owner_id: string, audio: File): Promise<{ token: string }> {
  const formData = new FormData();
  formData.append('owner_id', owner_id);
  formData.append('audio', audio);
  const res = await fetch(`${BASE_URL}/dogs/login`, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  if (!res.ok || !data.token) {
    throw new Error(data.error || 'Login failed');
  }
  return data;
}
