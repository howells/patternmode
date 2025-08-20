"use client";

import { CodeBlock } from "./component";

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

export function Button({
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
