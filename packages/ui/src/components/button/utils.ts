import type { Size } from "../../constants/sizes";
import type { IconButtonSize } from "./types";

/**
 * Maps button sizes to appropriate icon sizes.
 * Used for determining the correct Icon component size based on button size.
 */
export const getIconSize = (buttonSize: Size | IconButtonSize): "xs" | "sm" | "base" | "lg" => {
  const sizeMap: Record<Size | IconButtonSize, "xs" | "sm" | "base" | "lg"> = {
    // Text button sizes
    "xs": "xs",
    "sm": "xs",
    "base": "sm",
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
 * Maps button sizes to appropriate loader sizes.
 * Used for determining the correct Loader component size based on button size.
 */
export const getLoaderSize = (buttonSize: Size | IconButtonSize): "xs" | "sm" | "base" => {
  const sizeMap: Record<Size | IconButtonSize, "xs" | "sm" | "base"> = {
    // Text button sizes
    "xs": "xs",
    "sm": "xs",
    "base": "sm",
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
export const getIconContainerSize = (buttonSize: Size | IconButtonSize): string => {
  const sizeMap: Record<Size | IconButtonSize, string> = {
    // Text button sizes
    "xs": "size-3",
    "sm": "size-3.5",
    "base": "size-3.5",
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
export const isSmallIconButton = (buttonSize: Size | IconButtonSize): boolean => {
  return buttonSize === "icon-xs" || buttonSize === "icon-sm" || buttonSize === "icon";
};
