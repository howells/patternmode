"use client";

import { config } from "../../lib/config";
import { cx } from "../../lib/utils";
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
  /** Fallback content to show if icon fails to render */
  fallback?: React.ReactNode;
}

/**
 * Fallback icon component that shows a question mark in a subtle container
 *
 * @id icon
 * @name Icon
 */
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
        className
      )}
      title="Icon not found"
    >
      ?
    </div>
  );
}

/**
 * Safe wrapper for DynamicIcon components that handles missing icon errors
 */
function SafeDynamicIcon({
  icon: IconComponent,
  size,
  strokeWidth,
  className,
  fallback,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  strokeWidth?: number;
  className?: string;
  fallback?: React.ReactNode;
}) {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setHasError(false);
  }, [IconComponent]);

  if (hasError) {
    return fallback ? (
      <div className={cx(iconVariants({ size }), className)}>{fallback}</div>
    ) : (
      <FallbackIcon className={className} size={size} />
    );
  }

  return (
    <ErrorBoundary
      fallback={
        fallback ? (
          <div className={cx(iconVariants({ size }), className)}>
            {fallback}
          </div>
        ) : (
          <FallbackIcon className={className} size={size} />
        )
      }
      onError={() => setHasError(true)}
    >
      <IconComponent
        className={cx(iconVariants({ size }), className)}
        strokeWidth={strokeWidth}
      />
    </ErrorBoundary>
  );
}

/**
 * Simple error boundary component for catching icon rendering errors
 */
class ErrorBoundary extends React.Component<
  {
    children: React.ReactNode;
    fallback: React.ReactNode;
    onError?: () => void;
  },
  { hasError: boolean }
> {
  constructor(props: {
    children: React.ReactNode;
    fallback: React.ReactNode;
    onError?: () => void;
  }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  override componentDidCatch(error: Error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Icon] Failed to render icon:", error);
    }
    this.props.onError?.();
  }

  override render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

/**
 * Centralized Icon component that provides consistent sizing and styling across all UI components.
 *
 * Features:
 * - Consistent sizing system (xs, sm, base, lg, xl, 2xl, 3xl)
 * - Global stroke width configuration
 * - Type-safe icon props
 * - Shrink-0 by default to prevent flex issues
 * - Graceful error handling with fallback display
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
 * // Custom fallback
 * <Icon icon={InvalidIcon} fallback={<span>⚠️</span>} />
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
  fallback,
}: IconProps) {
  // Check if this is likely a DynamicIcon component by checking if it has a displayName
  const isDynamicIcon =
    IconComponent.displayName?.includes("DynamicIcon") ||
    IconComponent.name?.includes("DynamicIcon");

  if (isDynamicIcon) {
    return (
      <SafeDynamicIcon
        icon={IconComponent}
        size={size}
        strokeWidth={strokeWidth}
        className={className}
        fallback={fallback}
      />
    );
  }

  try {
    return (
      <IconComponent
        className={cx(iconVariants({ size }), className)}
        strokeWidth={strokeWidth}
      />
    );
  } catch (error) {
    // Handle synchronous errors during icon creation
    if (process.env.NODE_ENV === "development") {
      console.warn("[Icon] Failed to render icon:", error);
    }

    return fallback ? (
      <div className={cx(iconVariants({ size }), className)}>{fallback}</div>
    ) : (
      <FallbackIcon className={className} size={size} />
    );
  }
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
 * Utility to get icon size for a given context (non-hook version)
 */
export function getIconSizeForContext(
  componentSize?: string
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
