"use client";

import { Icon, ToggleGroup, ToggleGroupItem, useIconSize } from "@patternmode/ui";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";
import React from "react";

export function ToggleGroupExample({
  variant = "default",
  size = "default",
  orientation = "horizontal",
  disabled = false,
  showMultiple = false,
  ...props
}: {
  variant?:
    | "default"
    | "outline"
    | "ghost";
  size?: "xs" | "sm" | "default" | "lg";
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  showMultiple?: boolean;
} & Record<string, unknown>) {
  const [alignment, setAlignment] = React.useState<string[]>(["left"]);
  const [formatting, setFormatting] = React.useState<string[]>(["bold"]);

  // Get appropriate icon size based on toggle group size
  const iconSize = useIconSize(size);

  return (
    <div className="space-y-8">
      {/* Text Alignment Example */}
      <div>
        <h3 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
          Text Alignment
        </h3>
        <ToggleGroup
          variant={variant}
          size={size}
          orientation={orientation}
          disabled={disabled}
          value={alignment}
          onValueChange={setAlignment}
          {...props}
        >
          <ToggleGroupItem value="left">
            <Icon icon={AlignLeft} size={iconSize} />
          </ToggleGroupItem>
          <ToggleGroupItem value="center">
            <Icon icon={AlignCenter} size={iconSize} />
          </ToggleGroupItem>
          <ToggleGroupItem value="right">
            <Icon icon={AlignRight} size={iconSize} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Text Formatting Example (only show if showMultiple is true) */}
      {showMultiple && (
        <div>
          <h3 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
            Text Formatting (Multiple Selection)
          </h3>
          <ToggleGroup
            variant={variant}
            size={size}
            orientation={orientation}
            disabled={disabled}
            value={formatting}
            onValueChange={setFormatting}
            {...props}
          >
            <ToggleGroupItem value="bold">
              <Icon icon={Bold} size={iconSize} />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic">
              <Icon icon={Italic} size={iconSize} />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline">
              <Icon icon={Underline} size={iconSize} />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      )}

      {/* Show current selections */}
      <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
        <p>
          Alignment:
          {alignment.length > 0 ? alignment.join(", ") : "None"}
        </p>
        {showMultiple && (
          <p>
            Formatting:
            {" "}
            {formatting.length > 0 ? formatting.join(", ") : "None"}
          </p>
        )}
      </div>
    </div>
  );
}
