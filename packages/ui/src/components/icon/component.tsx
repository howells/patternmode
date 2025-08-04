"use client";

import type { VariantProps } from "tailwind-variants";

import React from "react";
import { tv } from "tailwind-variants";

import { config } from "../../lib/config";
import { env } from "../../lib/env";
import { cx } from "../../lib/utils";

const iconVariants = tv({
  base: "shrink-0",
  variants: {
    size: {
      "xs": "size-3", // 12px - for very small contexts
      "sm": "size-3.5", // 14px - for small buttons, compact UI
      "base": "size-4", // 16px - default size for most UI
      "lg": "size-5", // 20px - for larger contexts
      "xl": "size-6", // 24px - for headers, prominent UI
      "2xl": "size-8", // 32px - for large display contexts
      "3xl": "size-12", // 48px - for hero sections, empty states
    },
  },
  defaultVariants: {
    size: "base",
  },
});

export type IconProps = {
  /**
   * The Lucide icon component to render.
   * Should be a React component that accepts className and strokeWidth props.
   */
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /**
   * Visual size of the icon affecting its dimensions.
   * Xs (12px) for very small contexts, sm (14px) for small buttons,
   * base (16px) default size, lg (20px) for larger contexts,
   * xl (24px) for headers, 2xl (32px) for display, 3xl (48px) for hero sections.
   */
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  /**
   * Custom stroke width for the icon lines.
   * When not specified, uses the global configuration default.
   * Higher values create bolder lines, lower values create thinner lines.
   */
  strokeWidth?: number;
  /**
   * Additional CSS classes to apply to the icon.
   * Can be used for custom styling, colors, or spacing adjustments.
   */
  className?: string;
  /**
   * Fallback icon component to display if the main icon fails to render.
   * Provides graceful degradation when icons are missing or fail to load.
   */
  fallbackIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
} & VariantProps<typeof iconVariants>;

function FallbackIcon({
  className,
  size,
}: {
  className?: string;
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
}) {
  const sizeClasses = iconVariants({ size });

  return (
    <div
      className={cx(
        sizeClasses,
        "flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded text-xs text-zinc-500 dark:text-zinc-400",
        className,
      )}
      title="Icon not found"
    >
      ?
    </div>
  );
}

function SafeDynamicIcon({
  icon: IconComponent,
  size,
  strokeWidth,
  className,
  fallbackIcon,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  strokeWidth?: number;
  className?: string;
  fallbackIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}) {
  try {
    return (
      <IconComponent
        className={cx(iconVariants({ size }), className)}
        strokeWidth={strokeWidth}
      />
    );
  }
  catch (error) {
    if (env.NODE_ENV === "development") {
      console.warn("[Icon] Failed to render dynamic icon:", error);
    }

    const FallbackIconComponent = fallbackIcon;
    return FallbackIconComponent
      ? (
          <FallbackIconComponent
            className={cx(iconVariants({ size }), className)}
            strokeWidth={strokeWidth}
          />
        )
      : (
          <FallbackIcon className={className} size={size} />
        );
  }
}

/**
 * Centralized icon display component with consistent sizing and error handling.
 */
function Icon({
  icon: IconComponent,
  size,
  strokeWidth,
  className,
  fallbackIcon,
}: IconProps) {
  const finalStrokeWidth = strokeWidth ?? config.getIconStrokeWidth();
  // Handle case where IconComponent is undefined
  if (!IconComponent) {
    const FallbackIconComponent = fallbackIcon;
    return FallbackIconComponent
      ? (
          <FallbackIconComponent
            className={cx(iconVariants({ size }), className)}
            strokeWidth={finalStrokeWidth}
          />
        )
      : (
          <FallbackIcon className={className} size={size} />
        );
  }

  // Check if this is likely a DynamicIcon component by checking if it has a displayName
  const isDynamicIcon
    = IconComponent.displayName?.includes("DynamicIcon")
      || IconComponent.name?.includes("DynamicIcon");

  if (isDynamicIcon) {
    return (
      <SafeDynamicIcon
        icon={IconComponent}
        size={size}
        strokeWidth={finalStrokeWidth}
        className={className}
        fallbackIcon={fallbackIcon}
      />
    );
  }

  try {
    return (
      <IconComponent
        data-testid="icon"
        className={cx(iconVariants({ size }), className)}
        strokeWidth={finalStrokeWidth}
      />
    );
  }
  catch (error) {
    // Handle synchronous errors during icon creation
    if (env.NODE_ENV === "development") {
      console.warn("[Icon] Failed to render icon:", error);
    }

    const FallbackIconComponent = fallbackIcon;
    return FallbackIconComponent
      ? (
          <FallbackIconComponent
            className={cx(iconVariants({ size }), className)}
            strokeWidth={finalStrokeWidth}
          />
        )
      : (
          <FallbackIcon className={className} size={size} />
        );
  }
}

Icon.displayName = "Icon";

export { Icon };

/**
 * Hook to get appropriate icon size based on component size.
 */
export function useIconSize(
  componentSize?: string,
): "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" {
  switch (componentSize) {
    case "xs":
    case "icon-xs":
      return "xs";
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
 * Utility to get icon size for a given context (non-hook version).
 */
export function getIconSizeForContext(
  componentSize?: string,
): "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" {
  switch (componentSize) {
    case "xs":
    case "icon-xs":
      return "xs";
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
 * Utility to create icon with automatic sizing based on context.
 */
export function createIconWithSize(
  IconComponent: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>,
  contextSize?: string,
) {
  const iconSize = getIconSizeForContext(contextSize);

  return function AutoSizedIcon(props: Omit<IconProps, "icon" | "size">) {
    return <Icon icon={IconComponent} size={iconSize} {...props} />;
  };
}

export type { VariantProps as IconVariantProps } from "tailwind-variants";
export { iconVariants };
