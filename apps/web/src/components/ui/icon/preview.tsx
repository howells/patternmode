"use client";

import { Search } from "lucide-react";
import React from "react";
import { Icon } from "@patternmode/ui";

export function IconExample({
  size = "base",
  strokeWidth = 1.5,
  ...props
}: {
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  strokeWidth?: number;
} & Record<string, unknown>) {
  return (
    <div className="flex items-center justify-center p-8">
      <Icon icon={Search} size={size} strokeWidth={strokeWidth} {...props} />
    </div>
  );
}
