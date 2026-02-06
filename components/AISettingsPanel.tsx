'use client';

import { useState, useEffect } from 'react';
import { Button } from './Button';
import { FREE_AI_PROVIDERS, getActiveProvider, setActiveProvider } from '@/config/ai-providers';

export const AISettingsPanel = () => {
  const [activeProvider, setActiveProviderState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ai-provider') || getActiveProvider().name;
    }
    return getActiveProvider().name;
  });
  const [showSettings, setShowSettings] = useState(false);

  const handleProviderChange = (providerName: string) => {
    const success = setActiveProvider(providerName);
    if (success) {
      setActiveProviderState(providerName);
      localStorage.setItem('ai-provider', providerName);
    }
  };

  const availableProviders = FREE_AI_PROVIDERS.filter(provider => provider.enabled);

  return (
    <div className="absolute top-4 right-4 z-10">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => setShowSettings(!showSettings)}
      >
        AI Settings
      </Button>
      
      {showSettings && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-md shadow-lg p-4 z-20">
          <h3 className="font-medium mb-2">AI Provider Settings</h3>
          <p className="text-sm text-gray-600 mb-4">
            Select an AI provider for component generation. All options are free to use.
          </p>
          
          <div className="space-y-2">
            {availableProviders.map(provider => (
              <div 
                key={provider.name} 
                className={`flex items-center justify-between p-2 rounded ${
                  activeProvider === provider.name 
                    ? 'bg-blue-100 border border-blue-300' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <span className="text-sm">{provider.name}</span>
                <input
                  type="radio"
                  name="ai-provider"
                  checked={activeProvider === provider.name}
                  onChange={() => handleProviderChange(provider.name)}
                  className="ml-2"
                />
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-gray-500">
              Note: Some providers may require API keys for full functionality. 
              Providers marked as free offer generous free tiers.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};