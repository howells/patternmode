// Tremor DismissButton [v1.0.0]

import { X } from "lucide-react";
import React from "react";

import { config } from "../../../lib/config";
import { cx, iconUtils } from "../../../lib/utils";

type DismissButtonProps = {
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
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Close button component for dismissing modals, alerts, and temporary content.
 *
 * @id dismiss-button
 * @name DismissButton
 * @icon X
 * @category utility
 * @component
 * @param props - Component properties.
 * @param props.onClick - Callback when the dismiss button is clicked.
 * @param props.icon - Custom icon component for the dismiss button (default: X icon).
 * @param props.iconStrokeWidth - Icon stroke width.
 * @param props.size - Size of the dismiss button (sm, base, lg).
 * @param props.aria-label - Accessible label for the button (default: "Remove").
 * @param props.className - Additional CSS classes.
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
