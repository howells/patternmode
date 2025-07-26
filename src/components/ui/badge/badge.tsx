// Tremor Badge [v1.0.0]

import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { X } from "lucide-react";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { config } from "@/lib/config";
import { cx, iconUtils, type ComponentWithIconsProps } from "@/lib/utils";
import {
  getVariantClasses,
  type GlobalSemanticVariant,
  type TailwindColor,
} from "@/lib/variants";
import { DismissButton } from "../dismiss-button/dismiss-button";
import { Dot } from "../dot/dot";

// Badge-specific variant type (semantic + all Tailwind colors)
export type BadgeVariant = GlobalSemanticVariant | TailwindColor;

// Badge variant configurations - generate dynamically for all supported colors
const badgeVariantStyles = {
  // Global semantic variants
  default: getVariantClasses("default"),
  neutral: getVariantClasses("neutral"),
  success: getVariantClasses("success"),
  info: getVariantClasses("info"),
  warning: getVariantClasses("warning"),
  error: getVariantClasses("error"),
  critical: getVariantClasses("critical"),
  positive: getVariantClasses("positive"),
  negative: getVariantClasses("negative"),
  // All Tailwind colors
  slate: getVariantClasses("slate"),
  gray: getVariantClasses("gray"),
  zinc: getVariantClasses("zinc"),
  stone: getVariantClasses("stone"),
  red: getVariantClasses("red"),
  orange: getVariantClasses("orange"),
  amber: getVariantClasses("amber"),
  yellow: getVariantClasses("yellow"),
  lime: getVariantClasses("lime"),
  green: getVariantClasses("green"),
  emerald: getVariantClasses("emerald"),
  teal: getVariantClasses("teal"),
  cyan: getVariantClasses("cyan"),
  sky: getVariantClasses("sky"),
  blue: getVariantClasses("blue"),
  indigo: getVariantClasses("indigo"),
  violet: getVariantClasses("violet"),
  purple: getVariantClasses("purple"),
  fuchsia: getVariantClasses("fuchsia"),
  pink: getVariantClasses("pink"),
  rose: getVariantClasses("rose"),
} as const;

// Define variants structure using badge-specific variants
const badgeVariantsDefinition = {
  variants: {
    variant: badgeVariantStyles,
    size: {
      sm: "px-1.5 py-0.5 text-xs font-medium",
      base: "px-2 py-1 text-sm font-medium",
      lg: "px-2.5 py-1.5 text-sm font-medium",
    },
    bordered: {
      true: "ring-1 ring-inset",
      false: "",
    },
    rounded: {
      true: "rounded-full",
      false: "rounded-md",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "base",
    bordered: false,
    rounded: false,
  },
} as const;

// Update badge variants to handle dismiss button padding like Tag does
const badgeVariants = tv({
  base: cx(
    "inline-flex items-center gap-x-1.5 whitespace-nowrap rounded-md font-medium"
  ),
  ...badgeVariantsDefinition,
  compoundVariants: [
    // Adjust right padding when dismiss button is present
    {
      size: "sm",
      class: "has-[button]:pr-1",
    },
    {
      size: "base",
      class: "has-[button]:pr-1",
    },
    {
      size: "lg",
      class: "has-[button]:pr-1.5",
    },
    // Add extra horizontal padding for rounded badges to prevent cramped appearance
    {
      rounded: true,
      size: "sm",
      class: "px-2.5", // increased from px-1.5
    },
    {
      rounded: true,
      size: "base",
      class: "px-3", // increased from px-2
    },
    {
      rounded: true,
      size: "lg",
      class: "px-3.5", // increased from px-2.5
    },
    // When rounded AND has dismiss button, adjust right padding accordingly
    {
      rounded: true,
      size: "sm",
      class: "has-[button]:pr-1.5", // slightly more than regular rounded
    },
    {
      rounded: true,
      size: "base",
      class: "has-[button]:pr-1.5", // slightly more than regular rounded
    },
    {
      rounded: true,
      size: "lg",
      class: "has-[button]:pr-2", // slightly more than regular rounded
    },
  ],
});

// Map badge sizes to icon sizes
const badgeToIconSizeMap = {
  sm: "xs",
  base: "sm",
  lg: "base",
} as const;

/**
 * Badge component props.
 * @extends useRender.ComponentProps<"span">
 * @extends VariantProps<typeof badgeVariants>
 * @extends ComponentWithIconsProps
 */
interface BadgeProps
  extends useRender.ComponentProps<"span">,
    VariantProps<typeof badgeVariants>,
    ComponentWithIconsProps {
  /**
   * Whether to show a border around the badge.
   * @default false
   */
  bordered?: boolean;
  /**
   * Whether to use full border radius for a pill shape.
   * Automatically adds extra horizontal padding for better visual balance.
   * @default false
   */
  rounded?: boolean;
  /**
   * Whether to show a status dot instead of icons.
   * @default false
   */
  statusDot?: boolean;
  /**
   * Whether to animate the status dot for active statuses.
   * @default false
   */
  statusAnimated?: boolean;
  /**
   * Whether the badge can be dismissed.
   * When true, a dismiss button (X) will be shown.
   */
  dismissible?: boolean;
  /**
   * Callback function called when the dismiss button is clicked.
   */
  onDismiss?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Custom icon component for the dismiss button.
   * @default X icon from lucide-react
   */
  dismissIcon?: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
}

/**
 * A small status or label component built with Base UI's useRender pattern.
 *
 * Based on Base UI's useRender hook for flexible rendering, providing status indicators,
 * labels, and tags with multiple color variants and sizes. Supports left and right icons
 * for enhanced visual context, and an optional dismiss button for removable badges.
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Badge>New</Badge>
 *
 * // With variants
 * <Badge variant="success">Completed</Badge>
 * <Badge variant="error">Failed</Badge>
 *
 * // With icons
 * <Badge leftIcon={CheckIcon} variant="success">Verified</Badge>
 * <Badge rightIcon={ArrowRightIcon}>Continue</Badge>
 *
 * // Different sizes
 * <Badge size="sm">Small</Badge>
 * <Badge size="lg">Large</Badge>
 *
 * // With or without border
 * <Badge bordered>Bordered</Badge>
 *
 * // Rounded (pill-shaped) with automatic extra padding
 * <Badge rounded>Pill Badge</Badge>
 * <Badge rounded variant="success">Success Pill</Badge>
 *
 * // With status dot (overrides icons)
 * <Badge statusDot>Ready</Badge>
 * <Badge statusDot statusAnimated>Building</Badge>
 * <Badge statusDot variant="error">Error Status</Badge>
 *
 * // Color variants
 * <Badge variant="purple">Purple Badge</Badge>
 * <Badge variant="emerald">Emerald Badge</Badge>
 * <Badge variant="pink" rounded>Pink Pill</Badge>
 *
 * // With dismiss button
 * <Badge dismissible onDismiss={() => handleRemove()}>Dismissible</Badge>
 * <Badge dismissible onDismiss={handleRemove} dismissIcon={TrashIcon}>Custom Dismiss</Badge>
 *
 * // Combination with icons and dismiss
 * <Badge
 *   leftIcon={UserIcon}
 *   dismissible
 *   onDismiss={handleRemoveUser}
 *   variant="neutral"
 * >
 *   John Doe
 * </Badge>
 * ```
 */
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      render = <span />,
      variant,
      size = "base",
      bordered,
      rounded,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      iconStrokeWidth = config.getIconStrokeWidth(),
      children,
      dismissible = false,
      onDismiss,
      dismissIcon: DismissIcon = X,
      statusDot,
      statusAnimated = false,
      className,
      ...otherProps
    }: BadgeProps,
    forwardedRef
  ) => {
    const hasChildren = children != null && children !== "";
    const hasLeftIcon = LeftIcon != null;
    const hasRightIcon = RightIcon != null;
    const hasDismissButton = dismissible && onDismiss != null;

    // Get appropriate icon size for badge size
    const iconSize = badgeToIconSizeMap[size];
    const iconSizeClass = iconUtils.getIconSize(iconSize);
    const iconClassName = `${iconSizeClass} shrink-0`;

    // Use default variant when statusDot is true (unless custom color or variant provided)
    const effectiveVariant = variant;

    const renderBadgeContent = () => {
      const hasLeftIcon = LeftIcon && !statusDot; // Dot overrides left icon
      const hasRightIcon = RightIcon && !statusDot; // Dot overrides right icon
      const hasDismissButton = Boolean(onDismiss);
      const hasStatusDot = Boolean(statusDot);

      // Status dot size mapping - one size smaller than badge for better balance
      const statusDotSize =
        size === "sm" ? "sm" : size === "base" ? "sm" : "default";

      // Use statusAnimated prop directly since statusDot is just boolean
      const shouldAnimate = statusAnimated;

      return (
        <>
          {hasStatusDot && (
            <Dot
              variant={effectiveVariant}
              size={statusDotSize}
              animated={shouldAnimate}
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
                size === "sm" && "-ml-1",
                size === "base" && "-ml-1",
                size === "lg" && "-ml-1.5"
              )}
            />
          )}
        </>
      );
    };

    const defaultProps: useRender.ElementProps<"span"> = {
      className: cx(
        badgeVariants({ variant: effectiveVariant, size, bordered, rounded }),
        className
      ),
      children: renderBadgeContent(),
    };

    const element = useRender({
      render,
      ref: forwardedRef,
      props: mergeProps<"span">(defaultProps, otherProps),
    });

    return element;
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants, type BadgeProps };
