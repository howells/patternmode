import { cn } from "@patternmode/ui/utils/cn";
import { focusRing } from "@patternmode/ui/utils/focus-ring";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentSize } from "../../lib/size";

/** Shared pill variant styles used by Badge and Tag. */
export const pillVariants = cva(
  cn(
    "inline-flex items-center justify-center whitespace-nowrap border border-transparent font-normal leading-tight [&_svg]:-ms-px [&_svg]:shrink-0",
    focusRing(),
    "data-[hovered=true]:opacity-90",
  ),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        affirmative: "bg-affirmative-accent text-affirmative-foreground",
        warning: "bg-warning-accent text-warning-foreground",
        outline:
          "border border-border bg-transparent text-secondary-foreground",
        info: "bg-info-accent text-info-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        brand: "bg-brand-accent text-brand-foreground",
      },
      appearance: {
        solid: "",
        light: "",
        outline: "",
        ghost: "border-transparent bg-transparent",
        transparent:
          "transform-gpu backdrop-blur-md will-change-[filter,background-color]",
        /** Input-style chip: white bg + shadow-border ring (unselected state). */
        input:
          "border-0 bg-input text-foreground shadow-borders-base transition-colors hover:bg-secondary",
      },
      disabled: {
        true: "pointer-events-none opacity-50",
      },
      size: {
        "3xl": "h-12 min-w-12 gap-2.5 rounded-2xl px-4 text-xs [&_svg]:size-6",
        "2xl": "h-10 min-w-10 gap-2 rounded-xl px-3 text-xs [&_svg]:size-5",
        xl: "h-8 min-w-8 gap-2 rounded-xl px-2.5 text-xs [&_svg]:size-4",
        lg: "h-7 min-w-7 gap-1.5 rounded-lg px-2 text-xs [&_svg]:size-3.5",
        base: "h-6 min-w-6 gap-1 rounded-lg px-2 text-xs [&_svg]:size-3",
        sm: "h-5 min-w-5 gap-1 rounded-md px-1.5 py-0.5 text-xs [&_svg]:size-3",
        xs: "h-4 min-w-4 gap-1 rounded px-1 text-2xs [&_svg]:size-3",
        "2xs": "h-3 min-w-3 gap-0.5 rounded px-0.5 text-3xs [&_svg]:size-2.5",
      },
      radius: {
        rounded: "rounded-lg",
        square: "rounded-none!",
        full: "rounded-full!",
      },
    },
    compoundVariants: [
      /* ── Focus ring colors by variant ────────────────────── */
      {
        variant: "secondary",
        className:
          "focus-visible:ring-gray-300/50 data-[focused=true]:ring-gray-300/50",
      },
      {
        variant: "affirmative",
        className:
          "focus-visible:ring-green-400/50 data-[focused=true]:ring-green-400/50",
      },
      {
        variant: "warning",
        className:
          "focus-visible:ring-amber-400/50 data-[focused=true]:ring-amber-400/50",
      },
      {
        variant: "info",
        className:
          "focus-visible:ring-blue-400/50 data-[focused=true]:ring-blue-400/50",
      },
      {
        variant: "destructive",
        className:
          "focus-visible:ring-red-400/50 data-[focused=true]:ring-red-400/50",
      },
      {
        variant: "brand",
        className:
          "focus-visible:ring-yellow-400/25 data-[focused=true]:ring-yellow-400/25",
      },
      /* ── Solid (text overrides for dark backgrounds) ───── */
      {
        variant: "affirmative",
        appearance: "solid",
        className: "text-white/90",
      },
      {
        variant: "info",
        appearance: "solid",
        className: "text-white/90",
      },
      {
        variant: "destructive",
        appearance: "solid",
        className: "text-white/90",
      },
      /* ── Light ────────────────────────────────────────── */
      {
        variant: "default",
        appearance: "light",
        className:
          "bg-secondary text-foreground dark:bg-secondary dark:text-foreground",
      },
      {
        variant: "secondary",
        appearance: "light",
        className:
          "bg-secondary text-secondary-foreground dark:bg-secondary/50",
      },
      {
        variant: "affirmative",
        appearance: "light",
        className:
          "border-affirmative-border bg-affirmative-soft font-medium text-affirmative-foreground shadow-xs dark:bg-affirmative-soft dark:text-affirmative-accent",
      },
      {
        variant: "warning",
        appearance: "light",
        className:
          "border-warning-border bg-warning-soft font-medium text-warning-foreground shadow-xs dark:bg-warning-soft dark:text-warning-accent",
      },
      {
        variant: "info",
        appearance: "light",
        className:
          "border-info-border bg-info-soft font-medium text-info-foreground shadow-xs dark:bg-info-soft dark:text-info-accent",
      },
      {
        variant: "destructive",
        appearance: "light",
        className:
          "border-error-border bg-error-soft font-medium text-error-foreground shadow-xs dark:bg-error-soft dark:text-error-accent",
      },
      {
        variant: "brand",
        appearance: "light",
        className:
          "border-warning-border bg-brand-soft font-medium text-brand-foreground shadow-xs dark:bg-brand-soft dark:text-brand-accent",
      },
      /* ── Outline (light bg + colored border) ─────────── */
      {
        variant: "default",
        appearance: "outline",
        className:
          "border-border bg-secondary text-foreground dark:border-border dark:bg-card dark:text-foreground",
      },
      {
        variant: "secondary",
        appearance: "outline",
        className:
          "border-border bg-secondary text-secondary-foreground dark:border-border dark:bg-secondary/50",
      },
      {
        variant: "affirmative",
        appearance: "outline",
        className:
          "border-affirmative-border bg-affirmative-soft text-affirmative-foreground dark:bg-affirmative-soft dark:text-affirmative-accent",
      },
      {
        variant: "warning",
        appearance: "outline",
        className:
          "border-warning-border bg-warning-soft text-warning-foreground dark:bg-warning-soft dark:text-warning-accent",
      },
      {
        variant: "info",
        appearance: "outline",
        className:
          "border-info-border bg-info-soft text-info-foreground dark:bg-info-soft dark:text-info-accent",
      },
      {
        variant: "destructive",
        appearance: "outline",
        className:
          "border-error-border bg-error-soft text-error-foreground dark:bg-error-soft dark:text-error-accent",
      },
      {
        variant: "brand",
        appearance: "outline",
        className:
          "border-brand-accent/30 bg-brand-soft text-brand-foreground dark:bg-brand-soft dark:text-brand-accent",
      },
      /* ── Input (selected state override) ─────────────── */
      {
        variant: "outline",
        appearance: "input",
        className:
          "border-ring bg-input text-foreground shadow-none hover:bg-secondary",
      },
      /* ── Ghost (transparent bg, accent text) ─────────── */
      {
        variant: "default",
        appearance: "ghost",
        className: "text-primary",
      },
      {
        variant: "secondary",
        appearance: "ghost",
        className: "text-secondary-foreground",
      },
      {
        variant: "affirmative",
        appearance: "ghost",
        className: "text-affirmative-accent dark:text-affirmative-accent",
      },
      {
        variant: "warning",
        appearance: "ghost",
        className: "text-warning-accent dark:text-warning-accent",
      },
      {
        variant: "info",
        appearance: "ghost",
        className: "text-info-accent dark:text-info-accent",
      },
      {
        variant: "destructive",
        appearance: "ghost",
        className: "text-destructive",
      },
      {
        variant: "brand",
        appearance: "ghost",
        className: "text-brand-accent dark:text-brand-accent",
      },
      /* ── Transparent (backdrop-blur + 50% bg) ────────── */
      {
        variant: "default",
        appearance: "transparent",
        className:
          "transform-gpu border-transparent bg-primary/50 backdrop-blur-md will-change-[filter,background-color]",
      },
      {
        variant: "secondary",
        appearance: "transparent",
        className:
          "transform-gpu border-transparent bg-secondary/50 backdrop-blur-md will-change-[filter,background-color]",
      },
      {
        variant: "affirmative",
        appearance: "transparent",
        className:
          "transform-gpu border-transparent bg-affirmative-accent/50 text-white/90 backdrop-blur-md will-change-[filter,background-color]",
      },
      {
        variant: "warning",
        appearance: "transparent",
        className:
          "transform-gpu border-transparent bg-warning-accent/50 backdrop-blur-md will-change-[filter,background-color]",
      },
      {
        variant: "info",
        appearance: "transparent",
        className:
          "transform-gpu border-transparent bg-info-accent/50 text-white/90 backdrop-blur-md will-change-[filter,background-color]",
      },
      {
        variant: "destructive",
        appearance: "transparent",
        className:
          "transform-gpu border-transparent bg-destructive/50 text-white/90 backdrop-blur-md will-change-[filter,background-color]",
      },
      {
        variant: "brand",
        appearance: "transparent",
        className:
          "transform-gpu border-transparent bg-brand-accent/50 backdrop-blur-md will-change-[filter,background-color]",
      },
    ],
    defaultVariants: {
      variant: "default",
      appearance: "solid",
      size: "base",
      radius: "rounded",
    },
  },
);

/** Pill variant type */
export type PillVariant = NonNullable<
  VariantProps<typeof pillVariants>["variant"]
>;
export type PillSize = NonNullable<VariantProps<typeof pillVariants>["size"]>;
export type PillAppearance = NonNullable<
  VariantProps<typeof pillVariants>["appearance"]
>;

/** All pill variants for iteration */
export const PILL_VARIANTS: PillVariant[] = [
  "default",
  "secondary",
  "affirmative",
  "warning",
  "outline",
  "info",
  "destructive",
  "brand",
];

/** All pill appearances for iteration */
export const PILL_APPEARANCES: PillAppearance[] = [
  "solid",
  "light",
  "outline",
  "ghost",
  "input",
];

/** All pill sizes for iteration */
export const PILL_SIZES: PillSize[] = [
  "2xs",
  "xs",
  "sm",
  "base",
  "lg",
  "xl",
  "2xl",
  "3xl",
];

/** Icon size mapping shared by Badge and Tag */
export const PILL_ICON_SIZE_MAP: Record<PillSize, ComponentSize> = {
  "2xs": "2xs",
  xs: "2xs",
  sm: "xs",
  base: "sm",
  lg: "base",
  xl: "lg",
  "2xl": "xl",
  "3xl": "2xl",
};
