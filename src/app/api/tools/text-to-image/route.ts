import { NextResponse } from 'next/server';
import { generateImage } from '@/lib/providers/textToImage';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const {
      prompt = '',
      style = 'realistic',
      size = '1024x1024',
    } = body as {
      prompt?: string;
      style?: string;
      size?: string;
    };

    // Validate inputs
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'وصف الصورة مطلوب' },
        { status: 400 }
      );
    }

    if (!['realistic', 'painting', 'anime', 'cartoon', 'digital'].includes(style)) {
      return NextResponse.json(
        { error: 'أسلوب فني غير صالح' },
        { status: 400 }
      );
    }

    // Validate size format
    const sizeRegex = /^\d+x\d+$/;
    if (!sizeRegex.test(size)) {
      return NextResponse.json(
        { error: 'صيغة الدقة غير صحيحة (استخدم 1024x1024)' },
        { status: 400 }
      );
    }

    // Generate image
    const image = generateImage(prompt.trim(), style, size);

    return NextResponse.json({
      jobId: image.metadata.id,
      status: 'done',
      tool: 'text-to-image',
      data: {
        id: image.id,
        metadata: image.metadata,
        preview: image.dataUrl,
        fileName: image.fileName,
      },
      generatedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Text-to-image generation error:', err);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء توليد الصورة' },
      { status: 500 }
    );
  }
}
