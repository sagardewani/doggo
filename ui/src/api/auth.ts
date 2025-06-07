import { BASE_URL } from './index';
import { removeAuthFromLocalStorage } from './utils';

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

export async function verifyAuthToken(token: string): Promise<boolean> {
  try {
    if (!token) return false;
    const res = await fetch(`${BASE_URL}/dogs/verify-token`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      removeAuthFromLocalStorage();
      return false;
    }
    const data = await res.json();
    if (!data || !data.valid) removeAuthFromLocalStorage();
    return !!data.valid;
  } catch {
    removeAuthFromLocalStorage();
    return false;
  }
}
