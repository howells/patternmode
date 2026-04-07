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

/** Check if a size is an icon size */
function isIconSize(size: ButtonSize): size is `icon-${ComponentSize}` {
  return size.startsWith("icon-");
}

/** Extract base size from an icon size */
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
        brand:
          "border-brand-accent bg-brand-accent text-brand-foreground focus-visible:ring-yellow-400/25 data-[focused=true]:ring-yellow-400/25",
      },
      appearance: {
        solid: [
          "relative overflow-hidden",
          "shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_0_var(--color-alpha-20)]",
          "before:pointer-events-none before:absolute before:inset-0 before:z-[-1] before:rounded-[inherit]",
          "before:bg-[linear-gradient(180deg,var(--color-alpha-20)_0%,var(--color-alpha-5)_100%)]",
          "before:transition-[background] before:duration-150",
          "active:shadow-none active:before:bg-none disabled:shadow-none disabled:before:bg-none",
          "data-[pressed=true]:shadow-none data-[pressed=true]:before:bg-none",
        ].join(" "),
        outline: "border bg-transparent before:hidden",
        ghost:
          "border-transparent bg-transparent shadow-none before:hidden hover:bg-[color-mix(in_srgb,var(--color-foreground)_2%,transparent)] data-[hovered=true]:bg-[color-mix(in_srgb,var(--color-foreground)_2%,transparent)]",
        dashed: "border border-dashed bg-transparent before:hidden",
        transparent:
          "transform-gpu backdrop-blur-md will-change-[filter,background-color] before:hidden",
        input:
          "border-border bg-input text-foreground before:hidden hover:bg-input/90 data-[hovered=true]:bg-input/90",
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
      {
        appearance: "ghost",
        variant: "brand",
        class:
          "text-brand hover:bg-brand/10 hover:text-brand data-[hovered=true]:bg-brand/10 data-[hovered=true]:text-brand",
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
      {
        appearance: "outline",
        variant: "brand",
        class:
          "border-brand text-brand hover:bg-brand/5 data-[hovered=true]:bg-brand/5",
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
        variant: "brand",
        class:
          "border-brand text-brand hover:bg-brand/5 data-[hovered=true]:bg-brand/5",
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
      // Shadow for solid variants (default, secondary, destructive, brand)
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
      {
        variant: "brand",
        class:
          "shadow-xs active:scale-100 active:shadow-none disabled:shadow-none data-[pressed=true]:scale-100 data-[pressed=true]:shadow-none",
      },
      // Secondary solid: white→alpha-10 default, alpha-50→alpha-5 on hover (matches Figma)
      {
        appearance: "solid",
        variant: "secondary",
        class:
          "before:bg-[linear-gradient(180deg,white_0%,var(--color-alpha-10)_100%)] hover:before:bg-[linear-gradient(180deg,var(--color-alpha-50)_0%,var(--color-alpha-5)_100%)] active:before:bg-none disabled:before:bg-none data-[hovered=true]:before:bg-[linear-gradient(180deg,var(--color-alpha-50)_0%,var(--color-alpha-5)_100%)] data-[pressed=true]:before:bg-none",
      },
      // Brand solid: alpha-40→alpha-5 default, alpha-50→alpha-5 on hover (matches Figma)
      {
        appearance: "solid",
        variant: "brand",
        class:
          "shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_0_var(--color-alpha-30)] before:bg-[linear-gradient(180deg,var(--color-alpha-40)_0%,var(--color-alpha-5)_100%)] hover:before:bg-[linear-gradient(180deg,var(--color-alpha-50)_0%,var(--color-alpha-5)_100%)] active:shadow-none active:before:bg-none disabled:shadow-none disabled:before:bg-none data-[pressed=true]:shadow-none data-[hovered=true]:before:bg-[linear-gradient(180deg,var(--color-alpha-50)_0%,var(--color-alpha-5)_100%)] data-[pressed=true]:before:bg-none",
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
      {
        appearance: "transparent",
        variant: "brand",
        class:
          "transform-gpu border-transparent bg-brand/50 backdrop-blur-md will-change-[filter,background-color] hover:bg-brand/60 data-[hovered=true]:bg-brand/60",
      },
      // Outline, link and ghost variants never show shadow or gradient (must come last to override)
      {
        variant: "outline",
        class: "shadow-none before:hidden",
      },
      {
        variant: "link",
        class:
          "shadow-none before:hidden active:scale-100 active:underline-offset-[5px] data-[pressed=true]:scale-100 data-[pressed=true]:underline-offset-[5px]",
      },
      {
        variant: "ghost",
        class: "shadow-none before:hidden",
      },
      // Ghost appearance removes shadow for all variants (must come last to override)
      {
        appearance: "ghost",
        class: "shadow-none before:hidden",
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
  "brand",
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
