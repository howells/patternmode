import type { ComponentWithIconsProps } from "../../lib/utils";
import type { BadgeVariant } from "./types";
import { useRender } from "@base-ui-components/react/use-render";
import { X } from "lucide-react";

import React from "react";
import { config } from "../../lib/config";
import { cx, iconUtils } from "../../lib/utils";
import {
  getColorClasses,
} from "../../lib/variants";
import { badgeToIconSizeMap, badgeVariants, dotIndicatorVariants } from "./variants";
import { DismissButton } from "../dismiss-button/component";

type BadgeProps = {
  /**
   * Whether to show a border around the badge.
   * Adds a subtle ring border for enhanced visual definition.
   */
  border?: boolean;
  /**
   * Whether to use full border radius for a pill shape.
   * Automatically adds extra horizontal padding for better visual balance.
   */
  rounded?: boolean;
  /**
   * Whether to show a status dot instead of icons.
   * Displays a colored dot indicator on the left side.
   */
  statusDot?: boolean;
  /**
   * Whether to animate the status dot for active statuses.
   * Creates a pulsing animation with ping effect when true.
   */
  statusAnimated?: boolean;
  /**
   * Whether the badge can be dismissed.
   * When true, a dismiss button (X) will be shown on the right.
   */
  dismissible?: boolean;
  /**
   * Callback function called when the dismiss button is clicked.
   * Used for handling badge removal or dismissal actions.
   */
  onDismiss?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Custom icon component for the dismiss button.
   * Defaults to X icon from lucide-react.
   */
  dismissIcon?: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
  /**
   * Visual style variant of the badge.
   * Controls color scheme and supports semantic variants plus all Tailwind colors.
   */
  variant?: BadgeVariant;
  /**
   * Size variant of the badge.
   * Controls padding, text size, and overall dimensions.
   */
  size?: "xs" | "sm" | "base" | "lg";
} & useRender.ComponentProps<"span"> & ComponentWithIconsProps;

/**
 * Small status indicator component for labels, counts, and categorical information.
 */
const Badge = (
  { ref: forwardedRef, render = <span />, variant, size = "base", border, rounded, leftIcon: LeftIcon, rightIcon: RightIcon, iconStrokeWidth = config.getIconStrokeWidth(), children, dismissible: _dismissible = false, onDismiss, dismissIcon: DismissIcon = X, statusDot, statusAnimated = false, className, ...otherProps }: BadgeProps & { ref?: React.RefObject<HTMLSpanElement | null> },
) => {
  // Get appropriate icon size for badge size
  const iconSize = badgeToIconSizeMap[size];
  const iconSizeClass = iconUtils.getIconSize(iconSize);
  const iconClassName = `${iconSizeClass} shrink-0`;

  // Use default variant when statusDot is true (unless custom color or variant provided)
  const effectiveVariant = variant;

  const renderBadgeContent = () => {
    const hasLeftIcon = LeftIcon && !statusDot; // Dot overrides left icon
    const hasRightIcon = RightIcon && !statusDot; // Dot overrides right icon
    const hasDismissButton = Boolean(_dismissible || onDismiss);
    const hasStatusDot = Boolean(statusDot);

    // Status dot size mapping - one size smaller than badge for better balance
    const statusDotSize
          = size === "xs" ? "sm" : size === "sm" ? "sm" : size === "base" ? "sm" : "default";

    // Use statusAnimated prop directly since statusDot is just boolean
    const shouldAnimate = statusAnimated;

    return (
      <>
        {hasStatusDot && (
          <span
            className={cx(
              dotIndicatorVariants({ size: statusDotSize, animated: shouldAnimate }),
              getColorClasses(effectiveVariant || "default").bgSolid,
              // Add dynamic before: color for animation
              shouldAnimate && `before:bg-${getColorClasses(effectiveVariant || "default").color}-500`,
            )}
            aria-hidden="true"
          />
        )}
        {hasLeftIcon && (
          <LeftIcon className={iconClassName} strokeWidth={iconStrokeWidth} />
        )}
        {children}
        {hasRightIcon && (
          <RightIcon
            className={iconClassName}
            strokeWidth={iconStrokeWidth}
          />
        )}
        {hasDismissButton && (
          <DismissButton
            onClick={onDismiss}
            icon={DismissIcon}
            iconStrokeWidth={iconStrokeWidth}
            size={size}
            className={cx(
              // Negative margin to pull closer like Tag does
              size === "xs" && "-ml-0.5",
              size === "sm" && "-ml-1",
              size === "base" && "-ml-1",
              size === "lg" && "-ml-1.5",
            )}
          />
        )}
      </>
    );
  };

  const defaultProps: useRender.ElementProps<"span"> & { "data-testid": string } = {
    "className": cx(
      badgeVariants({ variant: effectiveVariant, size, border, rounded }),
      className,
    ),
    "children": renderBadgeContent(),
    "data-testid": "badge",
  };

  const element = useRender({
    render,
    ref: forwardedRef ?? undefined,
    props: { ...defaultProps, ...otherProps },
  });

  return element;
};

Badge.displayName = "Badge";

export { Badge, type BadgeProps };
