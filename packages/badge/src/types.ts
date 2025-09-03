import type {
  buttonSpecificVariants,
  GlobalSemanticVariant,
  TailwindColor,
} from "@patternmode/config/variants";

export type ButtonSpecificVariant = keyof typeof buttonSpecificVariants;
export type BadgeVariant =
  | GlobalSemanticVariant
  | TailwindColor
  | ButtonSpecificVariant;
