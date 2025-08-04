import { X } from "lucide-react";
import React from "react";

import { config } from "../../lib/config";
import { cx, focusRing, iconUtils } from "../../lib/utils";

type DismissButtonProps = {
  /**
   * Callback when the dismiss button is clicked.
   * @example
   * ```tsx
   * <DismissButton onClick={() => {}} />
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
   * Aligns with the control height system for consistent square sizing.
   * @default "base"
   */
  "size"?: "xs" | "sm" | "base" | "lg";
  /**
   * Accessible label for the button.
   * @default "Remove"
   */
  "aria-label"?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Close button component for dismissing modals, alerts, and temporary content.
 */
const DismissButton = (
  { ref, onClick, icon: IconComponent = X, iconStrokeWidth = config.getIconStrokeWidth(), size = "base", className, "aria-label": ariaLabel = "Remove", ...props }: DismissButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> },
) => {
  // Size-based icon sizing
  const iconSizeMap = {
    xs: "xs" as const,
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
      data-testid="dismiss-button"
      className={cx(
        // Base button styling
        "flex items-center justify-center rounded-full transition-colors",
        // Size-based dimensions
        size === "xs" && "size-4",
        size === "sm" && "size-5",
        size === "base" && "size-6",
        size === "lg" && "size-8",
        // Color styling (low opacity for any background)
        "text-zinc-700/60 dark:text-zinc-300/70",
        // Hover states
        "hover:bg-zinc-600/10 hover:text-zinc-700/80 dark:hover:bg-zinc-300/15 dark:hover:text-zinc-300/90",
        // Focus states
        focusRing,
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
