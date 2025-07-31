"use client";

import { Info } from "lucide-react";
import React from "react";
import { Callout } from "@patternmode/ui";

// Example component for preview system
export const CalloutExample = ({
  title = "Important Information",
  variant = "default",
  icon = Info,
  children = "This callout contains important information that requires your attention. It can include multiple sentences and longer content to demonstrate how the component handles extended text. The callout will automatically adjust its height to accommodate the content while maintaining proper styling and readability.",
  ...props
}: {
  title?: string;
  variant?: "default" | "success" | "error" | "warning" | "neutral";
  icon?: React.ComponentType<{ className?: string }>;
  children?: string;
  [key: string]: unknown;
}) => {
  // The component preview system already converts icon strings to components
  // so we can pass them directly to the Callout
  return (
    <Callout title={title} variant={variant} icon={icon} {...props}>
      {children}
    </Callout>
  );
};
