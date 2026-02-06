'use client';

import { useState, useCallback } from 'react';
import { Button } from './Button';

interface VisualEditorProps {
  code: string;
  onChange: (code: string) => void;
}

export const VisualEditor = ({ code, onChange }: VisualEditorProps) => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [properties, setProperties] = useState<Record<string, any>>({});

  const elements = [
    { type: 'container', label: 'Container', icon: '📦' },
    { type: 'text', label: 'Text', icon: '📝' },
    { type: 'image', label: 'Image', icon: '🖼️' },
    { type: 'button', label: 'Button', icon: '🔘' },
    { type: 'input', label: 'Input', icon: '📥' },
    { type: 'card', label: 'Card', icon: '📇' },
    { type: 'flex', label: 'Flex Layout', icon: '🔲' },
    { type: 'grid', label: 'Grid Layout', icon: '▦' },
  ];

  const handleDragStart = (e: React.DragEvent, elementType: string) => {
    e.dataTransfer.setData('elementType', elementType);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const elementType = e.dataTransfer.getData('elementType');
    
    if (elementType) {
      const newElement = {
        id: `element-${Date.now()}`,
        type: elementType,
        props: getDefaultProps(elementType)
      };
      
      // Add element to code (simplified - in real implementation, would parse and update AST)
      const elementCode = generateElementCode(elementType, newElement.props);
      onChange(code + '\n' + elementCode);
    }
  }, [code, onChange]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const updateProperty = (property: string, value: any) => {
    const updated = { ...properties, [property]: value };
    setProperties(updated);
    // Would update the selected element's props here
  };

  return (
    <div className="h-full flex border rounded-lg overflow-hidden">
      {/* Element Palette */}
      <div className="w-48 border-r bg-gray-50 p-3">
        <h3 className="font-medium text-sm mb-3">Elements</h3>
        <div className="grid grid-cols-2 gap-2">
          {elements.map(element => (
            <div
              key={element.type}
              draggable
              onDragStart={(e) => handleDragStart(e, element.type)}
              className="p-2 bg-white border rounded cursor-grab hover:shadow-md text-center text-xs"
            >
              <div className="text-lg">{element.icon}</div>
              <div className="mt-1">{element.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Canvas Area */}
      <div 
        className="flex-1 bg-white p-4"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {code ? (
          <div className="h-full">
            <pre className="text-sm overflow-auto h-full">{code}</pre>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="text-4xl mb-2">🎨</div>
              <p>Drag elements here to build your component</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Properties Panel */}
      <div className="w-64 border-l bg-gray-50 p-3">
        <h3 className="font-medium text-sm mb-3">Properties</h3>
        
        {selectedElement ? (
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500">Element Type</label>
              <p className="text-sm font-medium capitalize">{selectedElement}</p>
            </div>
            
            <div>
              <label className="text-xs text-gray-500">Padding</label>
              <input
                type="text"
                value={properties.padding || ''}
                onChange={(e) => updateProperty('padding', e.target.value)}
                placeholder="e.g., 16px"
                className="w-full mt-1 px-2 py-1 border rounded text-sm"
              />
            </div>
            
            <div>
              <label className="text-xs text-gray-500">Margin</label>
              <input
                type="text"
                value={properties.margin || ''}
                onChange={(e) => updateProperty('margin', e.target.value)}
                placeholder="e.g., 8px"
                className="w-full mt-1 px-2 py-1 border rounded text-sm"
              />
            </div>
            
            <div>
              <label className="text-xs text-gray-500">Background Color</label>
              <input
                type="color"
                value={properties.backgroundColor || '#ffffff'}
                onChange={(e) => updateProperty('backgroundColor', e.target.value)}
                className="w-full mt-1 h-8"
              />
            </div>
            
            <div>
              <label className="text-xs text-gray-500">Border Radius</label>
              <input
                type="text"
                value={properties.borderRadius || ''}
                onChange={(e) => updateProperty('borderRadius', e.target.value)}
                placeholder="e.g., 8px"
                className="w-full mt-1 px-2 py-1 border rounded text-sm"
              />
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Select an element on the canvas to edit its properties.
          </p>
        )}
      </div>
    </div>
  );
};

function getDefaultProps(type: string): Record<string, any> {
  const defaults: Record<string, Record<string, any>> = {
    container: { padding: '16px' },
    text: { content: 'Text content', fontSize: '16px' },
    button: { label: 'Button', variant: 'primary' },
    input: { placeholder: 'Enter text...', type: 'text' },
    card: { padding: '16px' },
  };
  return defaults[type] || {};
}

function generateElementCode(type: string, props: Record<string, any>): string {
  const generators: Record<string, (props: Record<string, any>) => string> = {
    container: (p) => `<div className="p-${p.padding || '4'}">Content</div>`,
    text: (p) => `<p className="text-${p.fontSize || 'base'}">${p.content || 'Text'}</p>`,
    button: (p) => `<button className="px-4 py-2 bg-blue-500 text-white rounded">${p.label || 'Button'}</button>`,
    input: (p) => `<input type="${p.type || 'text'}" placeholder="${p.placeholder || ''}" className="border p-2 rounded" />`,
    card: (p) => `<div className="p-${p.padding || '4'} border rounded shadow">Card Content</div>`,
  };
  
  return generators[type] ? generators[type](props) : `<div>${type}</div>`;
}