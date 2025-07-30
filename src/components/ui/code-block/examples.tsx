import React from "react";
import { CodeBlock } from "@patternmode/ui";

// Default code block
export const DefaultExample = () => (
  <CodeBlock>
{`const greeting = "Hello, World!";
console.log(greeting);`}
  </CodeBlock>
);

// JavaScript code
export const JavascriptExample = () => (
  <CodeBlock language="javascript">
{`function calculateSum(a, b) {
  return a + b;
}

const result = calculateSum(5, 3);
console.log(result);`}
  </CodeBlock>
);

// CSS code
export const CssExample = () => (
  <CodeBlock language="css">
{`.button {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
}

.button:hover {
  background-color: #2563eb;
}`}
  </CodeBlock>
);

// JSON configuration
export const JsonExample = () => (
  <CodeBlock language="json">
{`{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0",
    "typescript": "^4.9.0"
  }
}`}
  </CodeBlock>
);

// Bash commands
export const BashExample = () => (
  <CodeBlock language="bash">
{`npm install
npm run dev

# Start the development server
npm start`}
  </CodeBlock>
);

// TypeScript with types
export const TypescriptExample = () => (
  <CodeBlock language="typescript">
{`interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

function getUserById(id: number): User | undefined {
  return users.find(user => user.id === id);
}

const user = getUserById(123);
console.log(user?.name);`}
  </CodeBlock>
);

// React component
export const ReactComponentExample = () => (
  <CodeBlock language="tsx">
{`import React, { useState } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function CodeBlockExample({ 
  children, 
  onClick, 
  variant = 'primary' 
}: ButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  
  const handleClick = () => {
    setIsClicked(true);
    onClick?.();
  };
  
  return (
    <button
      className={\`btn btn-\${variant}\`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}`}
  </CodeBlock>
);

// Python code
export const PythonExample = () => (
  <CodeBlock language="python">
{`def fibonacci(n):
    """Generate Fibonacci sequence up to n terms."""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    
    sequence = [0, 1]
    for i in range(2, n):
        sequence.append(sequence[i-1] + sequence[i-2])
    
    return sequence

# Generate first 10 Fibonacci numbers
result = fibonacci(10)
print(f"Fibonacci sequence: {result}")`}
  </CodeBlock>
);

// HTML markup
export const HtmlExample = () => (
  <CodeBlock language="html">
{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <p>This is the main content area.</p>
    </main>
</body>
</html>`}
  </CodeBlock>
);

// Long code with scrolling
export const LongCodeExample = () => (
  <CodeBlock language="typescript">
{`// A comprehensive example showing various TypeScript features
import { EventEmitter } from 'events';

// Enums
enum Status {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Pending = 'PENDING'
}

// Interfaces
interface IUser {
  id: string;
  name: string;
  email: string;
  status: Status;
  metadata?: Record<string, any>;
}

// Generic class
class Repository<T extends { id: string }> {
  private items: Map<string, T> = new Map();
  
  add(item: T): void {
    this.items.set(item.id, item);
  }
  
  get(id: string): T | undefined {
    return this.items.get(id);
  }
  
  update(id: string, updates: Partial<T>): T | undefined {
    const item = this.items.get(id);
    if (item) {
      const updated = { ...item, ...updates };
      this.items.set(id, updated);
      return updated;
    }
    return undefined;
  }
  
  delete(id: string): boolean {
    return this.items.delete(id);
  }
  
  findAll(predicate?: (item: T) => boolean): T[] {
    const items = Array.from(this.items.values());
    return predicate ? items.filter(predicate) : items;
  }
}

// Usage
const userRepo = new Repository<IUser>();

userRepo.add({
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  status: Status.Active
});

const activeUsers = userRepo.findAll(user => user.status === Status.Active);
console.log('Active users:', activeUsers);`}
  </CodeBlock>
);

// Different themes
export const LightThemeExample = () => (
  <CodeBlock language="tsx" theme="light">
{`const Component = () => {
  return <div>Light theme code block</div>;
};`}
  </CodeBlock>
);

export const DarkThemeExample = () => (
  <CodeBlock language="tsx" theme="dark">
{`const Component = () => {
  return <div>Dark theme code block</div>;
};`}
  </CodeBlock>
);export const CodeBlockExample = DefaultExample;
