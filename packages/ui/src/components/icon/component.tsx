"use client";

import type { IconProps, IconSize } from "./types";

import React from "react";
import { defaultConfig } from "../../config/default-config";
import { cx } from "../../utils/cx";
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
  size?: IconSize;
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
    console.warn("[Icon] Failed to render dynamic icon:", error);

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
  const finalStrokeWidth = strokeWidth ?? defaultConfig.components.iconStrokeWidth;
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
    console.warn("[Icon] Failed to render icon:", error);

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
