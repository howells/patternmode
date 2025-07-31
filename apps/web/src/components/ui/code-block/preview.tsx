"use client";

import React from "react";
import { CodeBlock } from "@patternmode/ui";

// Example component for preview system
export const CodeBlockExample = ({
  children = `const greeting = "Hello, World!";\nconsole.log(greeting);`,
  language = "tsx",
  theme = "auto",
  ...props
}: {
  children?: string;
  language?: string;
  theme?: "light" | "dark" | "auto";
  [key: string]: unknown;
}) => {
  return (
    <div className="w-full max-w-2xl">
      <CodeBlock language={language} theme={theme} {...props}>
        {children}
      </CodeBlock>
    </div>
  );
};
