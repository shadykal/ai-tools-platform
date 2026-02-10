import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const jobId = `iv-${Date.now()}`;
  return NextResponse.json({ jobId, status: 'queued', tool: 'image-to-video', input: body });
}
