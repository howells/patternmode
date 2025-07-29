"use client";

import React from "react";
import { DismissButton } from "@patternmode/ui";

// Example component for preview system
export const DismissButtonExample = ({
  size = "base",
  showSizes = false,
  showPositioned = false,
  ...props
}: {
  size?: "sm" | "base" | "lg";
  showSizes?: boolean;
  showPositioned?: boolean;
  [key: string]: unknown;
}) => {
  // Show different sizes
  if (showSizes) {
    return (
      <div className="flex items-center gap-4" {...props}>
        <DismissButton size="sm" onClick={() => {}} />
        <DismissButton size="base" onClick={() => {}} />
        <DismissButton size="lg" onClick={() => {}} />
      </div>
    );
  }

  // Show positioned examples
  if (showPositioned) {
    return (
      <div className="space-y-4" {...props}>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-sm">
            Badge-like item
          </span>
          <DismissButton className="-ml-1" onClick={() => {}} />
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300 rounded-full text-sm">
            Tag-like item
          </span>
          <DismissButton className="-ml-1.5" size="sm" onClick={() => {}} />
        </div>
      </div>
    );
  }

  // Default single dismiss button
  return (
    <div className="flex items-center justify-center p-8" {...props}>
      <DismissButton size={size} onClick={() => {}} />
    </div>
  );
};
