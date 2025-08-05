/**
 * Icon Rendering Utilities
 *
 * Reusable utilities for rendering icons with consistent sizing across components.
 * Centralizes the icon + size + strokeWidth pattern used by Button, ToggleGroup, and other components.
 *
 * ## Migration Guide
 *
 * **Before (in Button component):**
 * ```ts
 * function renderButtonIcon(IconComponent, size, iconStrokeWidth) {
 *   const iconSize = getIconSizeForContext(size);
 *   return <Icon icon={IconComponent} size={iconSize} strokeWidth={iconStrokeWidth} />;
 * }
 * ```
 *
 * **After:**
 * ```ts
 * import { renderIcon } from "../../lib/icon-utils";
 *
 * // Direct usage
 * renderIcon(IconComponent, size, iconStrokeWidth)
 *
 * // Or for components with multiple icons
 * const { renderLeftIcon, renderRightIcon } = createIconRenderers(size, iconStrokeWidth);
 * ```
 *
 * **ToggleGroup migration example:**
 * ```ts
 * // Before:
 * const iconSize = getIconSizeForContext(finalSize);
 * <Icon icon={LeftIcon} size={iconSize} strokeWidth={iconStrokeWidth} />
 *
 * // After:
 * renderIcon(LeftIcon, finalSize, iconStrokeWidth)
 * ```
 */

import React from "react";
import { getIconSizeForContext, Icon } from "../components/icon/component";
import { config } from "./config";

/**
 * Icon component type used across the UI library
 */
export type IconComponent = React.ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

/**
 * Utility function to render an icon with appropriate sizing for any component context.
 * This centralizes the pattern of using getIconSizeForContext + Icon component.
 *
 * @param IconComponent - The icon component to render
 * @param size - The component size context (used to determine appropriate icon size)
 * @param iconStrokeWidth - Custom stroke width, defaults to global config value
 * @returns JSX element with properly sized icon
 */
export function renderIcon(
  IconComponent: IconComponent,
  size: string | undefined,
  iconStrokeWidth: number = config.getIconStrokeWidth(),
): React.ReactElement {
  const iconSize = getIconSizeForContext(size);
  return React.createElement(Icon, {
    icon: IconComponent,
    size: iconSize,
    strokeWidth: iconStrokeWidth,
  });
}

/**
 * Hook-style utility for components that need consistent icon rendering.
 * Returns a render function bound to the component's size and stroke width.
 *
 * @param size - The component size context
 * @param iconStrokeWidth - Custom stroke width, defaults to global config value
 * @returns Function that renders icons with consistent sizing
 */
export function useIconRenderer(
  size: string | undefined,
  iconStrokeWidth: number = config.getIconStrokeWidth(),
) {
  return React.useCallback(
    (IconComponent: IconComponent) => renderIcon(IconComponent, size, iconStrokeWidth),
    [size, iconStrokeWidth],
  );
}

/**
 * Utility for components that need to render multiple icons (left/right) consistently.
 *
 * @param size - The component size context
 * @param iconStrokeWidth - Custom stroke width, defaults to global config value
 * @returns Object with utilities for rendering left/right icons
 */
export function createIconRenderers(
  size: string | undefined,
  iconStrokeWidth: number = config.getIconStrokeWidth(),
) {
  const renderIconFn = (IconComponent: IconComponent) =>
    renderIcon(IconComponent, size, iconStrokeWidth);

  return {
    /**
     * Render a single icon with consistent sizing
     */
    renderIcon: renderIconFn,

    /**
     * Render left icon if provided
     */
    renderLeftIcon: (LeftIcon: IconComponent | undefined) =>
      LeftIcon ? renderIconFn(LeftIcon) : null,

    /**
     * Render right icon if provided
     */
    renderRightIcon: (RightIcon: IconComponent | undefined) =>
      RightIcon ? renderIconFn(RightIcon) : null,
  };
}
