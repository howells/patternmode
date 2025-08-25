import type { GlobalSemanticVariant, TailwindColor } from "@patternmode/constants/variants";
import { buttonSpecificVariants } from "@patternmode/constants/variants";

export type ButtonSpecificVariant = keyof typeof buttonSpecificVariants;
export type BadgeVariant = GlobalSemanticVariant | TailwindColor | ButtonSpecificVariant;
