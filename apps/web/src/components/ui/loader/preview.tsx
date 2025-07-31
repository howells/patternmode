"use client";

import React from "react";
import { Loader } from "@patternmode/ui";

// Example component for preview system
export const LoaderExample = ({
  size = "base",
  "aria-label": ariaLabel = "Loading",
  ...props
}: {
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  "aria-label"?: string;
  [key: string]: unknown;
}) => {
  return (
    <div className="flex justify-center p-8">
      <Loader size={size} aria-label={ariaLabel} {...props} />
    </div>
  );
};

// Default export for the preview system
export function Example() {
  return <LoaderExample />;
}
