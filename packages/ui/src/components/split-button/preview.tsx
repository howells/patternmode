"use client";

import { Download, Save } from "lucide-react";
import React from "react";
import { MenuGroup, MenuItem, MenuLabel, MenuSeparator } from "@patternmode/ui";
import { SplitButton } from "@patternmode/ui";

// Example component for preview system
export const SplitButtonExample = ({
  variant = "default",
  size = "default",
  rounded = false,
  buttonContent = "Save",
  disabled = false,
  isLoading = false,
  loadingText,
  leftIcon,
  dropdownIcon,
  ...props
}: {
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost";
  size?: "default" | "sm";
  rounded?: boolean;
  buttonContent?: string;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ComponentType<{ className?: string }>;
  dropdownIcon?: React.ComponentType<{ className?: string }>;
  [key: string]: unknown;
}) => {
  const handleButtonClick = () => {
    console.log("Main button clicked:", buttonContent);
  };

  const handleMenuItemClick = (action: string) => {
    console.log("Menu item clicked:", action);
  };

  return (
    <SplitButton
      variant={variant}
      size={size}
      rounded={rounded}
      buttonContent={buttonContent}
      disabled={disabled}
      isLoading={isLoading}
      loadingText={loadingText}
      leftIcon={leftIcon}
      dropdownIcon={dropdownIcon}
      onButtonClick={handleButtonClick}
      {...props}
    >
      <MenuGroup>
        <MenuLabel>Quick Actions</MenuLabel>
        <MenuItem
          icon={Save}
          onClick={() => handleMenuItemClick("Save as Draft")}
        >
          Save as Draft
        </MenuItem>
        <MenuItem
          icon={Save}
          onClick={() => handleMenuItemClick("Save as Template")}
        >
          Save as Template
        </MenuItem>
      </MenuGroup>
      <MenuSeparator />
      <MenuGroup>
        <MenuItem icon={Download} onClick={() => handleMenuItemClick("Export")}>
          Export
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("Preview")}>
          Preview
        </MenuItem>
      </MenuGroup>
    </SplitButton>
  );
};
