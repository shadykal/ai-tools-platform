import { NextResponse } from 'next/server';
import { generateStoryboard, storyboardToMarkdown } from '@/lib/providers/storyboard';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const {
      title = 'سيناريو جديد',
      genre = 'دراما رومانسية',
      sceneCount = 5,
      characterCount = 3,
    } = body as {
      title?: string;
      genre?: string;
      sceneCount?: number;
      characterCount?: number;
    };

    // Validate inputs
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'عنوان السيناريو مطلوب' },
        { status: 400 }
      );
    }

    if (!genre || !['دراما رومانسية', 'أكشن', 'كوميديا', 'رعب', 'خيال علمي'].includes(genre)) {
      return NextResponse.json(
        { error: 'نوع مختار غير صالح' },
        { status: 400 }
      );
    }

    const scenes = Math.max(1, Math.min(parseInt(String(sceneCount)) || 5, 10));
    const characters = Math.max(1, Math.min(parseInt(String(characterCount)) || 3, 8));

    // Generate storyboard
    const storyboard = generateStoryboard(title, genre, scenes, characters);
    const markdown = storyboardToMarkdown(storyboard);

    return NextResponse.json({
      jobId: `sb-${Date.now()}`,
      status: 'done',
      tool: 'storyboard',
      data: storyboard,
      markdown,
      generatedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Storyboard generation error:', err);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء توليد السيناريو' },
      { status: 500 }
    );
  }
}
