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
  minRows = 3,
  maxRows,
  placeholder = "Start typing and watch the textarea grow automatically...",
  showWithContent = false,
  ...props
}: TextareaExampleProps) {
  const [value, setValue] = React.useState(
    showWithContent
      ? "This textarea demonstrates auto-resize functionality.\n\nTry adding more lines to see it expand automatically."
      : "",
  );

  // Only pass through safe props - be very selective
  const safeProps: Record<string, unknown> = {};

  // Only allow specific safe props through
  const allowedProps = ['className', 'id', 'name', 'required', 'readOnly'];
  allowedProps.forEach(prop => {
    if (props[prop] !== undefined) {
      safeProps[prop] = props[prop];
    }
  });

  return (
    <div className="w-full max-w-lg">
      <Textarea
        placeholder={placeholder || "Start typing and watch the textarea grow automatically..."}
        value={value}
        onChange={e => setValue(e.target.value)}
        hasError={hasError}
        disabled={disabled}
        autoResize={autoResize}
        minRows={minRows}
        maxRows={maxRows}
        {...safeProps}
      />
    </div>
  );
}
