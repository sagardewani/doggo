import { BASE_URL } from './index';

export async function getBarkFingerprint(audio: File) {
  const formData = new FormData();
  formData.append('audio_url', audio);
  const res = await fetch(`${BASE_URL}/bark-ai`, {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to process bark audio');
  return data;
}
