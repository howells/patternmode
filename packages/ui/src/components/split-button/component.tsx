"use client";

import type { SplitButtonProps } from "./types";
import { ChevronDown } from "lucide-react";

import React from "react";
import { cx } from "../../lib/utils";
import { Button } from "../button/component";
import { Menu, MenuContent, MenuTrigger } from "../menu/component";
import { dropdownTriggerVariants, splitButtonVariants } from "./variants";

/**
 * Compound button with primary action and dropdown menu for secondary actions.
 */
const SplitButton = (
  { ref, variant = "default", size = "default", rounded = false, buttonContent, children, onButtonClick, disabled = false, isLoading = false, loadingText, leftIcon, dropdownIcon: DropdownIcon = ChevronDown as React.ComponentType<{ className?: string; strokeWidth?: number }>, menuProps = {}, className, ...props }: SplitButtonProps & { ref?: React.RefObject<HTMLDivElement | null> },
) => {
  const iconSize = size === "sm" ? "size-3.5" : "size-3.5";

  return (
    <div
      ref={ref}
      className={cx(
        splitButtonVariants({ variant, size, rounded }),
        disabled && "data-disabled",
        className,
      )}
      data-testid="split-button"
      {...props}
    >
      {/* Main Button */}
      <Button
        variant={variant}
        size={size}
        rounded={false} // We handle rounding at the container level
        disabled={disabled || isLoading}
        isLoading={isLoading}
        loadingText={loadingText}
        leftIcon={leftIcon}
        onClick={onButtonClick}
        className={cx(
          "flex-1 rounded-l-lg",
          rounded && "rounded-l-full",
          // Remove right border radius
          "rounded-r-none",
        )}
      >
        {buttonContent}
      </Button>

      {/* Dropdown Trigger */}
      <Menu>
        <MenuTrigger
          render={
            <Button
              variant={variant}
              size={size}
              rounded={false}
              disabled={disabled}
              className={cx(
                "border-l border-black/10 rounded-l-none",
                "dark:border-white/10",
                rounded && "rounded-r-full",
                dropdownTriggerVariants({ variant, size, rounded }).trigger(),
              )}
            />
          }
        >
          <DropdownIcon className={cx("shrink-0", iconSize)} />
        </MenuTrigger>
        <MenuContent
          align="end"
          sideOffset={4}
          {...menuProps}
        >
          {children}
        </MenuContent>
      </Menu>
    </div>
  );
};

SplitButton.displayName = "SplitButton";

export { SplitButton };
