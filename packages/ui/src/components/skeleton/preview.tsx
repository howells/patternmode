"use client";

import type { SkeletonProps } from "./component";
import React from "react";
import { Skeleton } from "./component";

export function SkeletonExample(props: SkeletonProps) {
  return <Skeleton className="h-4 w-32" {...props} />;
}

// Preview props for prop explorer
export const SkeletonPreviewProps = [
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes for custom sizing and styling. Commonly used to set dimensions.",
    defaultValue: "h-4 w-32",
  },
];
