'use client';

import { useState } from 'react';
import { Button } from './Button';

interface ExportModalProps {
  code: string;
  onClose: () => void;
}

export const ExportModal = ({ code, onClose }: ExportModalProps) => {
  const [format, setFormat] = useState<'react' | 'vue' | 'svelte' | 'html'>('react');
  const [exportStatus, setExportStatus] = useState<'idle' | 'copying' | 'downloading'>('idle');

  const copyToClipboard = async () => {
    setExportStatus('copying');
    try {
      await navigator.clipboard.writeText(code);
      // Success feedback could be added here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    setExportStatus('idle');
  };

  const downloadFile = () => {
    setExportStatus('downloading');
    const extensions: Record<string, string> = {
      react: 'tsx',
      vue: 'vue',
      svelte: 'svelte',
      html: 'html'
    };
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FreeV-generated-component.${extensions[format]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setExportStatus('idle');
  };

  const downloadZip = async () => {
    // In a real implementation, this would create a zip file with all necessary files
    alert('ZIP download would include:\n- Component file\n- Dependencies list\n- README instructions');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Export Component</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Export Format</label>
          <div className="flex gap-2">
            {(['react', 'vue', 'svelte', 'html'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`px-4 py-2 rounded border ${
                  format === f 
                    ? 'bg-blue-100 border-blue-500 text-blue-700' 
                    : 'hover:bg-gray-100'
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Preview</label>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded text-sm max-h-60 overflow-auto">
            {code.substring(0, 1000)}{code.length > 1000 && '...'}
          </pre>
          <p className="text-xs text-gray-500 mt-2">
            {code.length > 1000 ? 'Preview truncated. Full code in export.' : `${code.length} characters`}
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={copyToClipboard}
            disabled={exportStatus === 'copying'}
            className="flex-1"
          >
            {exportStatus === 'copying' ? 'Copying...' : 'Copy to Clipboard'}
          </Button>
          <Button 
            onClick={downloadFile}
            disabled={exportStatus === 'downloading'}
            className="flex-1"
          >
            {exportStatus === 'downloading' ? 'Downloading...' : 'Download File'}
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          onClick={downloadZip}
          className="w-full mt-3"
        >
          Download as ZIP Package
        </Button>
      </div>
    </div>
  );
};