import { FileNode } from '../components/CodeViewer';

export const sampleProject: FileNode[] = [
    {
        name: 'src',
        path: 'src',
        type: 'directory',
        children: [
            {
                name: 'components',
                path: 'src/components',
                type: 'directory',
                children: [
                    {
                        name: 'Button.tsx',
                        path: 'src/components/Button.tsx',
                        type: 'file',
                        language: 'typescript',
                        content: `import React from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
}) => {
  const baseClasses = 'rounded font-medium transition-colors';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'border border-gray-300 hover:bg-gray-100',
  };
  
  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4',
    lg: 'py-3 px-6 text-lg',
  };
  
  return (
    <button
      className={\`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;`
                    },
                    {
                        name: 'Card.tsx',
                        path: 'src/components/Card.tsx',
                        type: 'file',
                        language: 'typescript',
                        content: `import React from 'react';

type CardProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={\`rounded-lg border border-gray-200 shadow-sm \${className}\`}>
      {title && (
        <div className="border-b border-gray-200 px-4 py-3">
          <h3 className="font-medium">{title}</h3>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Card;`
                    }
                ]
            },
            {
                name: 'pages',
                path: 'src/pages',
                type: 'directory',
                children: [
                    {
                        name: 'index.tsx',
                        path: 'src/pages/index.tsx',
                        type: 'file',
                        language: 'typescript',
                        content: `import React from 'react';
import Button from '../components/Button';
import Card from '../components/Card';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to My App</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card title="Getting Started">
          <p className="mb-4">
            This is a sample project to demonstrate the code viewer component.
          </p>
          <Button>Learn More</Button>
        </Card>
        
        <Card title="Features">
          <ul className="list-disc pl-5 mb-4">
            <li>Responsive design</li>
            <li>Component-based architecture</li>
            <li>TypeScript support</li>
            <li>Tailwind CSS styling</li>
          </ul>
          <Button variant="secondary">View Docs</Button>
        </Card>
      </div>
    </div>
  );
}`
                    }
                ]
            },
            {
                name: 'App.tsx',
                path: 'src/App.tsx',
                type: 'file',
                language: 'typescript',
                content: `import React from 'react';
import HomePage from './pages/index';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HomePage />
    </div>
  );
}

export default App;`
            }
        ]
    },
    {
        name: 'package.json',
        path: 'package.json',
        type: 'file',
        language: 'json',
        content: `{
  "name": "sample-project",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^4.9.5"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}`
    },
    {
        name: 'README.md',
        path: 'README.md',
        type: 'file',
        language: 'markdown',
        content: `# Sample Project

This is a sample React project to demonstrate the code viewer component.

## Getting Started

1. Clone the repository
2. Install dependencies with \`npm install\`
3. Run the development server with \`npm run dev\`

## Features

- Modern React with TypeScript
- Component-based architecture
- Responsive design
`
    }
]; 