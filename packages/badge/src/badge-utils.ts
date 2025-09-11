import type {
  GlobalSemanticVariant,
  TailwindColor,
} from "@patternmode/config/variants";
import {
  globalSemanticVariants,
  semanticVariants,
} from "@patternmode/config/variants";
import type { BadgeVariant } from "./types";

/**
 * Maps a badge variant to the appropriate status dot color.
 */
export const getStatusDotColor = (
  effectiveVariant: BadgeVariant | undefined
): TailwindColor | GlobalSemanticVariant => {
  if (!effectiveVariant) {
    return "default";
  }

  // If it's already a global semantic variant, use it
  if (effectiveVariant in globalSemanticVariants) {
    return effectiveVariant as GlobalSemanticVariant;
  }

  // If it's a button/semantic alias, map it via central definitions
  if (effectiveVariant in semanticVariants) {
    // For now, just return the variant as-is since semanticVariants contains the mapping
    return effectiveVariant as GlobalSemanticVariant;
  }

  // Otherwise treat as Tailwind color (e.g., "blue", "zinc")
  return effectiveVariant as TailwindColor;
};
