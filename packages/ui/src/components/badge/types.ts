import type { GlobalSemanticVariant, TailwindColor } from "../../constants/variants";

/**
 * Badge variant type supporting both semantic variants and all Tailwind colors.
 */
export type BadgeVariant = GlobalSemanticVariant | TailwindColor;
