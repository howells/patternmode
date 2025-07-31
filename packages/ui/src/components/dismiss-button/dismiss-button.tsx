// Tremor DismissButton [v1.0.0]

import { X } from "lucide-react";
import React from "react";

import { config } from "../../lib/config";
import { cx, iconUtils } from "../../lib/utils";

interface DismissButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Callback when the dismiss button is clicked.
   * @example
   * ```tsx
   * <DismissButton>Content</DismissButton>
   * ```
   */
  "onClick"?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Custom icon component for the dismiss button.
   * @default X icon from lucide-react
   */
  "icon"?: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
  /**
   * Icon stroke width.
   * @default config.getIconStrokeWidth()
   */
  "iconStrokeWidth"?: number;
  /**
   * Size of the dismiss button.
   * @default "base"
   */
  "size"?: "sm" | "base" | "lg";
  /**
   * Accessible label for the button.
   * @default "Remove"
   */
  "aria-label"?: string;
}

/**
 * A reusable dismiss/remove button component with consistent styling.
 *
 * Used by Badge, Tag, and other components that need removable functionality.
 * Provides consistent hover, focus, and accessibility states.
 *
 *
 * @id dismiss-button
 * @name Dismiss Button
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <DismissButton onClick={handleRemove} />
 *
 * // Different sizes
 * <DismissButton size="sm" onClick={handleRemove} />
 * <DismissButton size="lg" onClick={handleRemove} />
 *
 * // Custom icon
 * <DismissButton icon={TrashIcon} onClick={handleRemove} />
 *
 * // Custom positioning
 * <DismissButton
 *   onClick={handleRemove}
 *   className="-ml-1"
 *   aria-label="Remove item"
 * />
 * ```
 */
/**
 * A reusable dismiss/remove button with consistent styling.
 *
 * @id dismiss-button
 * @name Dismiss Button
 * @component
 */
const DismissButton = (
    { ref, onClick, icon: IconComponent = X, iconStrokeWidth = config.getIconStrokeWidth(), size = "base", className, "aria-label": ariaLabel = "Remove", ...props }: DismissButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> },
  ) => {
  // Size-based icon sizing
    const iconSizeMap = {
      sm: "xs" as const,
      base: "xs" as const,
      lg: "sm" as const,
    };

    const iconSize = iconSizeMap[size];
    const iconSizeClass = iconUtils.getIconSize(iconSize);

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={cx(
        // Base button styling
          "flex items-center justify-center rounded-full transition-colors",
          // Size-based dimensions
          size === "sm" && "size-4",
          size === "base" && "size-5",
          size === "lg" && "size-6",
          // Color styling (subtle, context-aware)
          "text-zinc-500 dark:text-zinc-400",
          // Hover states
          "hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200",
          // Focus states
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900",
          className,
        )}
        aria-label={ariaLabel}
        {...props}
      >
        <IconComponent
          className={cx(iconSizeClass, "shrink-0")}
          strokeWidth={iconStrokeWidth}
          aria-hidden="true"
        />
      </button>
    );
  };

DismissButton.displayName = "DismissButton";

export { DismissButton, type DismissButtonProps };
