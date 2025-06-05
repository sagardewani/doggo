import { BASE_URL } from './index';

export async function getS3PresignedUrl(fileName: string, fileType: string) {
  const res = await fetch(`${BASE_URL}/s3-presigned-url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName, fileType })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to get S3 presigned URL');
  return data;
}
