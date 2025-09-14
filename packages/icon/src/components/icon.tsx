"use client";

import { DEFAULT_ICON_STROKE_WIDTH } from "@patternmode/constants/defaults";
import { cx } from "@patternmode/utils/cx";
import type { IconProps, IconSize } from "../types";
import { iconVariants } from "../variants";

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

/**
 * Centralized icon display component with consistent sizing and error handling.
 */
export function Icon({
  icon: IconComponent,
  size,
  strokeWidth,
  className,
  fallbackIcon,
}: IconProps) {
  const finalStrokeWidth = strokeWidth ?? DEFAULT_ICON_STROKE_WIDTH;
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

  try {
    return (
      <IconComponent
        className={cx(iconVariants({ size }), className)}
        data-testid="icon"
        strokeWidth={finalStrokeWidth}
      />
    );
  } catch (_error) {
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
