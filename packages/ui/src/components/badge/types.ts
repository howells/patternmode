import type {
	GlobalSemanticVariant,
	TailwindColor,
} from "@patternmode/constants/variants";
import type { ButtonVariant } from "@patternmode/button/types";

/**
 * Badge variant type supporting both semantic variants, all Tailwind colors, and button-like variants.
 * Button-like variants are imported from the Button component for consistency.
 */
export type BadgeVariant =
	| GlobalSemanticVariant
	| TailwindColor
	| ButtonVariant;
