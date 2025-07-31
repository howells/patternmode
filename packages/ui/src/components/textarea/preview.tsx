"use client";

import { Textarea } from "@patternmode/ui";
import React from "react";

interface TextareaExampleProps {
  hasError?: boolean;
  disabled?: boolean;
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;
  placeholder?: string;
  showWithContent?: boolean;
  [key: string]: unknown;
}

export function TextareaExample({
  hasError = false,
  disabled = false,
  autoResize = true,
  minRows = 2,
  maxRows = 6,
  placeholder = "Start typing to see auto-resize in action...",
  showWithContent = false,
  ...props
}: TextareaExampleProps) {
  const [value, setValue] = React.useState(
    showWithContent
      ? "This textarea demonstrates auto-resize functionality.\n\nTry adding more lines to see it expand automatically."
      : "",
  );

  // Filter out invalid props that might come from the prop explorer
  const { onHeightChange, ...validProps } = props;
  const heightChangeCallback = typeof onHeightChange === "function" ? onHeightChange : undefined;

  return (
    <Textarea
      placeholder={placeholder}
      value={value}
      onChange={e => setValue(e.target.value)}
      hasError={hasError}
      disabled={disabled}
      autoResize={autoResize}
      minRows={minRows}
      maxRows={maxRows}
      onHeightChange={heightChangeCallback}
      {...validProps}
    />
  );
}

// Default export for the preview system
export default function Example() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Textarea</h3>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-zinc-500 mb-2">Auto-resizing textarea</p>
            <TextareaExample />
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-2">With initial content</p>
            <TextareaExample showWithContent />
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-2">Error state</p>
            <TextareaExample
              hasError
              placeholder="This field has an error..."
            />
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-2">Disabled state</p>
            <TextareaExample
              disabled
              showWithContent
              placeholder="This textarea is disabled"
            />
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-2">
              Fixed height (no auto-resize)
            </p>
            <TextareaExample
              autoResize={false}
              placeholder="Fixed height - content will scroll when it overflows..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
