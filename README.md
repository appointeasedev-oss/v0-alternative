# FreeV - A Complete Free Alternative to V0.dev

<div align="center">

![FreeV Logo](https://via.placeholder.com/200x60?text=FreeV)

**Build amazing applications with AI - completely free, forever.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

</div>

## 🎯 Overview

FreeV is a comprehensive, completely free alternative to V0.dev that provides AI-powered application and website generation with **no usage costs, no API key requirements for basic functionality, and unlimited generation**.

Transform your ideas into working React components, complete pages, and full applications using natural language prompts - all without spending a penny.

## ✨ Features

### Core Functionality
- 🤖 **AI-Powered Generation** - Describe what you want in plain English and get working code
- 👁️ **Real-time Preview** - See your generated components instantly in a live preview
- 📝 **Code Editor** - Full code editor with syntax highlighting
- 🎨 **Visual Builder** - Drag-and-drop interface for non-coders
- 📁 **Template Gallery** - Pre-built templates to get started quickly
- 📚 **Component Library** - Buttons, cards, forms, navigation, and more
- 💾 **Project Management** - Save and organize your projects locally
- 📜 **Generation History** - Access and restore previous generations
- 📤 **Export Options** - Copy code, download files, or export as ZIP

### Supported Output Formats
- React (Next.js, TypeScript)
- Vue
- Svelte
- Plain HTML

### AI Providers (All Free)
- OpenRouter (multiple free models)
- HuggingFace Inference API (free tier)
- Ollama (local models)
- Anthropic Claude (free tier)
- Google Gemini (free tier)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/freev.git
cd freev

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to start building!

### Environment Setup

Create a `.env.local` file with any API keys you want to use:

```env
# Optional - add keys for enhanced AI capabilities
OPENROUTER_API_KEY=your_key_here
HUGGINGFACE_API_KEY=your_key_here
ANTHROPIC_API_KEY=your_key_here
GOOGLE_API_KEY=your_key_here
```

**Note:** The app works without API keys using built-in templates and mock generation!

## 📁 Project Structure

```
freev/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── generate/         # Component generation endpoint
│   │   ├── projects/         # Project management
│   │   └── templates/       # Template library API
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main application page
├── components/               # Reusable UI components
│   ├── AISettingsPanel.tsx  # AI provider configuration
│   ├── Button.tsx           # Button component
│   ├── CodeEditor.tsx       # Code editor
│   ├── ExportModal.tsx      # Export options
│   ├── HistoryPanel.tsx     # Generation history
│   ├── Layout.tsx           # Main layout wrapper
│   ├── PreviewPane.tsx      # Live preview
│   ├── ProjectPanel.tsx     # Project management
│   ├── PromptInput.tsx      # AI prompt input
│   ├── TemplateGallery.tsx # Template browser
│   ├── Toolbar.tsx         # Editor toolbar
│   └── VisualEditor.tsx     # Drag-and-drop builder
├── config/                  # Configuration
│   └── ai-providers.ts     # AI provider settings
├── lib/                     # Utilities
│   └── utils.ts            # Common utilities
├── styles/                  # Stylesheets
│   └── globals.css         # Global styles
├── utils/                   # Business logic
│   ├── ai-service.ts       # AI integration
│   ├── component-generator.ts  # Code generation
│   ├── project-manager.ts  # Project persistence
│   └── template-library.ts # Pre-built templates
├── .env.example            # Environment template
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── SETUP.md
├── ARCHITECTURE.md
└── tailwind.config.js
```

## 🎨 Usage

### Generate Components with AI

Simply describe what you want:

```
"Create a login form with email and password fields"
"Build a dashboard with statistics cards"
"Make a responsive navbar with mobile menu"
"Design a product card with image, title, and price"
```

### Use Templates

1. Click "Templates" in the header
2. Browse categories (Buttons, Cards, Forms, Navigation, etc.)
3. Click a template to load it
4. Customize as needed

### Visual Builder

1. Switch to "Visual Editor" tab
2. Drag elements from the left palette
3. Customize properties in the right panel
4. Export your creation

### Manage Projects

1. Click "Projects" to open the panel
2. Create new projects to organize your work
3. Load and edit previous projects
4. Delete projects you no longer need

### Export Options

- **Copy to Clipboard** - Quick copy for immediate use
- **Download File** - Save as .tsx, .vue, .svelte, or .html
- **Download ZIP** - Complete package with all files

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI primitives
- **Icons:** Lucide React
- **State Management:** Zustand
- **AI Integration:** Multiple free providers supported

## 📦 Dependencies

### Core
- `next` - React framework
- `react` / `react-dom` - UI library
- `typescript` - Type safety

### UI
- `@radix-ui/*` - Accessible component primitives
- `class-variance-authority` - Component variants
- `clsx` / `tailwind-merge` - Class utilities
- `tailwindcss-animate` - Animation utilities
- `lucide-react` - Icon library

### State & Utilities
- `zustand` - State management

## 🔧 Configuration

### AI Providers

FreeV supports multiple AI providers. Edit `config/ai-providers.ts` to customize:

```typescript
export const FREE_AI_PROVIDERS: AIProviderConfig[] = [
  { name: 'OpenRouter', baseUrl: '...', enabled: true },
  { name: 'HuggingFace', baseUrl: '...', enabled: true },
  { name: 'Ollama', baseUrl: 'http://localhost:11434', enabled: true },
  // Add or modify providers
];
```

### Component Templates

Add custom templates in `utils/template-library.ts`:

```typescript
export const TEMPLATE_LIBRARY = {
  custom: {
    myTemplate: `// Your custom template code`
  }
};
```

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build for production
npm run build

# Deploy the .next folder
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vercel](https://vercel.com) - For the amazing V0.dev that inspired this project
- [Tailwind CSS](https://tailwindcss.com) - For the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com) - For accessible component primitives
- [Next.js](https://nextjs.org) - For the React framework
- [All AI Providers](#-ai-providers-all-free) - For making AI accessible

---

<div align="center">

**Made with ❤️ by the FreeV Team**

[Report Bug](https://github.com/yourusername/freev/issues) · [Request Feature](https://github.com/yourusername/freev/issues)

</div>