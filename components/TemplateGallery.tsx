'use client';

import { useState } from 'react';
import { Button } from './Button';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: string;
}

const TEMPLATES: Template[] = [
  {
    id: 'button-primary',
    name: 'Primary Button',
    description: 'A primary action button with hover effects',
    category: 'Buttons',
    preview: '🟢'
  },
  {
    id: 'card-basic',
    name: 'Basic Card',
    description: 'A simple content card with title and description',
    category: 'Cards',
    preview: '📇'
  },
  {
    id: 'form-login',
    name: 'Login Form',
    description: 'Complete login form with email and password',
    category: 'Forms',
    preview: '🔐'
  },
  {
    id: 'navbar-responsive',
    name: 'Responsive Navbar',
    description: 'Navigation bar with mobile menu support',
    category: 'Navigation',
    preview: '🧭'
  },
  {
    id: 'hero-landing',
    name: 'Hero Section',
    description: 'Landing page hero with CTA buttons',
    category: 'Sections',
    preview: '🎯'
  },
  {
    id: 'dashboard-stats',
    name: 'Stats Dashboard',
    description: 'Dashboard with statistic cards',
    category: 'Dashboard',
    preview: '📊'
  },
  {
    id: 'modal-dialog',
    name: 'Modal Dialog',
    description: 'Reusable modal component',
    category: 'Overlays',
    preview: '🪟'
  },
  {
    id: 'table-data',
    name: 'Data Table',
    description: 'Table with sorting and pagination',
    category: 'Data Display',
    table: '📋'
  }
];

interface TemplateGalleryProps {
  onSelect: (template: Template) => void;
  onClose: () => void;
}

export const TemplateGallery = ({ onSelect, onClose }: TemplateGalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = ['All', ...new Set(TEMPLATES.map(t => t.category))];
  
  const filteredTemplates = selectedCategory === 'All' 
    ? TEMPLATES 
    : TEMPLATES.filter(t => t.category === selectedCategory);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Template Gallery</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
        </div>
        
        <div className="flex border-b">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm ${
                selectedCategory === category 
                  ? 'border-b-2 border-blue-500 font-medium' 
                  : 'text-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredTemplates.map(template => (
              <div
                key={template.id}
                onClick={() => onSelect(template)}
                className="border rounded-lg p-4 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-2">{template.preview}</div>
                <h3 className="font-medium text-sm">{template.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{template.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t flex justify-end">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};