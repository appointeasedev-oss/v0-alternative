import { NextRequest, NextResponse } from 'next/server';
import { generateComponent, GenerationRequest, getAvailableProviders } from '@/lib/ai-service';

export async function POST(request: NextRequest) {
  try {
    const body: GenerationRequest = await request.json();
    const { prompt, framework, mode } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const result = await generateComponent({ prompt, framework, mode });

    if (result.success) {
      return NextResponse.json({
        code: result.code,
        provider: result.provider,
        length: result.code.length,
      });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  const providers = getAvailableProviders();
  return NextResponse.json({
    providers,
    hasApiKeys: providers.length > 0,
  });
}
