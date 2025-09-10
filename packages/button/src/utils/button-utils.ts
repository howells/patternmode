/**
 * Utility functions for button component logic
 */

export type TextAlign = "left" | "center" | "right" | undefined;

/**
 * Determines the flex justification class based on textAlign and fullWidth
 */
export const getButtonJustifyClass = (
  fullWidth: boolean | undefined,
  textAlign: TextAlign
): string => {
  if (!fullWidth) {
    return "justify-center";
  }

  switch (textAlign) {
    case "left":
      return "justify-start";
    case "right":
      return "justify-end";
    default:
      return "justify-center";
  }
};

/**
 * Determines the text alignment class
 */
export const getButtonTextAlignClass = (
  fullWidth: boolean | undefined,
  textAlign: TextAlign
): string => {
  if (fullWidth && textAlign === "center") {
    return "text-center";
  }

  switch (textAlign) {
    case "left":
      return "text-left";
    case "right":
      return "text-right";
    default:
      return "text-center";
  }
};

/**
 * Determines the layout class for button content
 */
export const getButtonLayoutClass = (
  size: string | undefined,
  options: {
    fullWidth?: boolean;
    textAlign: TextAlign;
    hasLeftIcon: boolean;
    isLoading: boolean;
  }
): string => {
  // Check for icon button first (all icon sizes use center justification)
  if (size?.includes("icon")) {
    return "justify-center";
  }

  // Check for center-aligned full width with icons/loading
  if (
    options.fullWidth &&
    options.textAlign === "center" &&
    (options.hasLeftIcon || options.isLoading)
  ) {
    return "justify-between";
  }

  // Default layout
  return "justify-start gap-x-2";
};

/**
 * Determines the opacity class for icons based on loading and hover states
 */
export const getIconOpacityClass = (
  isLoading: boolean,
  showOnHover: boolean
): string => {
  if (isLoading) {
    return "pointer-events-none opacity-0";
  }

  if (showOnHover) {
    return "opacity-0 group-hover/button:opacity-100";
  }

  return "opacity-100";
};
