"use client";

import type { CodeBlockProps } from "./types";
import React from "react";
import { CodeBlock } from "./component";

export function CodeBlockPreview(props: CodeBlockProps) {
  const defaultCode = `interface User {
  id: number;
  name: string;
  email: string;
}

function createUser(data: Partial<User>): User {
  return {
    id: Date.now(),
    name: data.name || "Anonymous",
    email: data.email || "",
  };
}`;

  return (
    <CodeBlock language="typescript" {...props}>
      {props.children || defaultCode}
    </CodeBlock>
  );
}

// Preview props for prop explorer
export const codeBlockPreviewProps = [
  {
    name: "children",
    type: "string",
    description: "Code content to syntax highlight.",
    defaultValue: `interface User {
  id: number;
  name: string;
  email: string;
}

function createUser(data: Partial<User>): User {
  return {
    id: Date.now(),
    name: data.name || "Anonymous",
    email: data.email || "",
  };
}`,
  },
  {
    name: "language",
    type: "select",
    description: "Programming language for syntax highlighting.",
    options: ["typescript", "javascript", "tsx", "jsx", "python", "java", "css", "html", "json", "bash"],
    defaultValue: "typescript",
  },
  {
    name: "theme",
    type: "select",
    description: "Color theme for syntax highlighting.",
    options: ["auto", "light", "dark"],
    defaultValue: "auto",
  },
];
