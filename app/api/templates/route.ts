// API route for template library
import { NextRequest } from 'next/server';
import { getAllTemplates, getTemplate } from '@/utils/template-library';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const template = searchParams.get('template');

  try {
    if (category && template) {
      // Return specific template
      const code = getTemplate(category, template);
      if (code) {
        return new Response(JSON.stringify({ code }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        return new Response(JSON.stringify({ error: 'Template not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } else if (category) {
      // Return all templates in a category
      const allTemplates = getAllTemplates();
      const categoryTemplates = allTemplates[category as keyof typeof allTemplates];
      if (categoryTemplates) {
        return new Response(JSON.stringify({ templates: categoryTemplates }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        return new Response(JSON.stringify({ error: 'Category not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } else {
      // Return all categories and their templates
      const allTemplates = getAllTemplates();
      const categories = Object.keys(allTemplates).map(key => ({
        name: key,
        count: Object.keys(allTemplates[key as keyof typeof allTemplates]).length
      }));
      
      return new Response(JSON.stringify({ categories }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error in templates API:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}