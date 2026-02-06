// Configuration for AI providers in FreeV
// This allows switching between different AI services

export interface AIProviderConfig {
  name: string;
  apiKey?: string;
  baseUrl?: string;
  model?: string;
  enabled: boolean;
}

// Free AI providers configuration
export const FREE_AI_PROVIDERS: AIProviderConfig[] = [
  {
    name: 'OpenRouter',
    baseUrl: 'https://openrouter.ai/api/v1',
    model: 'openrouter/auto', // Auto-selects best performing model
    enabled: true
  },
  {
    name: 'HuggingFace',
    baseUrl: 'https://api-inference.huggingface.co/models',
    model: 'mistralai/Mistral-7B-Instruct-v0.1',
    enabled: true
  },
  {
    name: 'Ollama',
    baseUrl: 'http://localhost:11434/api',
    model: 'llama3',
    enabled: true // Only enabled if Ollama is installed locally
  },
  {
    name: 'Anthropic Claude (Free tier)',
    baseUrl: 'https://api.anthropic.com/v1',
    model: 'claude-3-haiku-20240307',
    enabled: true
  },
  {
    name: 'Google Gemini (Free tier)',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    model: 'gemini-pro',
    enabled: true
  }
];

// Currently active provider (defaulting to the first free option)
let activeProvider: AIProviderConfig = FREE_AI_PROVIDERS.find(p => p.enabled) || FREE_AI_PROVIDERS[0];

export const getActiveProvider = (): AIProviderConfig => {
  return activeProvider;
};

export const setActiveProvider = (providerName: string): boolean => {
  const provider = FREE_AI_PROVIDERS.find(p => p.name === providerName && p.enabled);
  if (provider) {
    activeProvider = provider;
    return true;
  }
  return false;
};

// Mock provider for development/testing
export const MOCK_PROVIDER: AIProviderConfig = {
  name: 'Mock Provider',
  enabled: true
};

// Function to initialize the best available provider
export const initializeProvider = (): AIProviderConfig => {
  // In a real implementation, we would test connectivity to each provider
  // and select the best performing one
  
  // For now, return the first enabled provider
  return FREE_AI_PROVIDERS.find(p => p.enabled) || MOCK_PROVIDER;
};