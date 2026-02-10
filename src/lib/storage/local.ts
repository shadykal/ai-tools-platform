import { uploadBase64, uploadFromUrl } from './cloudinary';
import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

async function ensureDir() {
  await fs.mkdir(uploadsDir, { recursive: true });
}

async function saveBufferLocal(buffer: Buffer, ext = 'png') {
  await ensureDir();
  const filename = `${Date.now()}-${randomUUID()}.${ext}`;
  const filePath = path.join(uploadsDir, filename);
  await fs.writeFile(filePath, buffer);
  return `/uploads/${filename}`;
}

export async function saveBase64(b64: string) {
  // If Cloudinary is configured use it
  if (process.env.CLOUDINARY_CLOUD_NAME) {
    try {
      return await uploadBase64(b64);
    } catch (err) {
      console.error('Cloudinary upload failed, falling back to local:', err);
    }
  }

  // accept mime types like image/png, image/svg+xml, etc.
  const match = b64.match(/^data:(image\/([a-zA-Z0-9+.-]+));base64,(.+)$/);
  if (match) {
    const extRaw = match[2] || 'png';
    // normalize svg+xml -> svg
    const ext = extRaw.split('+')[0];
    const data = match[3];
    const buffer = Buffer.from(data, 'base64');
    return saveBufferLocal(buffer, ext);
  }

  // If no data URL header, assume raw base64 for png
  const buffer = Buffer.from(b64, 'base64');
  return saveBufferLocal(buffer, 'png');
}

export async function saveFromUrl(url: string) {
  if (process.env.CLOUDINARY_CLOUD_NAME) {
    try {
      return await uploadFromUrl(url);
    } catch (err) {
      console.error('Cloudinary fetch-upload failed, falling back to local:', err);
    }
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.status}`);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const contentType = res.headers.get('content-type') || 'image/png';
  const ext = contentType.split('/')[1]?.split(';')[0] || 'png';
  return saveBufferLocal(buffer, ext);
}
