import { config } from "@/lib/config";
import { cx } from "@/lib/utils";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const iconVariants = tv({
  base: "shrink-0",
  variants: {
    size: {
      xs: "size-3", // 12px - for very small contexts
      sm: "size-3.5", // 14px - for small buttons, compact UI
      base: "size-4", // 16px - default size for most UI
      lg: "size-5", // 20px - for larger contexts
      xl: "size-6", // 24px - for headers, prominent UI
      "2xl": "size-8", // 32px - for large display contexts
      "3xl": "size-12", // 48px - for hero sections, empty states
    },
  },
  defaultVariants: {
    size: "base",
  },
});

export interface IconProps extends VariantProps<typeof iconVariants> {
  /** The Lucide icon component to render */
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /** Stroke width for the icon (defaults to global config) */
  strokeWidth?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Centralized Icon component that provides consistent sizing and styling across all UI components.
 *
 * Features:
 * - Consistent sizing system (xs, sm, base, lg, xl, 2xl, 3xl)
 * - Global stroke width configuration
 * - Type-safe icon props
 * - Shrink-0 by default to prevent flex issues
 *
 * Note: Spacing should be handled by parent components or layout classes, not by the icon itself.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Icon icon={Search} />
 *
 * // With size
 * <Icon icon={Plus} size="lg" />
 *
 * // Custom stroke width
 * <Icon icon={Heart} size="lg" strokeWidth={1.5} />
 *
 * // Spacing handled by parent
 * <div className="flex items-center gap-2">
 *   <Icon icon={User} />
 *   <span>Profile</span>
 * </div>
 *
 * // Or with utility classes
 * <Icon icon={Search} className="mr-2" />
 * ```
 */
export function Icon({
  icon: IconComponent,
  size,
  strokeWidth = config.getIconStrokeWidth(),
  className,
}: IconProps) {
  return (
    <IconComponent
      className={cx(iconVariants({ size }), className)}
      strokeWidth={strokeWidth}
    />
  );
}

Icon.displayName = "Icon";

/**
 * Hook to get appropriate icon size based on component size
 */
export function useIconSize(
  componentSize?: string
): "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" {
  switch (componentSize) {
    case "xs":
    case "sm":
    case "icon-sm":
    case "button-sm":
      return "sm";
    case "lg":
    case "icon-lg":
    case "button-lg":
      return "lg";
    case "xl":
    case "2xl":
      return "xl";
    case "3xl":
      return "2xl";
    default:
      return "base";
  }
}

/**
 * Utility to get icon size for a given context (non-hook version)
 */
export function getIconSizeForContext(
  componentSize?: string
): "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" {
  switch (componentSize) {
    case "xs":
    case "sm":
    case "icon-sm":
    case "button-sm":
      return "sm";
    case "lg":
    case "icon-lg":
    case "button-lg":
      return "lg";
    case "xl":
    case "2xl":
      return "xl";
    case "3xl":
      return "2xl";
    default:
      return "base";
  }
}

/**
 * Utility to create icon with automatic sizing based on context
 */
export function createIconWithSize(
  IconComponent: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>,
  contextSize?: string
) {
  const iconSize = getIconSizeForContext(contextSize);

  return function AutoSizedIcon(props: Omit<IconProps, "icon" | "size">) {
    return <Icon icon={IconComponent} size={iconSize} {...props} />;
  };
}

export type { VariantProps as IconVariantProps } from "tailwind-variants";
export { iconVariants };
