import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const jobId = `vv-${Date.now()}`;
  return NextResponse.json({ jobId, status: 'queued', tool: 'video-to-video', input: body });
}
