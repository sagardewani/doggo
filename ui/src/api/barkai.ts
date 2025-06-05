import { BASE_URL } from './index';

// BarkAI API integration
export async function analyzeBark(audio_url: string) {
  const res = await fetch(`${BASE_URL}/bark-ai`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ audio_url })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to analyze bark');
  return data;
}
