"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Check, Copy } from "lucide-react";
import type * as React from "react";
import { useCallback, useState } from "react";
import { Button } from "../button";
import { Text } from "../text";

export interface CodeBlockProps extends React.ComponentProps<"div"> {
  /** Code content to display. */
  code: string;
  /** Filename or title shown in the header bar. */
  filename?: string;
  /** Programming language (for display badge — does NOT do syntax highlighting). */
  language?: string;
  /** Whether to show line numbers. Default false. */
  lineNumbers?: boolean;
  /** Whether to show copy button. Default true. */
  copyable?: boolean;
  /** Max height before scrolling. Default "none" (no limit). */
  maxHeight?: string;
}

/**
 * Code block with optional filename header, copy button, and line numbers.
 * This is a presentational component — it does NOT do syntax highlighting.
 * For highlighted code, use Shiki or fumadocs-core/highlight before passing
 * the rendered HTML as children.
 *
 * @example
 * ```tsx
 * <CodeBlock
 *   code={`const x = 1;\nconsole.log(x);`}
 *   filename="example.ts"
 *   language="typescript"
 *   lineNumbers
 * />
 * ```
 */
export function CodeBlock({
  className,
  code,
  copyable = true,
  filename,
  language,
  lineNumbers = false,
  maxHeight,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const numberedLines = code.split("\n").map((text, n) => ({
    key: `L${n + 1}`,
    num: n + 1,
    text,
  }));
  const hasHeader = filename || language;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-gray-950 text-gray-100",
        className,
      )}
      data-component="code-block"
      data-slot="code-block"
      {...props}
    >
      {/* Header bar */}
      {hasHeader && (
        <div className="flex items-center justify-between border-b border-gray-800 px-4 py-2">
          <Text size="2xs" className="text-gray-400 font-mono">
            {filename || language}
          </Text>
          {copyable && (
            <Button
              variant="ghost"
              size="sm"
              icon={copied ? Check : Copy}
              onClick={handleCopy}
              className="h-6 text-gray-400 hover:text-gray-200"
            >
              {copied ? "Copied" : "Copy"}
            </Button>
          )}
        </div>
      )}

      {/* Code area */}
      <div
        className="overflow-auto p-4"
        style={maxHeight ? { maxHeight } : undefined}
      >
        {!hasHeader && copyable && (
          <Button
            variant="ghost"
            size="sm"
            icon={copied ? Check : Copy}
            onClick={handleCopy}
            className="absolute right-2 top-2 h-6 text-gray-500 hover:text-gray-300"
          />
        )}
        {lineNumbers ? (
          <table className="text-sm font-mono leading-relaxed">
            <tbody>
              {numberedLines.map((line) => (
                <tr key={line.key}>
                  <td className="select-none pr-4 text-right text-gray-600 align-top">
                    {line.num}
                  </td>
                  <td className="whitespace-pre">{line.text || " "}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
