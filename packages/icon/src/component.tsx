"use client";

import { DEFAULT_ICON_STROKE_WIDTH } from "@patternmode/constants/defaults";
import { cx } from "@patternmode/utils/cx";
import type React from "react";
import type { IconProps, IconSize } from "./types";
import { iconVariants } from "./variants";

function FallbackIcon({
  className,
  size,
}: {
  className?: string;
  size?: IconSize;
}) {
  const sizeClasses = iconVariants({ size });

  return (
    <div
      className={cx(
        sizeClasses,
        "flex items-center justify-center rounded bg-zinc-100 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
        className
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
  size?: IconSize;
  strokeWidth?: number;
  className?: string;
  fallbackIcon?: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
}) {
  try {
    return (
      <IconComponent
        className={cx(iconVariants({ size }), className)}
        strokeWidth={strokeWidth}
      />
    );
  } catch (_error) {
    const FallbackIconComponent = fallbackIcon;
    return FallbackIconComponent ? (
      <FallbackIconComponent
        className={cx(iconVariants({ size }), className)}
        strokeWidth={strokeWidth}
      />
    ) : (
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
  const finalStrokeWidth = strokeWidth ?? DEFAULT_ICON_STROKE_WIDTH;
  // Handle case where IconComponent is undefined
  if (!IconComponent) {
    const FallbackIconComponent = fallbackIcon;
    return FallbackIconComponent ? (
      <FallbackIconComponent
        className={cx(iconVariants({ size }), className)}
        strokeWidth={finalStrokeWidth}
      />
    ) : (
      <FallbackIcon className={className} size={size} />
    );
  }

  // Check if this is likely a DynamicIcon component by checking if it has a displayName
  const isDynamicIcon =
    IconComponent.displayName?.includes("DynamicIcon") ||
    IconComponent.name?.includes("DynamicIcon");

  if (isDynamicIcon) {
    return (
      <SafeDynamicIcon
        className={className}
        fallbackIcon={fallbackIcon}
        icon={IconComponent}
        size={size}
        strokeWidth={finalStrokeWidth}
      />
    );
  }

  try {
    return (
      <IconComponent
        className={cx(iconVariants({ size }), className)}
        data-testid="icon"
        strokeWidth={finalStrokeWidth}
      />
    );
  } catch (_error) {
    // Handle synchronous errors during icon creation

    const FallbackIconComponent = fallbackIcon;
    return FallbackIconComponent ? (
      <FallbackIconComponent
        className={cx(iconVariants({ size }), className)}
        strokeWidth={finalStrokeWidth}
      />
    ) : (
      <FallbackIcon className={className} size={size} />
    );
  }
}

Icon.displayName = "Icon";

export { Icon };
