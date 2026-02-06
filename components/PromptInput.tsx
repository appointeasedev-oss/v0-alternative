'use client';

import { useState } from 'react';
import { Button } from './Button';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export const PromptInput = ({ onSubmit, isLoading }: PromptInputProps) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the component or app you want to create..."
          className="w-full h-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={isLoading || !prompt.trim()}>
            {isLoading ? 'Generating...' : 'Generate'}
          </Button>
        </div>
      </form>
    </div>
  );
};