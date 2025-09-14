import type { ComponentConfig } from "@patternmode/config/component-types";
import { Code } from "lucide-react";
import { CodeBlock } from ".";
import {
  BashExample,
  CssExample,
  DefaultExample,
  HtmlExample,
  JavascriptExample,
  JsonExample,
  PythonExample,
  ReactComponentExample,
  TypescriptExample,
} from "./examples";

export const codeBlockConfig: ComponentConfig = {
  id: "code-block",
  name: "Code Block",
  description:
    "Syntax-highlighted code display component with copy functionality and theme support. Built on react-syntax-highlighter with Prism.js, supporting 297+ programming languages with automatic theme switching and professional styling.",
  category: "media",
  icon: Code,
  importStatement: `import { CodeBlock } from "@patternmode/code-block";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic code block with TypeScript syntax highlighting",
      component: DefaultExample,
    },
    {
      id: "javascript",
      title: "JavaScript",
      description: "JavaScript code with syntax highlighting",
      component: JavascriptExample,
    },
    {
      id: "css",
      title: "CSS",
      description: "CSS styling with syntax highlighting",
      component: CssExample,
    },
    {
      id: "json",
      title: "JSON",
      description: "JSON configuration with syntax highlighting",
      component: JsonExample,
    },
    {
      id: "bash",
      title: "Bash",
      description: "Shell commands with syntax highlighting",
      component: BashExample,
    },
    {
      id: "typescript",
      title: "TypeScript",
      description: "TypeScript with types and interfaces",
      component: TypescriptExample,
    },
    {
      id: "react-component",
      title: "React Component",
      description: "React component with JSX syntax highlighting",
      component: ReactComponentExample,
    },
    {
      id: "python",
      title: "Python",
      description: "Python code with syntax highlighting",
      component: PythonExample,
    },
    {
      id: "html",
      title: "HTML",
      description: "HTML markup with syntax highlighting",
      component: HtmlExample,
    },
  ],
  components: [
    {
      name: "Code Block",
      description: "Syntax-highlighted code display component",
      component: CodeBlock,
    },
  ],
};
