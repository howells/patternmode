"use client";

import { ChevronDown } from "lucide-react";
import React from "react";
import { tv } from "tailwind-variants";
import { cx, focusRing } from "../../lib/utils";
import { Button } from "../button/button";
import { Menu, MenuContent, MenuTrigger } from "../menu/menu";

// Split button variants using the same base as button but with modifications for the split layout
const splitButtonVariants = tv({
  base: [
    // base
    "relative inline-flex items-center shadow-xs outline-hidden",
    // background transition - only animate colors and shadows, not position
    "transition-[background-color,border-color,box-shadow,color] duration-150 ease-in-out",
    // disabled
    "data-disabled:pointer-events-none data-disabled:shadow-none",
  ],
  variants: {
    variant: {
      default: [
        // inset border with normal shadow using proper Tailwind classes
        "inset-ring-1 inset-ring-white/10 shadow-xs",
        "dark:inset-ring-black/20",
        // background color
        "bg-zinc-900 dark:bg-zinc-50",
        // hover with enhanced inset border
        "hover:inset-ring-white/15 hover:shadow-xs",
        "dark:hover:inset-ring-black/25",
        // disabled
        "data-disabled:bg-zinc-400 data-disabled:inset-ring-white/5 data-disabled:shadow-none",
        "dark:data-disabled:bg-zinc-600 dark:data-disabled:inset-ring-black/10",
      ],
      secondary: [
        // clean secondary without border, just shadow
        "shadow-xs",
        // background color
        "bg-zinc-100 dark:bg-zinc-800",
        // hover with shadow only
        "hover:shadow-xs",
        // disabled
        "data-disabled:bg-zinc-50 data-disabled:shadow-none",
        "dark:data-disabled:bg-zinc-900",
      ],
      destructive: [
        // inset border with normal shadow using proper Tailwind classes
        "inset-ring-1 inset-ring-white/20 shadow-xs",
        "dark:inset-ring-white/10",
        // background color
        "bg-red-500 dark:bg-red-900",
        // hover with enhanced inset border
        "hover:inset-ring-white/25 hover:shadow-xs",
        "dark:hover:inset-ring-white/15",
        // disabled
        "data-disabled:bg-red-300 data-disabled:inset-ring-white/15 data-disabled:shadow-none",
        "dark:data-disabled:bg-red-950 data-disabled:inset-ring-white/5",
      ],
      outline: [
        // inset border with normal shadow using proper Tailwind classes
        "inset-ring-1 inset-ring-black/15 shadow-xs",
        "dark:inset-ring-white/15",
        // background color
        "bg-white dark:bg-zinc-950",
        // hover with enhanced inset border
        "hover:inset-ring-black/20 hover:shadow-xs",
        "dark:hover:inset-ring-white/20",
        // disabled
        "data-disabled:inset-ring-black/10 data-disabled:shadow-none",
        "dark:data-disabled:inset-ring-white/10",
      ],
      ghost: [
        // base
        "shadow-none",
        // hover with just background and shadow, no border
        "bg-transparent hover:shadow-xs",
      ],
    },
    rounded: {
      true: "rounded-full",
      false: "rounded-md",
    },
    size: {
      default: "h-9 text-sm",
      sm: "h-8 text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    rounded: false,
  },
});

// Dropdown trigger button variants
const dropdownTriggerVariants = tv({
  base: [
    // base
    "relative inline-flex items-center justify-center text-center font-medium outline-hidden",
    // background transition - only animate colors and shadows, not position
    "transition-[background-color,border-color,box-shadow,color] duration-150 ease-in-out",
    // disabled
    "disabled:pointer-events-none disabled:shadow-none",
    // focus
    focusRing,
  ],
  variants: {
    variant: {
      default: [
        // text color
        "text-white dark:text-white",
        // hover state
        "hover:bg-zinc-800 dark:hover:bg-zinc-200",
        // disabled
        "disabled:bg-zinc-400 disabled:text-white",
        "dark:disabled:bg-zinc-600 dark:disabled:text-zinc-300",
      ],
      secondary: [
        // text color
        "text-zinc-900 dark:text-zinc-50",
        // hover state
        "hover:bg-zinc-200 dark:hover:bg-zinc-700",
        // disabled
        "disabled:bg-zinc-50 disabled:text-zinc-400",
        "dark:disabled:bg-zinc-900 dark:disabled:text-zinc-600",
      ],
      destructive: [
        // text color
        "text-white dark:text-white",
        // hover state
        "hover:bg-red-600 dark:hover:bg-red-800",
        // disabled
        "disabled:bg-red-300 disabled:text-white",
        "dark:disabled:bg-red-950 dark:disabled:text-red-400",
      ],
      outline: [
        // text color
        "text-zinc-900 dark:text-zinc-50",
        // hover state
        "hover:bg-zinc-100 dark:hover:bg-zinc-800",
        // disabled
        "disabled:text-zinc-400",
        "dark:disabled:text-zinc-600",
      ],
      ghost: [
        // text color
        "text-zinc-900 dark:text-zinc-50",
        // hover state
        "hover:bg-zinc-100 dark:hover:bg-zinc-800",
        // disabled
        "disabled:text-zinc-400",
        "dark:disabled:text-zinc-600",
      ],
    },
    size: {
      default: "w-9 px-0",
      sm: "w-8 px-0",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type SplitButtonVariant
  = | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost";
type SplitButtonSize = "default" | "sm";

interface SplitButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant of the split button.
   * @example
   * ```tsx
   * <SplitButton>Content</SplitButton>
   * ```
   */
  variant?: SplitButtonVariant;
  /**
   * Size of the split button.
   */
  size?: SplitButtonSize;
  /**
   * Whether the split button has rounded corners.
   */
  rounded?: boolean;
  /**
   * Menu content - can be any valid menu content.
   */
  children: React.ReactNode;
  /**
   * Props to pass to the MenuContent component.
   */
  menuProps?: React.ComponentPropsWithoutRef<typeof MenuContent> & {
    sideOffset?: number;
    collisionPadding?: number;
    align?: "start" | "center" | "end";
  };
  /**
   * Callback when the main button is clicked.
   */
  onButtonClick?: () => void;
  /**
   * The main button content.
   */
  buttonContent: React.ReactNode;
  /**
   * Whether the split button is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the main button is in loading state.
   */
  isLoading?: boolean;
  /**
   * Loading text for the main button.
   */
  loadingText?: string;
  /**
   * Left icon for the main button.
   */
  leftIcon?: React.ComponentType<{ className?: string }>;
  /**
   * Custom dropdown icon (defaults to ChevronDown).
   */
  dropdownIcon?: React.ComponentType<{ className?: string }>;
}

/**
 * Split Button.
 *
 * @component
 * @id split-button
 * @name Split Button
 */
const SplitButton = (
    { ref, variant = "default", size = "default", rounded = false, buttonContent, children, onButtonClick, disabled = false, isLoading = false, loadingText, leftIcon, dropdownIcon: DropdownIcon = ChevronDown, menuProps = {}, className, ...props }: SplitButtonProps & { ref?: React.RefObject<HTMLDivElement | null> },
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
        {...props}
      >
        {/* Main Button */}
        <Button
          variant={variant}
          size={size}
          rounded={false} // We handle rounding at the container level
          disabled={disabled}
          isLoading={isLoading}
          loadingText={loadingText}
          leftIcon={leftIcon}
          onClick={onButtonClick}
          className={cx(
          // Remove default button styling that conflicts with split layout
            "shadow-none inset-ring-0 bg-transparent hover:bg-transparent dark:hover:bg-transparent",
            // Add split-specific styling
            "flex-1 justify-start",
            rounded ? "rounded-l-full" : "rounded-l-md",
            "rounded-r-none",
            // Handle padding based on size
            size === "sm" ? "px-2.5" : "px-3",
            // Hover states that match the container
            variant === "default" && [
              "text-white dark:text-white",
              "hover:bg-zinc-800 dark:hover:bg-zinc-200",
              "disabled:text-white disabled:bg-transparent",
              "dark:disabled:text-zinc-300 dark:disabled:bg-transparent",
            ],
            variant === "secondary" && [
              "text-zinc-900 dark:text-zinc-50",
              "hover:bg-zinc-200 dark:hover:bg-zinc-700",
              "disabled:text-zinc-400 disabled:bg-transparent",
              "dark:disabled:text-zinc-600 dark:disabled:bg-transparent",
            ],
            variant === "destructive" && [
              "text-white dark:text-white",
              "hover:bg-red-600 dark:hover:bg-red-800",
              "disabled:text-white disabled:bg-transparent",
              "dark:disabled:text-red-400 dark:disabled:bg-transparent",
            ],
            variant === "outline" && [
              "text-zinc-900 dark:text-zinc-50",
              "hover:bg-zinc-100 dark:hover:bg-zinc-800",
              "disabled:text-zinc-400 disabled:bg-transparent",
              "dark:disabled:text-zinc-600 dark:disabled:bg-transparent",
            ],
            variant === "ghost" && [
              "text-zinc-900 dark:text-zinc-50",
              "hover:bg-zinc-100 dark:hover:bg-zinc-800",
              "disabled:text-zinc-400 disabled:bg-transparent",
              "dark:disabled:text-zinc-600 dark:disabled:bg-transparent",
            ],
          )}
        >
          {buttonContent}
        </Button>

        {/* Separator */}
        <div
          className={cx(
            "w-px h-full",
            variant === "default" && ["bg-white/20 dark:bg-black/20"],
            variant === "secondary" && ["bg-zinc-300 dark:bg-zinc-600"],
            variant === "destructive" && ["bg-white/20 dark:bg-white/10"],
            variant === "outline" && ["bg-zinc-300 dark:bg-zinc-600"],
            variant === "ghost" && ["bg-zinc-300 dark:bg-zinc-600"],
          )}
        />

        {/* Dropdown Menu */}
        <Menu>
          <MenuTrigger
            render={(
              <button
                type="button"
                disabled={disabled}
                className={cx(
                  dropdownTriggerVariants({ variant, size }),
                  rounded ? "rounded-r-full" : "rounded-r-md",
                  "rounded-l-none",
                )}
                aria-label="Open menu"
              />
            )}
          >
            <DropdownIcon className={iconSize} />
          </MenuTrigger>
          <MenuContent
            align="end"
            sideOffset={8}
            collisionPadding={8}
            {...menuProps}
          >
            {children}
          </MenuContent>
        </Menu>
      </div>
    );
  };

SplitButton.displayName = "SplitButton";

export { SplitButton, splitButtonVariants, type SplitButtonProps };
