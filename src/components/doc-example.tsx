// Documentation Example Component

"use client";

import { cx } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "./ui/button/button";
import { CodeBlock } from "./ui/code-block";

interface DocExampleProps {
  title?: string;
  description?: string;
  preview: React.ReactNode;
  code: string;
  className?: string;
}

export const DocExample = React.forwardRef<HTMLDivElement, DocExampleProps>(
  ({ title, description, preview, code, className }, ref) => {
    const [showCode, setShowCode] = useState(false);

    return (
      <div ref={ref} className={cx("space-y-4", className)}>
        {title && (
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {title}
            </h3>
            {description && (
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800">
          {/* Preview */}
          <div className="border-b border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="flex items-center justify-center">{preview}</div>
          </div>

          {/* Code toggle */}
          <div className="border-b border-zinc-200 px-4 py-2 dark:border-zinc-800">
            <Button
              variant="ghost"
              onClick={() => setShowCode(!showCode)}
              className="text-xs px-2 py-1"
            >
              {showCode ? "Hide" : "Show"} code
            </Button>
          </div>

          {/* Code */}
          {showCode && (
            <div className="p-0">
              <CodeBlock language="tsx" className="border-0 rounded-none">
                {code}
              </CodeBlock>
            </div>
          )}
        </div>
      </div>
    );
  }
);

DocExample.displayName = "DocExample";
