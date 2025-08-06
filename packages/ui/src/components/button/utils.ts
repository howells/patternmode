import type { ButtonSize, IconButtonSize } from "./types";

/**
 * Maps button sizes to appropriate loader sizes.
 * Used for determining the correct Loader component size based on button size.
 */
export const getLoaderSize = (buttonSize: ButtonSize | IconButtonSize): "xs" | "sm" | "base" => {
  const sizeMap: Record<ButtonSize | IconButtonSize, "xs" | "sm" | "base"> = {
    // Text button sizes
    "xs": "xs",
    "sm": "xs",
    "default": "sm",
    "lg": "base",
    // Icon button sizes
    "icon-xs": "xs",
    "icon-sm": "xs",
    "icon": "sm",
    "icon-lg": "base",
  };

  return sizeMap[buttonSize] || "sm";
};

/**
 * Maps button sizes to icon container CSS classes.
 * Used for determining the correct container size for icons and loaders.
 */
export const getIconContainerSize = (buttonSize: ButtonSize | IconButtonSize): string => {
  const sizeMap: Record<ButtonSize | IconButtonSize, string> = {
    // Text button sizes
    "xs": "size-3",
    "sm": "size-3.5",
    "default": "size-3.5",
    "lg": "size-4",
    // Icon button sizes
    "icon-xs": "size-3",
    "icon-sm": "size-3.5",
    "icon": "size-3.5",
    "icon-lg": "size-4",
  };

  return sizeMap[buttonSize] || "size-3.5";
};

/**
 * Checks if a button size is a small icon-only button.
 * Used for layout decisions in the button component.
 */
export const isSmallIconButton = (buttonSize: ButtonSize | IconButtonSize): boolean => {
  return buttonSize === "icon-xs" || buttonSize === "icon-sm" || buttonSize === "icon";
};
