import React from "react";
import { Badge } from "@patternmode/ui";

// Example component for preview system
export const BadgeExample = ({
  variant = "default",
  size = "base",
  bordered,
  rounded,
  statusAnimated,
  leftIcon,
  rightIcon,
  children = "Badge",
  onDismiss: showDismiss,
  dismissIcon,
  ...props
}: {
  variant?: "default" | "neutral" | "success" | "error" | "warning";
  size?: "sm" | "base" | "lg";
  bordered?: boolean;
  rounded?: boolean;
  statusAnimated?: boolean;
  leftIcon?: React.ComponentType<{ className?: string }>;
  rightIcon?: React.ComponentType<{ className?: string }>;
  children?: string;
  onDismiss?: boolean;
  dismissIcon?: React.ComponentType<{ className?: string }>;
  [key: string]: unknown;
}) => {
  // Convert boolean to actual dismiss handler for preview
  const handleDismiss = showDismiss
    ? () => console.log("Badge dismissed")
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
      onDismiss={handleDismiss}
      dismissIcon={dismissIcon}
      {...props}
    >
      {children}
    </Badge>
  );
};
