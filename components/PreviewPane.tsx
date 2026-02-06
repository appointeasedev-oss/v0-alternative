'use client';

import { useEffect, useRef } from 'react';

interface PreviewPaneProps {
  code: string;
}

export const PreviewPane = ({ code }: PreviewPaneProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current || !code) return;

    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;

    if (doc) {
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://cdn.tailwindcss.com"></script>
          </head>
          <body class="p-4">
            <div id="root"></div>
            <script>
              // Simple JSX-like rendering for demo purposes
              function render(element, container) {
                if (typeof element === 'string') {
                  container.innerHTML = element;
                } else if (element && typeof element === 'object') {
                  const el = document.createElement(element.type);
                  if (element.props) {
                    Object.keys(element.props).forEach(prop => {
                      if (prop.startsWith('on')) {
                        // Handle event handlers
                        el.addEventListener(prop.toLowerCase().slice(2), element.props[prop]);
                      } else if (prop === 'className') {
                        el.className = element.props[prop];
                      } else if (prop === 'style') {
                        Object.assign(el.style, element.props[prop]);
                      } else if (prop !== 'children') {
                        el.setAttribute(prop, element.props[prop]);
                      }
                    });
                    
                    if (element.props.children) {
                      const children = Array.isArray(element.props.children) 
                        ? element.props.children 
                        : [element.props.children];
                      
                      children.forEach(child => {
                        if (typeof child === 'string' || typeof child === 'number') {
                          el.appendChild(document.createTextNode(child));
                        } else {
                          render(child, el);
                        }
                      });
                    }
                  }
                  container.appendChild(el);
                }
              }
              
              // Parse and render the generated component
              try {
                // Extract JSX from the code
                const jsxMatch = \`${code}\`.match(/return \\(\\s*([\\s\\S]*?)\\s*\\)/);
                if (jsxMatch) {
                  // This is a simplified renderer for demonstration
                  // In a real implementation, we'd use a proper JSX parser
                  const tempDiv = document.createElement('div');
                  tempDiv.innerHTML = '<div class="container mx-auto p-4"><h1 class="text-2xl font-bold">Hello from FreeV!</h1><p>Your AI-generated component</p></div>';
                  document.getElementById('root').appendChild(tempDiv.firstChild);
                }
              } catch (e) {
                console.error('Error rendering component:', e);
                document.getElementById('root').innerHTML = '<p>Error rendering component</p>';
              }
            </script>
          </body>
        </html>
      `);
      doc.close();
    }
  }, [code]);

  return (
    <div className="h-full border rounded-md bg-white">
      <div className="border-b p-2 bg-gray-100">
        <h3 className="text-sm font-medium">Preview</h3>
      </div>
      <iframe
        ref={iframeRef}
        title="component-preview"
        className="w-full h-[calc(100%-40px)] border-0"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};