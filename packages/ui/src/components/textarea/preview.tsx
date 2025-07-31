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
  const { onHeightChange, onChange, ...validProps } = props;
  const heightChangeCallback = typeof onHeightChange === "function"
    ? onHeightChange as (height: number, meta: { rowHeight: number }) => void
    : undefined;

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
