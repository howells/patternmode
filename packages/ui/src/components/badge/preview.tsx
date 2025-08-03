"use client";

import type { BadgeProps } from "./component";
import React from "react";
import { Badge } from "./component";

// Example component for preview system
export function BadgeExample({
  variant = "default",
  size = "base",
  bordered,
  rounded,
  statusAnimated,
  leftIcon,
  rightIcon,
  children = "Badge",
  dismissible,
  dismissIcon,
  ...props
}: {
  variant?: BadgeProps["variant"];
  size?: BadgeProps["size"];
  bordered?: boolean;
  rounded?: boolean;
  statusAnimated?: boolean;
  leftIcon?: React.ComponentType<{ className?: string }>;
  rightIcon?: React.ComponentType<{ className?: string }>;
  children?: string;
  dismissible?: boolean;
  dismissIcon?: React.ComponentType<{ className?: string }>;
  [key: string]: unknown;
}) {
  // Convert boolean to actual dismiss handler for preview
  const handleDismiss = dismissible
    ? () => console.warn("Badge dismissed")
    : undefined;

  return (
    <Badge
      variant={variant}
      size={size}
      bordered={bordered}
      rounded={rounded}
      statusAnimated={statusAnimated}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      dismissible={dismissible}
      onDismiss={handleDismiss}
      {...(dismissIcon && { dismissIcon })}
      {...props}
    >
      {children}
    </Badge>
  );
}
