import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const jobId = `tv-${Date.now()}`;

  // In a real implementation, enqueue a job or call an AI backend here.
  return NextResponse.json({
    jobId,
    status: 'queued',
    tool: 'text-to-video',
    input: body,
  });
}
