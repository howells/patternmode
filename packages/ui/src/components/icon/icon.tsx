"use client";

/**
 * Icon Components.
 *
 * Centralized icon system providing consistent sizing, styling, and error handling
 * for Lucide React icons across all UI components. Features graceful fallbacks,
 * dynamic icon loading support, and flexible sizing options.
 *
 * Features:
 * - Consistent sizing system (xs, sm, base, lg, xl, 2xl, 3xl)
 * - Global stroke width configuration
 * - Type-safe icon props with Lucide React integration
 * - Graceful error handling with fallback display
 * - Dynamic icon loading support with error boundaries
 * - Utility hooks for context-aware sizing
 * - Shrink-0 by default to prevent flex layout issues.
 *
 * @category utility
 * @icon Smile
 * @example
 * ```tsx
 * // Basic icon usage
 * <Icon icon={Search} />
 * <Icon icon={Plus} size="lg" />
 * <Icon icon={Heart} strokeWidth={1.5} />
 *
 * // Context-aware sizing
 * <Button size="sm">
 *   <Icon icon={Plus} size={useIconSize("sm")} />
 *   Add Item
 * </Button>
 *
 * // With custom fallback icon
 * <Icon
 *   icon={UnknownIcon}
 *   fallbackIcon={AlertTriangle}
 * />
 *
 * // In layouts with proper spacing
 * <HStack gap={2} align="center">
 *   <Icon icon={User} />
 *   <Text>Profile Settings</Text>
 * </HStack>
 *
 * // Different sizes for different contexts
 * <VStack gap={4}>
 *   <Icon icon={Home} size="xs" />     // 12px - compact UI
 *   <Icon icon={Search} size="sm" />   // 14px - small buttons
 *   <Icon icon={Plus} size="base" />   // 16px - default
 *   <Icon icon={Star} size="lg" />     // 20px - larger contexts
 *   <Icon icon={Heart} size="xl" />    // 24px - headers
 *   <Icon icon={Trophy} size="2xl" />  // 32px - display
 *   <Icon icon={Award} size="3xl" />   // 48px - hero sections
 * </VStack>
 *
 * // Auto-sized icons for components
 * const PlusIcon = createIconWithSize(Plus, "button-lg");
 * <Button size="lg">
 *   <PlusIcon />
 *   Large Button
 * </Button>
 *
 * // Navigation with icons
 * <StackedList>
 *   <StackedList.Item left={<Icon icon={Dashboard} />}>
 *     <StackedList.Content title="Dashboard" />
 *   </StackedList.Item>
 *   <StackedList.Item left={<Icon icon={Settings} />}>
 *     <StackedList.Content title="Settings" />
 *   </StackedList.Item>
 * </StackedList>
 * ```
 */

import type { VariantProps } from "tailwind-variants";

import React from "react";
import { tv } from "tailwind-variants";

import { config } from "../../lib/config";
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
   */
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /**
   * Stroke width for the icon (defaults to global config).
   */
  strokeWidth?: number;
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * Fallback icon to show if main icon fails to render.
   */
  fallbackIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
} & VariantProps<typeof iconVariants>;

/**
 * Icon display component with consistent sizing and styling for visual elements.
 *
 * @id icon
 * @name Icon
 * @icon Star
 * @category ui
 * @component
 * @param props - Component properties.
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
        className,
      )}
      title="Icon not found"
    >
      ?
    </div>
  );
}

/**
 * Safe wrapper for DynamicIcon components that handles missing icon errors.
 */
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
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setHasError(false);
  }, [IconComponent]);

  if (hasError) {
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

  return (
    <ErrorBoundary
      fallback={
        fallbackIcon
          ? (() => {
              const FallbackIconComponent = fallbackIcon;
              return (
                <FallbackIconComponent
                  className={cx(iconVariants({ size }), className)}
                  strokeWidth={strokeWidth}
                />
              );
            })()
          : (
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
 * Simple error boundary component for catching icon rendering errors.
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
 * - Graceful error handling with fallback display.
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
 * // Custom fallback icon
 * <Icon icon={InvalidIcon} fallbackIcon={AlertTriangle} />
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
/**
 * Icon display component with consistent sizing and styling for visual elements.
 *
 * @id icon
 * @name Icon
 * @icon Star
 * @category ui
 * @component
 * @param props - Component properties.
 * @param props.icon - The Lucide icon component to render.
 * @param props.size - Icon size variant (xs, sm, base, lg, xl, 2xl, 3xl).
 * @param props.strokeWidth - Stroke width for the icon (defaults to global config).
 * @param props.className - Additional CSS classes.
 * @param props.fallbackIcon - Fallback icon to show if main icon fails to render.
 */
export function Icon({
  icon: IconComponent,
  size,
  strokeWidth = config.getIconStrokeWidth(),
  className,
  fallbackIcon,
}: IconProps) {
  // Handle case where IconComponent is undefined
  if (!IconComponent) {
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

  // Check if this is likely a DynamicIcon component by checking if it has a displayName
  const isDynamicIcon
    = IconComponent.displayName?.includes("DynamicIcon")
      || IconComponent.name?.includes("DynamicIcon");

  if (isDynamicIcon) {
    return (
      <SafeDynamicIcon
        icon={IconComponent}
        size={size}
        strokeWidth={strokeWidth}
        className={className}
        fallbackIcon={fallbackIcon}
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
  }
  catch (error) {
    // Handle synchronous errors during icon creation
    if (process.env.NODE_ENV === "development") {
      console.warn("[Icon] Failed to render icon:", error);
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

Icon.displayName = "Icon";

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
