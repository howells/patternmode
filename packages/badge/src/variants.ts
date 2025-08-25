import { cx } from "@patternmode/utils/cx";
import type { ClassValue } from "clsx";
import { tv } from "tailwind-variants";
import {
  buttonSpecificVariants,
  type GlobalSemanticVariant,
  getVariantClasses,
  globalSemanticVariants,
  tailwindColorVariants,
} from "@patternmode/config/variants";
import { borderRadiusVariants } from "@patternmode/utils/border-radius-variants";
import { borderRadiusVariantsWithFull as extendedBorderRadiusVariants } from "@patternmode/utils/border-radius-variants-with-full";

const badgeVariantStyles: Record<string, ClassValue[]> = {
  ...Object.fromEntries(
    Object.keys(globalSemanticVariants).map((variant) => [
      variant,
      getVariantClasses(variant as GlobalSemanticVariant),
    ]),
  ),
  ...Object.fromEntries(
    tailwindColorVariants.map((color) => [color, getVariantClasses(color)]),
  ),
  ...Object.fromEntries(
    Object.entries(buttonSpecificVariants).map(([key, classes]) => [
      key,
      classes.filter(
        (cls) =>
          !cls.includes("hover:") &&
          !cls.includes("active:") &&
          !cls.includes("disabled:") &&
          !cls.includes("data-["),
      ),
    ]),
  ),
};

const badgeVariantsDefinition = {
  variants: {
    variant: badgeVariantStyles,
    size: {
      xs: "px-1.5 py-0.5 text-xs",
      sm: "px-2 py-0.5 text-xs",
      base: "px-2 py-1 text-sm",
      lg: "px-3 py-2 text-sm",
    },
    border: { true: "ring-1 ring-inset ring-current/10", false: "" },
    rounded: { true: extendedBorderRadiusVariants.full, false: borderRadiusVariants.base },
  },
  defaultVariants: { variant: "default", size: "base", border: false, rounded: false },
} as const;

export const badgeVariants = tv({
  base: cx("inline-flex items-center gap-x-1.5 whitespace-nowrap", borderRadiusVariants.base),
  ...badgeVariantsDefinition,
  compoundVariants: [
    { size: "xs", class: "has-[button]:pr-0.5" },
    { size: "sm", class: "has-[button]:pr-1" },
    { size: "base", class: "has-[button]:pr-1" },
    { size: "lg", class: "has-[button]:pr-1.5" },
    { rounded: true, size: "xs", class: "px-2" },
    { rounded: true, size: "sm", class: "px-2.5" },
    { rounded: true, size: "base", class: "px-3" },
    { rounded: true, size: "lg", class: "px-3.5" },
    { rounded: true, size: "xs", class: "has-[button]:pr-1" },
    { rounded: true, size: "sm", class: "has-[button]:pr-1.5" },
    { rounded: true, size: "base", class: "has-[button]:pr-1.5" },
    { rounded: true, size: "lg", class: "has-[button]:pr-2" },
    { rounded: true, size: "xs", class: "has-[svg:first-child]:pl-1.5" },
    { rounded: true, size: "sm", class: "has-[svg:first-child]:pl-2" },
    { rounded: true, size: "base", class: "has-[svg:first-child]:pl-2.5" },
    { rounded: true, size: "lg", class: "has-[svg:first-child]:pl-3" },
    { rounded: true, size: "xs", class: "has-[svg:last-child]:pr-1.5" },
    { rounded: true, size: "sm", class: "has-[svg:last-child]:pr-2" },
    { rounded: true, size: "base", class: "has-[svg:last-child]:pr-2.5" },
    { rounded: true, size: "lg", class: "has-[svg:last-child]:pr-3" }
  ],
});

export const badgeToIconSizeMap = { xs: "xs", sm: "xs", base: "sm", lg: "base" } as const;

export const dotIndicatorVariants = tv({
  base: ["relative rounded-full", "flex-shrink-0"],
  variants: {
    size: { sm: "w-1.5 h-1.5", default: "w-2 h-2", lg: "w-2.5 h-2.5" },
    animated: { true: "animate-pulse before:absolute before:inset-0 before:rounded-full before:animate-ping before:opacity-75", false: "" },
  },
  defaultVariants: { size: "default", animated: false },
});
