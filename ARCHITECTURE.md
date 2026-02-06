# FreeV Architecture

This document outlines the architecture of FreeV, a completely free alternative to V0.dev.

## Overview

FreeV follows a modern Next.js 14 architecture with App Router, leveraging server components where appropriate and client components for interactive features.

## Directory Structure

```
v0-free-alternative/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   └── generate/      # Component generation endpoint
│   └── page.tsx           # Main application page
├── components/            # Reusable UI components
├── config/                # Configuration files
├── lib/                   # Utility functions
├── styles/                # Global styles
├── utils/                 # Business logic utilities
│   ├── ai-service.ts      # AI service abstraction
│   ├── component-generator.ts # Component generation logic
└── public/                # Static assets
```

## Core Components

### 1. Main Application (app/page.tsx)
- Provides the main UI with three panes:
  - Prompt input panel (left)
  - Preview pane (top-right)
  - Code editor (bottom-right)
- Handles user interactions and coordinates with backend services

### 2. AI Service Layer (utils/ai-service.ts)
- Abstracts AI provider interactions
- Handles component and page generation
- Manages different AI providers (OpenRouter, HuggingFace, Ollama, etc.)

### 3. Component Generator (utils/component-generator.ts)
- Generates specific UI components based on user requirements
- Supports various component types (buttons, cards, forms, etc.)
- Outputs code in multiple frameworks (React, Vue, Svelte, HTML)

### 4. API Route (app/api/generate/route.ts)
- Handles component generation requests
- Interfaces with AI providers
- Returns generated code to the frontend

## AI Provider Abstraction

The application uses an abstraction layer for AI providers to ensure flexibility:

- `config/ai-providers.ts` defines available providers
- `utils/ai-service.ts` implements the provider interface
- Easy to swap or add new providers without changing core logic

## Data Flow

1. User enters a prompt in the input field
2. Prompt is sent to the `/api/generate` endpoint
3. The endpoint processes the prompt and determines component type
4. AI service generates the component code
5. Generated code is returned to the frontend
6. Code is displayed in the editor and rendered in the preview pane

## Styling

- Uses Tailwind CSS for utility-first styling
- Implements a design system approach with consistent spacing and colors
- Responsive design for different screen sizes

## Extensibility

The architecture is designed to be extensible:

- New component types can be added to the generator
- Additional AI providers can be integrated
- UI components can be customized
- Export formats can be extended

## Future Enhancements

Potential areas for expansion:
- GitHub integration for direct commits
- Template library
- Component sharing capabilities
- Advanced styling options
- Multi-language support
- Plugin system