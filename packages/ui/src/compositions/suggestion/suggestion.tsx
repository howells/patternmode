"use client";

import { Button } from "@patternmode/ui/components/button";
import { ScrollArea, ScrollBar } from "@patternmode/ui/components/scroll-area";
import type * as React from "react";

export interface SuggestionsProps
  extends Omit<React.ComponentProps<typeof ScrollArea>, "children"> {
  children?: React.ReactNode;
}

/**
 * Suggestions UI component.
 * Import from "@patternmode/ui/compositions/suggestion".
 */
export function Suggestions({
  className,
  children,
  ...props
}: SuggestionsProps) {
  return (
    <ScrollArea className={className} {...props}>
      <div
        className="flex gap-2 pb-2"
        data-component="suggestions"
        data-slot="suggestions"
        style={{ width: "max-content", minWidth: "100%" }}
      >
        {children}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export interface SuggestionProps
  extends Omit<React.ComponentProps<typeof Button>, "onClick"> {
  /** Callback when the suggestion is clicked */
  onClick?: (suggestion: string) => void;
  /** The suggestion text to display */
  suggestion?: string;
}

/**
 * Suggestion UI component.
 * Import from "@patternmode/ui/compositions/suggestion".
 */
export function Suggestion({
  suggestion = "",
  onClick,
  children,
  size = "sm",
  variant = "secondary",
  appearance = "outline",
  radius = "full",
  ...props
}: SuggestionProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(suggestion);
    }
  };

  return (
    <Button
      appearance={appearance}
      data-component="suggestion"
      data-slot="suggestion"
      onClick={handleClick}
      radius={radius}
      size={size}
      variant={variant}
      {...props}
    >
      {children || suggestion}
    </Button>
  );
}
