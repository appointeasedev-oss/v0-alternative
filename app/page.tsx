'use client';

import { useState, useCallback, useEffect } from 'react';
import { 
  Sparkles, Code, Eye, Layout, Download, Copy, History, 
  Settings, ChevronRight, Zap, FileCode, Palette, RefreshCw
} from 'lucide-react';
import { generateComponent, GenerationRequest, getAvailableProviders } from '@/lib/ai-service';

type ViewMode = 'split' | 'preview' | 'code';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [availableProviders, setAvailableProviders] = useState<string[]>([]);
  const [activeProvider, setActiveProvider] = useState<string>('');
  const [history, setHistory] = useState<Array<{prompt: string; code: string; timestamp: Date}>>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    setAvailableProviders(getAvailableProviders());
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || isGenerating) return;
    
    setIsGenerating(true);
    try {
      const result = await generateComponent({
        prompt,
        framework: 'react',
        mode: prompt.toLowerCase().includes('page') || prompt.toLowerCase().includes('full') ? 'page' : 'component'
      });
      
      if (result.success) {
        setGeneratedCode(result.code);
        setHistory(prev => [{ prompt, code: result.code, timestamp: new Date() }, ...prev].slice(0, 20));
      } else {
        alert(`Generation failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, isGenerating]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(generatedCode);
  }, [generatedCode]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([generatedCode], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'FreeV-Generated-Component.tsx';
    a.click();
    URL.revokeObjectURL(url);
  }, [generatedCode]);

  const loadFromHistory = useCallback((entry: {prompt: string; code: string}) => {
    setPrompt(entry.prompt);
    setGeneratedCode(entry.code);
    setShowHistory(false);
  }, []);

  const examples = [
    'Create a modern login form',
    'Build a dashboard with stats cards',
    'Design a responsive navbar',
    'Create a product card',
    'Build a modal dialog',
    'Create a pricing table',
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">FreeV</h1>
              <p className="text-xs text-gray-400">AI Component Generator</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-4">
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                viewMode === 'split' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2"><Code className="w-4 h-4" /> Split</span>
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                viewMode === 'preview' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2"><Eye className="w-4 h-4" /> Preview</span>
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                viewMode === 'code' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2"><FileCode className="w-4 h-4" /> Code</span>
            </button>
          </nav>

          <div className="flex items-center gap-2">
            {availableProviders.length > 0 && (
              <select
                value={activeProvider}
                onChange={(e) => setActiveProvider(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm"
              >
                <option value="">Auto</option>
                {availableProviders.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            )}
            <button
              onClick={() => setShowHistory(true)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="History"
            >
              <History className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {/* Prompt Section */}
        <div className="border-b border-gray-800 bg-gray-900/30">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the component you want to build..."
                className="w-full h-24 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="absolute bottom-3 right-3 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-sm hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Generate
                  </>
                )}
              </button>
            </div>
            
            {/* Quick Examples */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs text-gray-500">Try:</span>
              {examples.map((example) => (
                <button
                  key={example}
                  onClick={() => setPrompt(example)}
                  className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700 transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="h-[calc(100vh-280px)] overflow-hidden">
          {(viewMode === 'split' || viewMode === 'code') && (
            <div className={`${viewMode === 'split' ? 'h-1/2 border-b border-gray-800' : 'h-full'} overflow-auto`}>
              <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-4 py-2 flex items-center justify-between">
                <span className="text-sm text-gray-400">Generated Code</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-1.5 text-gray-400 hover:text-white transition-colors"
                    title="Copy"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleDownload}
                    className="p-1.5 text-gray-400 hover:text-white transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <pre className="p-4 text-sm font-mono overflow-auto">
                <code>{generatedCode || '// Your generated code will appear here'}</code>
              </pre>
            </div>
          )}
          
          {(viewMode === 'split' || viewMode === 'preview') && (
            <div className={`${viewMode === 'split' ? 'h-1/2' : 'h-full'} overflow-auto bg-gray-100`}>
              <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-4 py-2">
                <span className="text-sm text-gray-400">Live Preview</span>
              </div>
              <div className="p-8">
                {generatedCode ? (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <PreviewRenderer code={generatedCode} />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 text-gray-400">
                    <div className="text-center">
                      <Eye className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Your preview will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowHistory(false)}>
          <div className="bg-gray-900 rounded-xl w-full max-w-lg max-h-[60vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <h2 className="font-semibold">Generation History</h2>
              <button onClick={() => setShowHistory(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <div className="overflow-auto max-h-96">
              {history.length === 0 ? (
                <p className="p-4 text-gray-400 text-center">No history yet</p>
              ) : (
                history.map((entry, i) => (
                  <button
                    key={i}
                    onClick={() => loadFromHistory(entry)}
                    className="w-full p-4 text-left hover:bg-gray-800 border-b border-gray-800 transition-colors"
                  >
                    <p className="text-sm text-gray-300 truncate">{entry.prompt}</p>
                    <p className="text-xs text-gray-500 mt-1">{entry.timestamp.toLocaleString()}</p>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple preview renderer
function PreviewRenderer({ code }: { code: string }) {
  // This is a simplified preview - in production, you'd use a proper sandbox
  const isReactCode = code.includes('import React') || code.includes('from "react"') || code.includes("from 'react'");
  
  if (!isReactCode) {
    return <pre className="text-sm text-gray-600">{code}</pre>;
  }

  // Extract the component name or use a default
  const componentMatch = code.match(/export\s+(?:default\s+)?function\s+(\w+)/);
  const componentName = componentMatch ? componentMatch[1] : 'Component';

  return (
    <div className="text-center text-gray-500 py-8">
      <p className="mb-2">📦 {componentName}</p>
      <p className="text-xs">React component ready to use</p>
      <p className="text-xs mt-2 text-gray-400">Copy code to use in your project</p>
    </div>
  );
}
