// Tremor CodeBlock [v1.0.0] - Base UI

"use client";

import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";
import oneLight from "react-syntax-highlighter/dist/esm/styles/prism/one-light";

import { CopyButton } from "@/components/ui/copy-button/copy-button";
import { cx } from "@/lib/utils";

/**
 * Props for the CodeBlock component.
 * 
 * Configuration for syntax-highlighted code display with theming options.
 * 
 * @interface CodeBlockProps
 */
interface CodeBlockProps {
  /** Code content to syntax highlight */
  children: string;
  /** Programming language for syntax highlighting (defaults to "tsx") */
  language?: string;
  /** Additional CSS classes */
  className?: string;
  /** Color theme for syntax highlighting */
  theme?: "light" | "dark" | "auto";
}

/**
 * A syntax-highlighted code block component.
 * 
 * Built on react-syntax-highlighter with Prism.js (https://prismjs.com/),
 * providing syntax highlighting for 297+ programming languages. Features
 * automatic theme switching, copy functionality, and professional styling.
 *
 * @param children - Code content to display
 * @param language - Programming language for syntax highlighting
 * @param theme - Color theme (light, dark, or auto-detect)
 * @param className - Additional CSS classes
 *
 * @component
 * @example
 * ```tsx
 * // Basic TypeScript code block
 * <CodeBlock language="typescript">
 *   {`const greeting = (name: string) => {
 *     return \`Hello, \${name}!\`;
 *   };`}
 * </CodeBlock>
 *
 * // JavaScript with dark theme
 * <CodeBlock language="javascript" theme="dark">
 *   {`function fibonacci(n) {
 *     if (n <= 1) return n;
 *     return fibonacci(n - 1) + fibonacci(n - 2);
 *   }`}
 * </CodeBlock>
 *
 * // Python code with auto theme detection
 * <CodeBlock language="python" theme="auto">
 *   {`def quicksort(arr):
 *     if len(arr) <= 1:
 *         return arr
 *     pivot = arr[len(arr) // 2]
 *     left = [x for x in arr if x < pivot]
 *     middle = [x for x in arr if x == pivot]
 *     right = [x for x in arr if x > pivot]
 *     return quicksort(left) + middle + quicksort(right)`}
 * </CodeBlock>
 *
 * // CSS with light theme
 * <CodeBlock language="css" theme="light">
 *   {`.button {
 *     background: linear-gradient(45deg, #007bff, #0056b3);
 *     border: none;
 *     border-radius: 8px;
 *     color: white;
 *     padding: 12px 24px;
 *     transition: all 0.2s ease;
 *   }
 *   
 *   .button:hover {
 *     transform: translateY(-2px);
 *     box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
 *   }`}
 * </CodeBlock>
 *
 * // Shell commands
 * <CodeBlock language="bash">
 *   {`npm install @patternmode/react
 * npm run dev
 * npm run build`}
 * </CodeBlock>
 *
 * // JSON configuration
 * <CodeBlock language="json">
 *   {`{
 *     "name": "my-app",
 *     "version": "1.0.0",
 *     "dependencies": {
 *       "react": "^18.0.0",
 *       "typescript": "^5.0.0"
 *     }
 *   }`}
 * </CodeBlock>
 * ```
 *
 * @see https://prismjs.com/ - Prism.js syntax highlighting documentation
 */
export const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ children, language = "tsx", className, theme = "auto" }, ref) => {
    // Determine theme
    const isDark = React.useMemo(() => {
      if (theme === "light") return false;
      if (theme === "dark") return true;
      // Auto detection based on system preference or CSS
      if (typeof window !== "undefined") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
      return false;
    }, [theme]);

    // Listen for system theme changes only when theme is "auto"
    const [systemIsDark, setSystemIsDark] = React.useState(() => {
      if (typeof window !== "undefined") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
      return false;
    });

    React.useEffect(() => {
      if (typeof window === "undefined") return;

      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) =>
        setSystemIsDark(e.matches);

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    // Use system theme only when theme is "auto"
    const effectiveIsDark = theme === "auto" ? systemIsDark : isDark;

    return (
      <div
        ref={ref}
        className={cx(
          "relative rounded-lg border border-zinc-200 dark:border-zinc-800 w-full overflow-hidden",
          className
        )}
      >
        <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {language}
          </span>
          <CopyButton text={children} />
        </div>
        <SyntaxHighlighter
          language={language}
          style={effectiveIsDark ? oneDark : oneLight}
          customStyle={{
            margin: 0,
            padding: "1rem",
            background: "transparent",
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            maxWidth: "100%",
            overflowX: "auto",
          }}
          wrapLongLines={true}
          codeTagProps={{
            style: {
              fontSize: "0.875rem",
              fontFamily:
                "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
            },
          }}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    );
  }
);

CodeBlock.displayName = "CodeBlock";

export { type CodeBlockProps };
