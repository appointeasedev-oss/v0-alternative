'use client';

import { Button } from './Button';
import { 
  Bold, Italic, Underline, Code, 
  AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, Image, Link,
  Undo, Redo, Save, Download, Copy
} from 'lucide-react';

interface ToolbarProps {
  onAction: (action: string) => void;
}

export const Toolbar = ({ onAction }: ToolbarProps) => {
  const tools = [
    { icon: Undo, action: 'undo', label: 'Undo' },
    { icon: Redo, action: 'redo', label: 'Redo' },
    { divider: true },
    { icon: Bold, action: 'bold', label: 'Bold' },
    { icon: Italic, action: 'italic', label: 'Italic' },
    { icon: Underline, action: 'underline', label: 'Underline' },
    { icon: Code, action: 'code', label: 'Code' },
    { divider: true },
    { icon: AlignLeft, action: 'align-left', label: 'Align Left' },
    { icon: AlignCenter, action: 'align-center', label: 'Align Center' },
    { icon: AlignRight, action: 'align-right', label: 'Align Right' },
    { divider: true },
    { icon: List, action: 'list', label: 'Bullet List' },
    { icon: ListOrdered, action: 'ordered-list', label: 'Numbered List' },
    { divider: true },
    { icon: Link, action: 'link', label: 'Insert Link' },
    { icon: Image, action: 'image', label: 'Insert Image' },
  ];

  return (
    <div className="flex items-center gap-1 p-2 border-b bg-white">
      {tools.map((tool, index) => (
        tool.divider ? (
          <div key={`divider-${index}`} className="w-px h-6 bg-gray-300 mx-1" />
        ) : (
          <Button
            key={tool.action}
            variant="ghost"
            size="icon"
            onClick={() => onAction(tool.action)}
            title={tool.label}
          >
            <tool.icon className="w-4 h-4" />
          </Button>
        )
      ))}
      <div className="flex-1" />
      <Button variant="ghost" size="sm" onClick={() => onAction('copy')}>
        <Copy className="w-4 h-4 mr-1" />
        Copy
      </Button>
      <Button variant="ghost" size="sm" onClick={() => onAction('save')}>
        <Save className="w-4 h-4 mr-1" />
        Save
      </Button>
      <Button variant="ghost" size="sm" onClick={() => onAction('download')}>
        <Download className="w-4 h-4 mr-1" />
        Export
      </Button>
    </div>
  );
};