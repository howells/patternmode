import { cva, type VariantProps } from "class-variance-authority";
import { RADIUS_CLASSES } from "../../lib/radius";
import { COMPONENT_SIZES, type ComponentSize } from "../../lib/size";
import { focusRing } from "../../utils/focus-ring";

/** Standard button sizes derived from component size scale */
const BUTTON_STANDARD_SIZES = COMPONENT_SIZES;

/** Icon button sizes - prefixed versions of standard sizes */
const BUTTON_ICON_SIZES = COMPONENT_SIZES.map((s) => `icon-${s}` as const);

/** All button sizes */
const BUTTON_SIZES = [...BUTTON_STANDARD_SIZES, ...BUTTON_ICON_SIZES] as const;

/** Button size type */
type ButtonSize = (typeof BUTTON_SIZES)[number];

/**
 * Check if a button size is an icon-only size (prefixed with "icon-").
 *
 * @param size - The button size to check
 * @returns `true` if the size is an icon-only variant
 */
function isIconSize(size: ButtonSize): size is `icon-${ComponentSize}` {
  return size.startsWith("icon-");
}

/**
 * Extract the base component size from a button size string.
 * Strips the "icon-" prefix if present.
 *
 * @param size - The button size (may be standard or icon-prefixed)
 * @returns The underlying ComponentSize
 */
function getBaseSize(size: ButtonSize): ComponentSize {
  if (isIconSize(size)) {
    return size.replace("icon-", "") as ComponentSize;
  }
  return size as ComponentSize;
}

/**
 * buttonVariants - CVA helper for Button styling.
 * Uses variant-based styling via class-variance-authority.
 */
const buttonVariants = cva(
  [
    "isolate inline-flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap border font-medium text-sm transition-all duration-150 ease-out",
    "disabled:pointer-events-none disabled:border-transparent disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
    "[&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    // Focus ring (native + data-focused)
    ...focusRing(),
    // Pressed state (native + data-pressed)
    "data-[pressed=true]:scale-[0.97]",
  ],
  {
    variants: {
      variant: {
        default:
          "border-primary bg-primary text-primary-foreground hover:bg-primary/90 data-[hovered=true]:bg-primary/90",
        secondary: "border-gray-200 bg-gray-100 text-secondary-foreground",
        destructive:
          "border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-red-400/50 data-[hovered=true]:bg-destructive/90 data-[focused=true]:ring-red-400/50",
        outline:
          "border-border bg-background text-foreground hover:bg-muted hover:text-accent-foreground data-[hovered=true]:bg-muted data-[hovered=true]:text-accent-foreground",
        ghost:
          "border-transparent bg-transparent text-foreground shadow-none hover:bg-muted hover:text-accent-foreground data-[hovered=true]:bg-muted data-[hovered=true]:text-accent-foreground",
        link: "border-transparent bg-transparent text-foreground underline-offset-4 shadow-none hover:underline data-[hovered=true]:underline",
      },
      appearance: {
        solid: [
          "shadow-[inset_0_0.75px_0_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.08)]",
          "active:shadow-[0_0_0_1px_rgba(0,0,0,0.08)] disabled:shadow-none",
          "data-[pressed=true]:shadow-[0_0_0_1px_rgba(0,0,0,0.08)]",
        ].join(" "),
        outline: "border bg-transparent",
        ghost:
          "border-transparent bg-transparent shadow-none hover:bg-[color-mix(in_srgb,var(--color-foreground)_2%,transparent)] data-[hovered=true]:bg-[color-mix(in_srgb,var(--color-foreground)_2%,transparent)]",
        dashed: "border border-dashed bg-transparent",
        transparent:
          "transform-gpu backdrop-blur-md will-change-[filter,background-color]",
        input:
          "border-border bg-input text-foreground hover:bg-input/90 data-[hovered=true]:bg-input/90",
      },
      radius: RADIUS_CLASSES,
      size: {
        // Standard sizes
        "2xs": "h-6 gap-1 px-2 text-xs",
        xs: "h-7 gap-1.5 px-2.5 text-xs",
        sm: "h-8 gap-1.5 px-3 text-sm",
        base: "h-9 gap-2 px-3.5 text-sm",
        lg: "h-10 gap-2 px-4 text-sm",
        xl: "h-11 gap-2 px-4 text-sm",
        "2xl": "h-12 gap-2 px-4 text-sm",
        "3xl": "h-14 gap-2 px-4.5 text-sm",
        // Icon sizes (slightly elongated horizontal padding, shrink-0 to prevent flex shrinking)
        "icon-2xs": "h-6 shrink-0 px-2 py-1",
        "icon-xs": "h-7 shrink-0 px-2.5 py-1.5",
        "icon-sm": "h-8 shrink-0 px-3 py-2",
        "icon-base": "h-9 shrink-0 px-3.5 py-2",
        "icon-lg": "h-10 shrink-0 px-4 py-2.5",
        "icon-xl": "h-11 shrink-0 px-4 py-3",
        "icon-2xl": "h-12 shrink-0 px-5 py-3",
        "icon-3xl": "h-14 shrink-0 px-6 py-4",
      },
      align: {
        center: "justify-center",
        start: "justify-start",
        end: "justify-end",
      },
      pressed: {
        true: "active:scale-[0.97]",
        false: "",
      },
      square: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Square icon buttons - aspect-square ensures width = height
      { square: true, size: "icon-2xs", class: "aspect-square px-0" },
      { square: true, size: "icon-xs", class: "aspect-square px-0" },
      { square: true, size: "icon-sm", class: "aspect-square px-0" },
      { square: true, size: "icon-base", class: "aspect-square px-0" },
      { square: true, size: "icon-lg", class: "aspect-square px-0" },
      { square: true, size: "icon-xl", class: "aspect-square px-0" },
      { square: true, size: "icon-2xl", class: "aspect-square px-0" },
      { square: true, size: "icon-3xl", class: "aspect-square px-0" },
      // Ghost appearance modifier on solid variants
      {
        appearance: "ghost",
        variant: "default",
        class:
          "text-primary hover:bg-primary/5 hover:text-primary data-[hovered=true]:bg-primary/5 data-[hovered=true]:text-primary",
      },
      {
        appearance: "ghost",
        variant: "secondary",
        class:
          "text-secondary-foreground hover:bg-gray-100/50 data-[hovered=true]:bg-gray-100/50",
      },
      {
        appearance: "ghost",
        variant: "destructive",
        class:
          "text-destructive hover:bg-destructive/10 hover:text-destructive data-[hovered=true]:bg-destructive/10 data-[hovered=true]:text-destructive",
      },
      // Outline appearance modifier on solid variants
      {
        appearance: "outline",
        variant: "default",
        class:
          "border-primary text-primary hover:bg-primary/5 hover:text-primary data-[hovered=true]:bg-primary/5 data-[hovered=true]:text-primary",
      },
      {
        appearance: "outline",
        variant: "secondary",
        class:
          "border-border text-secondary-foreground hover:bg-gray-100/80 data-[hovered=true]:bg-gray-100/80",
      },
      {
        appearance: "outline",
        variant: "destructive",
        class:
          "border-destructive text-destructive hover:bg-destructive/5 data-[hovered=true]:bg-destructive/5",
      },
      // Dashed appearance modifier on solid variants
      {
        appearance: "dashed",
        variant: "default",
        class:
          "border-primary text-primary hover:bg-primary/5 data-[hovered=true]:bg-primary/5",
      },
      {
        appearance: "dashed",
        variant: "secondary",
        class:
          "border-border text-secondary-foreground hover:bg-gray-100/80 data-[hovered=true]:bg-gray-100/80",
      },
      {
        appearance: "dashed",
        variant: "destructive",
        class:
          "border-destructive text-destructive hover:bg-destructive/5 data-[hovered=true]:bg-destructive/5",
      },
      {
        appearance: "dashed",
        variant: "outline",
        class:
          "border-border bg-background text-foreground hover:bg-muted data-[hovered=true]:bg-muted",
      },
      // Smaller border radius for smallest sizes
      {
        radius: "rounded",
        size: ["2xs", "xs", "icon-2xs", "icon-xs"],
        class: "rounded-sm",
      },
      // Shadow for solid variants (default, secondary, destructive)
      // disabled/active: removes shadow for flat appearance, disables scale (shadow removal is the feedback)
      {
        variant: "default",
        class:
          "shadow-xs active:scale-100 active:shadow-none disabled:shadow-none data-[pressed=true]:scale-100 data-[pressed=true]:shadow-none",
      },
      {
        variant: "secondary",
        class:
          "shadow-xs active:scale-100 active:shadow-none disabled:shadow-none data-[pressed=true]:scale-100 data-[pressed=true]:shadow-none",
      },
      {
        variant: "destructive",
        class:
          "shadow-xs active:scale-100 active:shadow-none disabled:shadow-none data-[pressed=true]:scale-100 data-[pressed=true]:shadow-none",
      },
      // Transparent appearance overrides background with 50% opacity and backdrop blur
      {
        appearance: "transparent",
        variant: "default",
        class:
          "transform-gpu border-transparent bg-primary/50 backdrop-blur-md will-change-[filter,background-color] hover:bg-primary/60 data-[hovered=true]:bg-primary/60",
      },
      {
        appearance: "transparent",
        variant: "secondary",
        class:
          "transform-gpu border-transparent bg-gray-100/50 backdrop-blur-md will-change-[filter,background-color] hover:bg-gray-100/60 data-[hovered=true]:bg-gray-100/60",
      },
      {
        appearance: "transparent",
        variant: "destructive",
        class:
          "transform-gpu border-transparent bg-destructive/50 backdrop-blur-md will-change-[filter,background-color] hover:bg-destructive/60 data-[hovered=true]:bg-destructive/60",
      },
      // Outline, link and ghost variants never show shadow (must come last to override)
      {
        variant: "outline",
        class: "shadow-none",
      },
      {
        variant: "link",
        class:
          "shadow-none active:scale-100 active:underline-offset-[5px] data-[pressed=true]:scale-100 data-[pressed=true]:underline-offset-[5px]",
      },
      {
        variant: "ghost",
        class: "shadow-none",
      },
      // Ghost appearance removes shadow for all variants (must come last to override)
      {
        appearance: "ghost",
        class: "shadow-none",
      },
    ],
    defaultVariants: {
      pressed: true,
      variant: "default",
      appearance: "solid",
      radius: "rounded",
      size: "base",
      align: "center",
      square: false,
    },
  },
);

// Map button sizes to icon sizes (icons one step smaller than button)
const BUTTON_SIZE_TO_ICON_SIZE_MAP: Partial<Record<ButtonSize, ComponentSize>> =
  {
    "2xs": "2xs",
    xs: "2xs",
    sm: "xs",
    base: "xs",
    lg: "xs",
    xl: "xs",
    "2xl": "xs",
    "3xl": "xs",
    "icon-2xs": "2xs",
    "icon-xs": "2xs",
    "icon-sm": "xs",
    "icon-base": "xs",
    "icon-lg": "xs",
    "icon-xl": "xs",
    "icon-2xl": "xs",
    "icon-3xl": "xs",
  };

/**
 * Map a button size to the appropriate icon size.
 * Icons render one step smaller than the button for visual balance.
 *
 * @param buttonSize - The button size (defaults to "base" when undefined)
 * @returns The corresponding ComponentSize for the icon
 */
function buttonSizeToIconSize(
  buttonSize: ButtonSize | undefined,
): ComponentSize {
  const key = buttonSize ?? "base";
  return BUTTON_SIZE_TO_ICON_SIZE_MAP[key] ?? "sm";
}

/** Button variant type */
type ButtonVariant = NonNullable<
  VariantProps<typeof buttonVariants>["variant"]
>;

/** Button appearance type */
type ButtonAppearance = NonNullable<
  VariantProps<typeof buttonVariants>["appearance"]
>;

/** All button variants */
const BUTTON_VARIANTS = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "link",
] as const;

/** All button appearances */
const BUTTON_APPEARANCES = [
  "solid",
  "outline",
  "ghost",
  "dashed",
  "transparent",
  "input",
] as const;

export {
  BUTTON_APPEARANCES,
  BUTTON_VARIANTS,
  type ButtonAppearance,
  type ButtonSize,
  type ButtonVariant,
  buttonSizeToIconSize,
  buttonVariants,
  getBaseSize,
  isIconSize,
};
