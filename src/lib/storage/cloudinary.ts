import FormData from 'form-data';

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET; // optional unsigned preset

function getUploadUrl() {
  if (!CLOUD_NAME) throw new Error('CLOUDINARY_CLOUD_NAME not set');
  return `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
}

export async function uploadBase64(b64: string) {
  const url = getUploadUrl();
  const form = new FormData();

  if (UPLOAD_PRESET) {
    form.append('upload_preset', UPLOAD_PRESET);
    form.append('file', b64);
  } else if (API_KEY && API_SECRET) {
    form.append('file', b64);
  } else {
    throw new Error('Cloudinary credentials not configured (API key/secret or upload preset)');
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: form.getHeaders(),
    body: form as unknown as BodyInit,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cloudinary upload failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data.secure_url || data.url;
}

export async function uploadFromUrl(fileUrl: string) {
  const url = getUploadUrl();
  const form = new FormData();

  if (UPLOAD_PRESET) {
    form.append('upload_preset', UPLOAD_PRESET);
  }
  form.append('file', fileUrl);

  const res = await fetch(url, {
    method: 'POST',
    headers: form.getHeaders(),
    body: form as unknown as BodyInit,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cloudinary fetch-upload failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data.secure_url || data.url;
}
