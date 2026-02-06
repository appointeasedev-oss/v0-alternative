'use client';

import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { PromptInput } from '@/components/PromptInput';
import { PreviewPane } from '@/components/PreviewPane';
import { CodeEditor } from '@/components/CodeEditor';
import { Toolbar } from '@/components/Toolbar';
import { AISettingsPanel } from '@/components/AISettingsPanel';
import { TemplateGallery } from '@/components/TemplateGallery';
import { HistoryPanel } from '@/components/HistoryPanel';
import { ExportModal } from '@/components/ExportModal';
import { ProjectPanel } from '@/components/ProjectPanel';
import { VisualEditor } from '@/components/VisualEditor';
import { generateComponent, generatePage } from '@/utils/ai-service';
import { Button } from '@/components/Button';
import { History, Folder, Palette, Download, Play, FileCode } from 'lucide-react';

export default function HomePage() {
  // State management
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'prompt' | 'visual'>('prompt');
  const [showHistory, setShowHistory] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'preview' | 'code'>('split');

  // History management
  const [history, setHistory] = useState<Array<{
    id: string;
    prompt: string;
    code: string;
    timestamp: Date;
  }>>([]);

  const handlePromptSubmit = async (prompt: string) => {
    setIsGenerating(true);
    try {
      const isPage = prompt.toLowerCase().includes('page') || 
                     prompt.toLowerCase().includes('full') ||
                     prompt.toLowerCase().includes('entire');
      
      let result;
      if (isPage) {
        result = await generatePage(prompt);
      } else {
        result = await generateComponent({ prompt, framework: 'react' });
      }
      
      if (result.success) {
        setGeneratedCode(result.code);
        addToHistory(prompt, result.code);
      }
    } catch (error) {
      console.error('Error generating code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const addToHistory = (prompt: string, code: string) => {
    const newEntry = {
      id: `history-${Date.now()}`,
      prompt,
      code,
      timestamp: new Date()
    };
    
    const updated = [newEntry, ...history].slice(0, 50); // Keep last 50 entries
    setHistory(updated);
    localStorage.setItem('freev-history', JSON.stringify(updated));
  };

  const loadFromHistory = (entry: { prompt: string; code: string }) => {
    setGeneratedCode(entry.code);
    setShowHistory(false);
  };

  const handleToolbarAction = (action: string) => {
    switch (action) {
      case 'copy':
        navigator.clipboard.writeText(generatedCode);
        break;
      case 'save':
        // Save to localStorage
        localStorage.setItem('freev-autosave', generatedCode);
        break;
      case 'download':
        setShowExport(true);
        break;
      default:
        console.log('Toolbar action:', action);
    }
  };

  const handleTemplateSelect = (template: any) => {
    // In a real implementation, this would load the template
    setGeneratedCode(`// Template: ${template.name}\n${template.preview}`);
    setShowTemplates(false);
  };

  return (
    <Layout>
      {/* Header */}
      <header className="bg-white border-b px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-gray-800">FreeV</h1>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            Free V0.dev Alternative
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant={activeTab === 'prompt' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setActiveTab('prompt')}
          >
            <FileCode className="w-4 h-4 mr-1" />
            AI Prompt
          </Button>
          <Button 
            variant={activeTab === 'visual' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setActiveTab('visual')}
          >
            <Palette className="w-4 h-4 mr-1" />
            Visual Editor
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setShowProjects(true)}>
            <Folder className="w-4 h-4 mr-1" />
            Projects
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowTemplates(true)}>
            Templates
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowHistory(true)}>
            <History className="w-4 h-4 mr-1" />
            History
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowExport(true)}>
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
        </div>
      </header>
      
      {/* AI Settings */}
      <AISettingsPanel />
      
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'prompt' ? (
          <div className="flex h-full">
            {/* Left Panel - Prompt Input */}
            <div className="w-1/3 border-r flex flex-col">
              <div className="p-4 border-b bg-gray-50">
                <h2 className="font-medium">Describe what you want to build</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Be specific about components, layout, and functionality
                </p>
              </div>
              <div className="flex-1 p-4">
                <PromptInput 
                  onSubmit={handlePromptSubmit} 
                  isLoading={isGenerating} 
                />
              </div>
              {/* Quick Examples */}
              <div className="p-4 border-t bg-gray-50">
                <p className="text-xs text-gray-500 mb-2">Try asking for:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Create a login form',
                    'Build a dashboard',
                    'Make a navbar',
                    'Design a card component'
                  ].map(example => (
                    <button
                      key={example}
                      onClick={() => handlePromptSubmit(example)}
                      className="text-xs px-2 py-1 bg-white border rounded hover:bg-gray-100"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Panel - Preview & Code */}
            <div className="w-2/3 flex flex-col">
              {/* View Mode Toggle */}
              <div className="flex border-b bg-gray-50">
                <button
                  onClick={() => setViewMode('split')}
                  className={`px-4 py-2 text-sm ${viewMode === 'split' ? 'bg-white border-b-2 border-blue-500' : ''}`}
                >
                  Split View
                </button>
                <button
                  onClick={() => setViewMode('preview')}
                  className={`px-4 py-2 text-sm ${viewMode === 'preview' ? 'bg-white border-b-2 border-blue-500' : ''}`}
                >
                  Preview Only
                </button>
                <button
                  onClick={() => setViewMode('code')}
                  className={`px-4 py-2 text-sm ${viewMode === 'code' ? 'bg-white border-b-2 border-blue-500' : ''}`}
                >
                  Code Only
                </button>
              </div>
              
              <div className="flex-1 flex overflow-hidden">
                {(viewMode === 'split' || viewMode === 'preview') && (
                  <div className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} border-r overflow-auto`}>
                    <div className="sticky top-0 bg-white border-b px-2 py-1 text-xs text-gray-500">
                      Preview
                    </div>
                    <PreviewPane code={generatedCode} />
                  </div>
                )}
                
                {(viewMode === 'split' || viewMode === 'code') && (
                  <div className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} overflow-auto`}>
                    <Toolbar onAction={handleToolbarAction} />
                    <CodeEditor 
                      code={generatedCode} 
                      onChange={setGeneratedCode} 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Visual Editor Tab */
          <div className="h-full p-4">
            <VisualEditor code={generatedCode} onChange={setGeneratedCode} />
          </div>
        )}
      </div>
      
      {/* Modals */}
      {showHistory && (
        <HistoryPanel 
          onRestore={loadFromHistory} 
          onClose={() => setShowHistory(false)} 
        />
      )}
      
      {showTemplates && (
        <TemplateGallery
          onSelect={handleTemplateSelect}
          onClose={() => setShowTemplates(false)}
        />
      )}
      
      {showProjects && (
        <ProjectPanel
          onSelectProject={(project) => {
            console.log('Selected project:', project);
            setShowProjects(false);
          }}
          onClose={() => setShowProjects(false)}
        />
      )}
      
      {showExport && (
        <ExportModal
          code={generatedCode}
          onClose={() => setShowExport(false)}
        />
      )}
      
      {/* Loading Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="font-medium">Generating your component...</p>
            <p className="text-sm text-gray-500 mt-1">This may take a few seconds</p>
          </div>
        </div>
      )}
    </Layout>
  );
}