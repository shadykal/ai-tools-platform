import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { text } = body as { text?: string };

  if (!text) {
    return NextResponse.json({ error: 'text is required' }, { status: 400 });
  }

  // Placeholder: implement real TTS using OpenAI / other provider.
  // If an API key is present we could stream or return an audio URL here.
  const jobId = `vg-${Date.now()}`;
  return NextResponse.json({ jobId, status: 'queued', tool: 'voice-generation', input: body, note: 'TTS not yet implemented; add provider integration' });
}
