import type { ComponentConfig } from "../../lib/component-config-types";
import React from "react";
import { jsxToString } from "../../lib/jsx-to-string";
import { BashExample, CssExample, DefaultExample, JavascriptExample, JsonExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "code-block",
  name: "Code Block",
  description:
    "A code block component with syntax highlighting, language display, and copy functionality.",
  category: "text" as const,
  icon: "Code",
  importStatement: `import { CodeBlock } from "@/components/ui/code-block";`,
  componentId: "CodeBlockExample",
  props: [
    {
      name: "children",
      type: "textarea",
      defaultValue: `const greeting = "Hello, World!";\nconsole.log(greeting);`,
      description: "The code content to display.",
      required: true,
    },
    {
      name: "language",
      type: "select",
      options: [
        "tsx",
        "javascript",
        "typescript",
        "jsx",
        "css",
        "html",
        "json",
        "bash",
        "python",
      ],
      defaultValue: "tsx",
      description: "The programming language for the code block header.",
    },
    {
      name: "theme",
      type: "select",
      options: ["auto", "light", "dark"],
      defaultValue: "auto",
      description: "The color theme for syntax highlighting.",
    },
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic code block with TypeScript syntax.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "javascript",
      title: "JavaScript",
      description: "Code block displaying JavaScript code.",
      code: jsxToString(<JavascriptExample />),
    },
    {
      id: "css",
      title: "CSS",
      description: "Code block showing CSS styles.",
      code: jsxToString(<CssExample />),
    },
    {
      id: "json",
      title: "JSON",
      description: "Code block for JSON configuration.",
      code: jsxToString(<JsonExample />),
    },
    {
      id: "bash",
      title: "Bash",
      description: "Code block for shell commands.",
      code: jsxToString(<BashExample />),
    },
  ],
};
