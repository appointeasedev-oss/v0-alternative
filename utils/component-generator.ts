// Advanced component generator for FreeV
// Handles various UI patterns and component types

interface ComponentOptions {
  type: 'button' | 'card' | 'form' | 'table' | 'modal' | 'navbar' | 'sidebar' | 'dashboard' | 'landing' | 'blog';
  props?: Record<string, any>;
  children?: string;
  framework?: 'react' | 'vue' | 'svelte' | 'html';
}

export const generateSpecificComponent = (options: ComponentOptions): string => {
  const { type, props = {}, children = '', framework = 'react' } = options;

  switch (type) {
    case 'button':
      return generateButton(props, framework);
    case 'card':
      return generateCard(props, framework);
    case 'form':
      return generateForm(props, framework);
    case 'table':
      return generateTable(props, framework);
    case 'modal':
      return generateModal(props, framework);
    case 'navbar':
      return generateNavbar(props, framework);
    case 'sidebar':
      return generateSidebar(props, framework);
    case 'dashboard':
      return generateDashboard(props, framework);
    case 'landing':
      return generateLandingPage(props, framework);
    case 'blog':
      return generateBlogComponent(props, framework);
    default:
      return generateGenericComponent(type, props, framework);
  }
};

const generateButton = (props: Record<string, any>, framework: string): string => {
  const { text = 'Button', variant = 'primary', size = 'md', onClick } = props;
  
  if (framework === 'html') {
    return `<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-${size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'base'}">
  ${text}
</button>`;
  }

  return `import { Button } from "@/components/ui/button";

const ${variant.charAt(0).toUpperCase() + variant.slice(1)}Button = () => {
  const handleClick = () => {
    console.log('Button clicked!');
    ${onClick ? onClick : '// Add your onClick logic here'}
  };

  return (
    <Button 
      variant="${variant}"
      size="${size}"
      onClick={handleClick}
      className="transition-all duration-200"
    >
      {${JSON.stringify(text)}}
    </Button>
  );
};

export default ${variant.charAt(0).toUpperCase() + variant.slice(1)}Button;`;
};

const generateCard = (props: Record<string, any>, framework: string): string => {
  const { title, description, image, footer } = props;
  
  if (framework === 'html') {
    return `<div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
  ${image ? `<img class="w-full" src="${image}" alt="${title}">` : ''}
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">${title || 'Card Title'}</div>
    <p class="text-gray-700 text-base">
      ${description || 'Card description goes here.'}
    </p>
  </div>
  ${footer ? `<div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
      #${footer}
    </span>
  </div>` : ''}
</div>`;
  }

  return `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const ${title ? title.replace(/\s+/g, '') : 'GeneratedCard'} = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>${title || 'Card Title'}</CardTitle>
        <CardDescription>${description || 'Card description goes here.'}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Customize this card with your content.</p>
      </CardContent>
      ${footer ? `<CardFooter>
        <p>${footer}</p>
      </CardFooter>` : ''}
    </Card>
  );
};

export default ${title ? title.replace(/\s+/g, '') : 'GeneratedCard'};`;
};

const generateForm = (props: Record<string, any>, framework: string): string => {
  const { fields = [], submitText = 'Submit' } = props;
  
  if (framework === 'html') {
    let formFields = '';
    fields.forEach((field: any) => {
      const { type = 'text', label, name, placeholder } = field;
      if (type === 'text' || type === 'email' || type === 'password') {
        formFields += `
<div class="mb-4">
  <label class="block text-gray-700 text-sm font-bold mb-2" for="${name}">
    ${label || name}
  </label>
  <input 
    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
    id="${name}" 
    type="${type}" 
    placeholder="${placeholder || ''}"
  >
</div>`;
      } else if (type === 'textarea') {
        formFields += `
<div class="mb-4">
  <label class="block text-gray-700 text-sm font-bold mb-2" for="${name}">
    ${label || name}
  </label>
  <textarea 
    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
    id="${name}" 
    placeholder="${placeholder || ''}"
  ></textarea>
</div>`;
      }
    });
    
    return `<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  ${formFields}
  <div class="flex items-center justify-between">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
      ${submitText}
    </button>
  </div>
</form>`;
  }

  return `import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const GeneratedForm = () => {
  const [formData, setFormData] = useState({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your submit logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      ${fields.map((field: any) => {
        const { type = 'text', label, name, placeholder } = field;
        if (type === 'text' || type === 'email' || type === 'password') {
          return `
      <div>
        <Label htmlFor="${name}">${label || name}</Label>
        <Input 
          id="${name}"
          name="${name}"
          type="${type}"
          placeholder="${placeholder || ''}"
          value={formData.${name} || ''}
          onChange={handleChange}
        />
      </div>`;
        } else if (type === 'textarea') {
          return `
      <div>
        <Label htmlFor="${name}">${label || name}</Label>
        <textarea 
          id="${name}"
          name="${name}"
          placeholder="${placeholder || ''}"
          value={formData.${name} || ''}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>`;
        }
        return '';
      }).join('')}
      
      <Button type="submit" className="w-full">
        ${submitText}
      </Button>
    </form>
  );
};

export default GeneratedForm;`;
};

// Placeholder implementations for other component types
const generateTable = (props: Record<string, any>, framework: string): string => {
  return `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const GeneratedTable = () => {
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GeneratedTable;`;
};

const generateModal = (props: Record<string, any>, framework: string): string => {
  return `import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const GeneratedModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Modal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generated Modal</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>This is a generated modal component.</p>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Confirm</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GeneratedModal;`;
};

// Simplified implementations for remaining types
const generateNavbar = (props: Record<string, any>, framework: string): string => {
  return `import Link from 'next/link';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Logo</div>
        <div className="flex space-x-4">
          <Link href="#" className="hover:text-gray-300">Home</Link>
          <Link href="#" className="hover:text-gray-300">About</Link>
          <Link href="#" className="hover:text-gray-300">Contact</Link>
          <Button variant="outline" size="sm">Sign In</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;`;
};

const generateSidebar = (props: Record<string, any>, framework: string): string => {
  return `import Link from 'next/link';
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="text-xl font-bold mb-6">Menu</div>
      <nav className="space-y-2">
        <Link href="#" className="block p-2 hover:bg-gray-700 rounded">Dashboard</Link>
        <Link href="#" className="block p-2 hover:bg-gray-700 rounded">Projects</Link>
        <Link href="#" className="block p-2 hover:bg-gray-700 rounded">Team</Link>
        <Link href="#" className="block p-2 hover:bg-gray-700 rounded">Settings</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;`;
};

const generateDashboard = (props: Record<string, any>, framework: string): string => {
  return `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Current user count</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,234</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$45,678</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Pending orders</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">56</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Conversion</CardTitle>
            <CardDescription>Overall rate</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">24%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;`;
};

const generateLandingPage = (props: Record<string, any>, framework: string): string => {
  return `import Link from 'next/link';
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to Our Product</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          A revolutionary solution that transforms your workflow and boosts productivity.
        </p>
        <div className="space-x-4">
          <Button size="lg">Get Started</Button>
          <Button variant="outline" size="lg">Learn More</Button>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Amazing Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-3">Feature 1</h3>
              <p className="text-gray-600">Description of the first amazing feature.</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-3">Feature 2</h3>
              <p className="text-gray-600">Description of the second amazing feature.</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-3">Feature 3</h3>
              <p className="text-gray-600">Description of the third amazing feature.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-800 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Join thousands of satisfied customers using our platform today.
        </p>
        <Button size="lg" variant="secondary">Sign Up Now</Button>
      </section>
    </div>
  );
};

export default LandingPage;`;
};

const generateBlogComponent = (props: Record<string, any>, framework: string): string => {
  return `import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";

const BlogComponent = () => {
  const posts = [
    {
      id: 1,
      title: 'Getting Started with React',
      excerpt: 'Learn the basics of React and build your first component.',
      date: 'May 15, 2023',
      author: 'Jane Doe'
    },
    {
      id: 2,
      title: 'Advanced State Management',
      excerpt: 'Explore different state management solutions for React apps.',
      date: 'June 2, 2023',
      author: 'John Smith'
    },
    {
      id: 3,
      title: 'Styling Best Practices',
      excerpt: 'How to effectively style your React applications.',
      date: 'June 20, 2023',
      author: 'Sam Johnson'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Our Blog</h1>
      
      <div className="space-y-8">
        {posts.map(post => (
          <Card key={post.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <Link href="#" className="text-2xl font-bold hover:underline">{post.title}</Link>
                  <p className="text-gray-600 mt-2">{post.excerpt}</p>
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm text-gray-500">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>By {post.author}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogComponent;`;
};

const generateGenericComponent = (type: string, props: Record<string, any>, framework: string): string => {
  return `// Generic component of type: ${type}
// Properties: ${JSON.stringify(props)}

const GeneratedComponent = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Generated ${type.charAt(0).toUpperCase() + type.slice(1)}</h1>
      <p>This is a generated component based on your requirements.</p>
    </div>
  );
};

export default GeneratedComponent;`;
};