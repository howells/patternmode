/**
 * Preview System Utility Functions
 *
 * Type guards and helper functions for working with preview system types.
 */

import type {
  EventPropMetadata,
  PropMetadata,
  SlotPropMetadata,
  VariantPropMetadata,
} from "./preview-types";

/**
 * Type guard to check if prop is a variant prop
 */
export function isVariantProp(prop: PropMetadata): prop is VariantPropMetadata {
  return "options" in prop;
}

/**
 * Type guard to check if prop is an event prop
 */
export function isEventProp(prop: PropMetadata): prop is EventPropMetadata {
  return "signature" in prop;
}

/**
 * Type guard to check if prop is a slot prop
 */
export function isSlotProp(prop: PropMetadata): prop is SlotPropMetadata {
  return "acceptedChildren" in prop || "renderPropSignature" in prop;
}
