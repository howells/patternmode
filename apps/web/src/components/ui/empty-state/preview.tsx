import React from "react";
import { getDynamicIconByName } from "@patternmode/ui";
import { EmptyState } from "@patternmode/ui";

export const EmptyStateExample = ({
  title = "No data found",
  description = "There's nothing here yet. Try creating something new to get started.",
  icon = "FileX",
  variant = "default",
  size = "default",
  showPrimaryAction = true,
  primaryActionLabel = "Create New",
  showSecondaryAction = false,
  secondaryActionLabel = "Learn more",
  ...props
}: {
  title?: string;
  description?: string;
  icon?: string;
  variant?: "default" | "minimal";
  size?: "sm" | "default" | "lg";
  showPrimaryAction?: boolean;
  primaryActionLabel?: string;
  showSecondaryAction?: boolean;
  secondaryActionLabel?: string;
  [key: string]: unknown;
}) => {
  const IconComponent =
    typeof icon === "string" ? getDynamicIconByName(icon) : null;

  return (
    <EmptyState
      title={title}
      description={description}
      icon={IconComponent || undefined}
      variant={variant}
      size={size}
      primaryAction={
        showPrimaryAction
          ? {
              label: primaryActionLabel,
              onClick: () => console.log("Primary action clicked"),
            }
          : undefined
      }
      secondaryAction={
        showSecondaryAction
          ? {
              label: secondaryActionLabel,
              onClick: () => console.log("Secondary action clicked"),
            }
          : undefined
      }
      {...props}
    />
  );
};
