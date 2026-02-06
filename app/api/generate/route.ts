// API route for generating components with multiple AI provider support
import { NextRequest } from 'next/server';
import { generateComponent, generatePage } from '@/utils/ai-service';
import { initializeProvider, getActiveProvider } from '@/config/ai-providers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, type = 'component', framework = 'react', provider = null } = body;

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Initialize the provider (in a real implementation, this would connect to the selected AI service)
    const activeProvider = initializeProvider();
    
    let result;
    if (type === 'page') {
      result = await generatePage(prompt);
    } else {
      result = await generateComponent({ prompt, framework, componentType: type });
    }

    if (result.success) {
      return new Response(JSON.stringify({ 
        code: result.code,
        provider: activeProvider.name,
        framework
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error in generate API:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}