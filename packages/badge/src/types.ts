import type { GlobalSemanticVariant, TailwindColor } from "@patternmode/config/variants";
import { buttonSpecificVariants } from "@patternmode/config/variants";

export type ButtonSpecificVariant = keyof typeof buttonSpecificVariants;
export type BadgeVariant = GlobalSemanticVariant | TailwindColor | ButtonSpecificVariant;
