"use client";

import type { BadgeVariant, TailwindColor } from "@/lib/variants";
import React from "react";
import { Dot } from "@patternmode/ui";

// Example component for preview system
export const DotExample = ({
  variant = "default",
  color,
  label = "Ready",
  animated = false,
  size = "default",
  showAllVariants = false,
  showColorVariants = false,
  showSizes = false,
  showWithoutLabels = false,
  ...props
}: {
  variant?: BadgeVariant;
  color?: TailwindColor;
  label?: string;
  animated?: boolean;
  size?: "sm" | "default" | "lg";
  showAllVariants?: boolean;
  showColorVariants?: boolean;
  showSizes?: boolean;
  showWithoutLabels?: boolean;
  [key: string]: unknown;
}) => {
  // Show all semantic variants
  if (showAllVariants) {
    return (
      <div className="space-y-3" {...props}>
        <Dot variant="default" label="Default" size={size} />
        <Dot variant="success" label="Success" size={size} />
        <Dot variant="info" label="Info" size={size} />
        <Dot variant="warning" label="Warning" size={size} />
        <Dot variant="error" label="Error" size={size} />
        <Dot variant="neutral" label="Neutral" size={size} />
        <Dot variant="critical" label="Critical" size={size} />
        <Dot variant="positive" label="Positive" size={size} />
        <Dot variant="negative" label="Negative" size={size} />
      </div>
    );
  }

  // Show color variants
  if (showColorVariants) {
    return (
      <div className="space-y-3" {...props}>
        <Dot variant="purple" label="Purple" size={size} />
        <Dot variant="pink" label="Pink" size={size} />
        <Dot variant="orange" label="Orange" size={size} />
        <Dot variant="emerald" label="Emerald" size={size} />
        <Dot variant="sky" label="Sky" size={size} />
        <Dot variant="amber" label="Amber" size={size} />
        <Dot variant="lime" label="Lime" size={size} />
        <Dot variant="cyan" label="Cyan" size={size} />
      </div>
    );
  }

  // Show different sizes
  if (showSizes) {
    return (
      <div className="space-y-4" {...props}>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            With Labels
          </h4>
          <div className="flex items-center gap-6">
            <Dot variant="success" label="Small" size="sm" />
            <Dot variant="info" label="Default" size="default" />
            <Dot variant="error" label="Large" size="lg" />
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Dots Only
          </h4>
          <div className="flex items-center gap-6">
            <Dot variant="success" size="sm" />
            <Dot variant="info" size="default" />
            <Dot variant="error" size="lg" />
          </div>
        </div>
      </div>
    );
  }

  // Show without labels
  if (showWithoutLabels) {
    return (
      <div className="flex items-center gap-3" {...props}>
        <Dot variant="success" size={size} />
        <Dot variant="info" size={size} />
        <Dot variant="warning" size={size} />
        <Dot variant="error" size={size} />
        <Dot variant="neutral" size={size} />
        <Dot variant="purple" size={size} />
        <Dot variant="emerald" size={size} />
        <Dot variant="orange" size={size} />
      </div>
    );
  }

  // Default single dot
  return (
    <div className="flex items-center justify-center p-8" {...props}>
      <Dot
        variant={variant}
        color={color}
        label={label}
        size={size}
        animated={animated}
      />
    </div>
  );
};