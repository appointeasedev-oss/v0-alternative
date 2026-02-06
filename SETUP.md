# FreeV Setup Guide

FreeV is a completely free alternative to V0.dev that provides AI-powered component and application generation.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git (optional, for cloning)

## Installation

1. Clone or download the repository:
```bash
git clone <repository-url>
cd freev
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following:

```env
# AI Provider Configuration
OPENROUTER_API_KEY=your_openrouter_api_key
HUGGINGFACE_API_KEY=your_huggingface_api_key
OLLAMA_HOST=http://localhost:11434
ANTHROPIC_API_KEY=your_anthropic_api_key
GOOGLE_API_KEY=your_google_api_key
```

Note: Many AI providers offer free tiers. You can also run open-source models locally with Ollama.

## Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Configuration

The application supports multiple AI providers. You can configure which provider to use by modifying `config/ai-providers.ts`.

Currently supported providers:
- OpenRouter (with free tier options)
- Hugging Face (with free inference API)
- Ollama (local models)
- Anthropic Claude (with free tier)
- Google Gemini (with free tier)

## Features

- AI-powered component generation
- Real-time preview
- Code editor with syntax highlighting
- Support for multiple frameworks (React, Vue, Svelte, HTML)
- Component library with various UI patterns
- Export capabilities
- Version control integration

## Customization

To customize the UI components:
1. Modify components in the `/components` directory
2. Adjust styling in `styles/globals.css`
3. Update the component generator in `/utils/component-generator.ts`

## Deployment

FreeV can be deployed to any platform that supports Next.js applications:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Google Cloud Run
- Any Node.js hosting service

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.