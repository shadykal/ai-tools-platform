import { NextResponse } from 'next/server';
import { generateImage } from '@/lib/providers/openai';
import { saveBase64, saveFromUrl } from '@/lib/storage/local';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { prompt, size } = body as { prompt?: string; size?: string };

  if (!prompt) {
    return NextResponse.json({ error: 'prompt is required' }, { status: 400 });
  }

  // If OPENAI_API_KEY is provided, call OpenAI image generation and persist result locally
  try {
    if (process.env.OPENAI_API_KEY) {
      const img = await generateImage(prompt, size || '1024x1024');

      // OpenAI returns either a `b64_json` or a `url` depending on account/config
      let publicPath: string | null = null;
      try {
        if (img.b64_json) {
          publicPath = await saveBase64(img.b64_json);
        } else if (img.url) {
          publicPath = await saveFromUrl(img.url);
        }
      } catch (err) {
        // Non-fatal: return response with original result
        console.error('Failed to persist image locally:', err);
      }

      return NextResponse.json({
        jobId: `ti-${Date.now()}`,
        status: 'done',
        tool: 'text-to-image',
        result: img,
        publicPath: publicPath || null,
      });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  // Fallback stub
  const jobId = `ti-${Date.now()}`;
  return NextResponse.json({ jobId, status: 'queued', tool: 'text-to-image', input: body });
}
