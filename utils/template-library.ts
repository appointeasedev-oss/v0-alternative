// Pre-built template library for FreeV
// These templates can be used directly or as starting points

export const TEMPLATE_LIBRARY = {
  buttons: {
    primary: `import { Button } from "@/components/ui/button";

const PrimaryButton = () => {
  return (
    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
      Primary Action
    </Button>
  );
};

export default PrimaryButton;`,
    
    secondary: `import { Button } from "@/components/ui/button";

const SecondaryButton = () => {
  return (
    <Button variant="secondary" className="bg-gray-200 hover:bg-gray-300 text-gray-800">
      Secondary Action
    </Button>
  );
};

export default SecondaryButton;`,
    
    icon: `import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const IconButton = () => {
  return (
    <Button variant="outline" className="gap-2">
      <Download className="w-4 h-4" />
      Download
    </Button>
  );
};

export default IconButton;`
  },
  
  cards: {
    basic: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BasicCard = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          This is a basic card component. You can add any content here including
          text, images, forms, and other components.
        </p>
      </CardContent>
    </Card>
  );
};

export default BasicCard;`,
    
    withImage: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CardWithImage = () => {
  return (
    <Card className="w-full max-w-md overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=200&fit=crop" 
        alt="Card image" 
        className="w-full h-48 object-cover"
      />
      <CardHeader>
        <CardTitle>Card with Image</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          A card featuring an image at the top with content below.
        </p>
      </CardContent>
    </Card>
  );
};

export default CardWithImage;`,
    
    horizontal: `import { Card, CardContent } from "@/components/ui/card";

const HorizontalCard = () => {
  return (
    <Card className="w-full max-w-lg flex flex-row overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=150&h=150&fit=crop" 
        alt="Card image" 
        className="w-48 h-auto object-cover"
      />
      <div className="flex flex-col justify-center p-4">
        <h3 className="font-semibold text-lg">Horizontal Card</h3>
        <p className="text-gray-600 text-sm mt-1">
          A horizontal layout card with image on the left.
        </p>
      </div>
    </Card>
  );
};

export default HorizontalCard;`
  },
  
  forms: {
    login: `import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">Sign In</Button>
    </form>
  );
};

export default LoginForm;`,
    
    contact: `import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          placeholder="What's this about?"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Your message..."
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit" className="w-full">Send Message</Button>
    </form>
  );
};

export default ContactForm;`
  },
  
  navigation: {
    navbar: `'use client';

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#", label: "Home" },
    { href: "#", label: "Features" },
    { href: "#", label: "Pricing" },
    { href: "#", label: "About" },
    { href: "#", label: "Contact" }
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="#" className="text-xl font-bold text-blue-600">
              Brand
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link 
                key={link.label} 
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Button>Sign Up</Button>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;`,
    
    sidebar: `'use client';

import Link from "next/link";
import { Home, Settings, User, Folder, MessageSquare, LogOut } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: "Dashboard", href: "#" },
    { icon: Folder, label: "Projects", href: "#" },
    { icon: User, label: "Profile", href: "#" },
    { icon: MessageSquare, label: "Messages", href: "#" },
    { icon: Settings, label: "Settings", href: "#" }
  ];

  return (
    <aside className="w-64 bg-gray-900 min-h-screen text-white flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold">FreeV</h1>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;`
  },
  
  hero: {
    basic: `import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">
          Build Amazing Things Faster
        </h1>
        <p className="text-xl mb-8 opacity-90">
          Create stunning websites and applications in minutes with our AI-powered builder.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Get Started Free
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;`,
    
    withStats: `import { Button } from "@/components/ui/button";

const HeroWithStats = () => {
  const stats = [
    { value: "10K+", label: "Users" },
    { value: "50K+", label: "Projects" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" }
  ];

  return (
    <section className="bg-gray-900 text-white py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            The Platform for Modern Development
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to build, deploy, and scale your applications.
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Building
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
              View Documentation
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-blue-500">{stat.value}</div>
              <div className="text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroWithStats;`
  },
  
  dashboard: {
    basic: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, DollarSign, Activity } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { icon: Users, title: "Total Users", value: "12,345", change: "+12%" },
    { icon: DollarSign, title: "Revenue", value: "$45,678", change: "+8%" },
    { icon: Activity, title: "Active Now", value: "1,234", change: "+23%" },
    { icon: BarChart, title: "Conversion", value: "3.45%", change: "+2%" }
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600 mt-1">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Your recent activity will appear here.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Quick action buttons will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;`
  }
};

export const getTemplate = (category: string, template: string): string => {
  const categoryTemplates = TEMPLATE_LIBRARY[category as keyof typeof TEMPLATE_LIBRARY];
  if (!categoryTemplates) return '';
  return categoryTemplates[template as keyof typeof categoryTemplates] || '';
};

export const getAllTemplates = () => TEMPLATE_LIBRARY;