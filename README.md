# FreeV - AI Component Generator

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black" alt="Next.js">
  <img src="https://img.shields.io/badge/React-18-blue" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.2-blue" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-3.3-38bdf8" alt="Tailwind">
</p>

<p align="center">
  <strong>Generate React components with AI - 100% free, no usage limits</strong>
</p>

## ✨ Features

- 🤖 **AI-Powered Generation** - Describe what you want, get working React code
- 🎨 **Tailwind CSS** - Beautiful, responsive styling by default
- ⚡ **Real-Time Preview** - See your components instantly
- 📦 **Multiple Formats** - React, Vue, Svelte, HTML support
- 🔑 **Free AI Providers** - OpenRouter, Anthropic, Groq, Gemini
- 💾 **History** - Never lose your generations
- 📤 **Export** - Copy or download your code

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/appointeasedev-oss/v0-alternative.git
cd v0-alternative

# Install dependencies
npm install

# Set up environment variables (optional - works without!)
cp .env.example .env.local

# Start development server
npm run dev
```

Visit **http://localhost:3000**

## 🔑 API Keys (Optional)

The app works without API keys using intelligent templates. For full AI power, add keys:

```env
# OpenRouter (Recommended - multiple free models)
OPENROUTER_API_KEY=your_key

# Anthropic (Free tier)
ANTHROPIC_API_KEY=your_key

# Groq (Fast free inference)
GROQ_API_KEY=your_key

# Google Gemini (Free tier)
GOOGLE_API_KEY=your_key
```

## 💡 Usage Examples

```
"Create a modern login form with email and password"
"Build a dashboard with statistics cards"
"Design a responsive navigation bar"
"Create a product card with image and price"
"Build a modal dialog with confirm/cancel"
```

## 🏗️ Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **AI Providers** - OpenRouter, Anthropic, Groq, Gemini

## 📁 Project Structure

```
├── app/
│   ├── api/generate/    # AI generation API
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main UI
├── lib/
│   └── ai-service.ts    # AI integration
├── styles/
│   └── globals.css      # Global styles
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎯 Supported AI Providers

| Provider | Free Tier | Models |
|----------|-----------|--------|
| OpenRouter | ✅ Yes | Claude, Llama, Mistral |
| Anthropic | ✅ Yes | Claude 3 Haiku |
| Groq | ✅ Yes | Llama 3, Mixtral |
| Gemini | ✅ Yes | Gemini Pro |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use for any purpose.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/appointeasedev-oss">AppointEase Dev</a>
</p>
