"use client";

import React from "react";
import { Divider } from "@patternmode/ui";

// Example component for preview system
export const DividerExample = ({
  orientation = "horizontal",
  spacing = "md",
  children,
  ...props
}: {
  orientation?: "horizontal" | "vertical";
  spacing?: "sm" | "md" | "lg";
  children?: string;
  [key: string]: unknown;
}) => {
  return (
    <Divider
      orientation={orientation}
      spacing={spacing}
      {...props}
    >
      {children}
    </Divider>
  );
};