'use client';

import { useEffect, useRef } from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

export const CodeEditor = ({ code, onChange }: CodeEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Auto-resize the textarea based on content
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [code]);

  return (
    <div className="h-full border rounded-md bg-white">
      <div className="border-b p-2 bg-gray-100">
        <h3 className="text-sm font-medium">Code Editor</h3>
      </div>
      <textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 font-mono text-sm h-[calc(100%-40px)] resize-none focus:outline-none"
        spellCheck="false"
      />
    </div>
  );
};