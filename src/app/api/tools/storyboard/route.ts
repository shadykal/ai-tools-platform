import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const jobId = `sb-${Date.now()}`;
  return NextResponse.json({ jobId, status: 'queued', tool: 'storyboard', input: body });
}
