/**
 * Shared Storybook utilities and configurations
 */

export { COMPONENT_SIZES } from "./size";

import { COMPONENT_SIZES } from "./size";

/**
 * Reusable size argType configuration for Storybook controls
 */
export const sizeArgType = {
  control: "select" as const,
  options: COMPONENT_SIZES,
  description: "Component size following the design system scale",
};

/**
 * Common variant options for buttons, toggles, etc.
 */
export const COMMON_VARIANTS = ["default", "outline"] as const;

/**
 * Reusable variant argType configuration
 */
export const variantArgType = {
  control: "select" as const,
  options: COMMON_VARIANTS,
  description: "Visual variant of the component",
};
