'use client';

import { useState, useEffect } from 'react';
import { Button } from './Button';

interface HistoryItem {
  id: string;
  prompt: string;
  code: string;
  timestamp: Date;
}

interface HistoryPanelProps {
  onRestore: (item: HistoryItem) => void;
  onClose: () => void;
}

export const HistoryPanel = ({ onRestore, onClose }: HistoryPanelProps) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    // Load history from localStorage
    const saved = localStorage.getItem('freev-history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHistory(parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        })));
      } catch (e) {
        console.error('Failed to parse history:', e);
      }
    }
  }, []);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('freev-history');
  };

  const deleteItem = (id: string) => {
    const filtered = history.filter(item => item.id !== id);
    setHistory(filtered);
    localStorage.setItem('freev-history', JSON.stringify(filtered));
  };

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white border-l shadow-lg z-50 flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">History</h2>
        <div className="flex gap-2">
          {history.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearHistory}>
              Clear
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        {history.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No history yet. Generated components will appear here.
          </p>
        ) : (
          <div className="space-y-3">
            {history.map(item => (
              <div 
                key={item.id} 
                className="border rounded-lg p-3 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium truncate flex-1">
                    {item.prompt.substring(0, 40)}{item.prompt.length > 40 ? '...' : ''}
                  </p>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-gray-400 hover:text-red-500 ml-2"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {item.timestamp.toLocaleString()}
                </p>
                <div className="flex gap-2 mt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onRestore(item)}
                    className="flex-1"
                  >
                    Restore
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(item.code)}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};