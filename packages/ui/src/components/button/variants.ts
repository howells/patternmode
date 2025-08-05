import { tv } from "tailwind-variants";
import { focusRing } from "../../lib/utils";
import { componentVariants } from "../../lib/variants";

export const buttonVariants = tv({
  base: [
    // base
    "relative inline-flex items-center whitespace-nowrap rounded-md text-sm outline-hidden",
    // cursor - explicit hand pointer for all interactive buttons
    "cursor-pointer",
    // add transparent border to match input height
    "border border-transparent",
    // background transition - only animate colors and shadows, not position
    "transition-[background-color,border-color,box-shadow,color] duration-150 ease-in-out",
    // disabled
    "disabled:pointer-events-none disabled:shadow-none disabled:cursor-not-allowed",
    // focus
    focusRing,
  ],
  variants: {
    variant: componentVariants.button,
    rounded: {
      true: "rounded-full",
      false: "rounded-md",
    },
    size: {
      "xs": "h-control-xs px-2 text-xs has-[>svg]:px-1.5",
      "sm": "h-control-sm px-2.5 text-sm has-[>svg]:px-2",
      "default": "h-control-base px-3 text-sm has-[>svg]:px-2.5",
      "lg": "h-control-lg px-4 text-sm has-[>svg]:px-3",
      "icon-xs": "size-control-xs",
      "icon-sm": "size-control-sm",
      "icon": "size-control-base",
      "icon-lg": "size-control-lg",
    },
  },
  compoundVariants: [
    {
      size: "xs",
      variant: ["default", "secondary", "outline", "ghost"],
      class: "gap-1",
    },
    {
      size: "sm",
      variant: ["default", "secondary", "outline", "ghost"],
      class: "gap-1.5",
    },
    {
      size: "default",
      variant: ["default", "secondary", "outline", "ghost"],
      class: "gap-2",
    },
    {
      size: "lg",
      variant: ["default", "secondary", "outline", "ghost"],
      class: "gap-2.5",
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "default",
    rounded: false,
  },
});

/**
 * Creates button-style variants for other components that want to look like buttons
 * but maintain their own semantic behavior (like toggles, tabs, etc.).
 */
export const createButtonStyleVariants = (
  pressedVariant: keyof typeof componentVariants.button = "destructive",
) => ({
  base: buttonVariants.base,
  variants: {
    // Map button variants to toggle states
    default: [
      ...componentVariants.button.default,
      // Add pressed state using the specified variant
      `data-[pressed]:${componentVariants.button[pressedVariant].join(
        " data-[pressed]:",
      )}`,
    ],
    secondary: [
      ...componentVariants.button.secondary,
      `data-[pressed]:${componentVariants.button[pressedVariant].join(
        " data-[pressed]:",
      )}`,
    ],
    outline: [
      ...componentVariants.button.outline,
      `data-[pressed]:${componentVariants.button[pressedVariant].join(
        " data-[pressed]:",
      )}`,
    ],
    ghost: [
      ...componentVariants.button.ghost,
      `data-[pressed]:${componentVariants.button[pressedVariant].join(
        " data-[pressed]:",
      )}`,
    ],
    destructive: [
      ...componentVariants.button.destructive,
      // When destructive is pressed, make it even more intense
      "data-[pressed]:bg-red-700 data-[pressed]:hover:bg-red-800 dark:data-[pressed]:bg-red-600 dark:data-[pressed]:hover:bg-red-700",
    ],
  },
  sizes: buttonVariants.variants.size,
});
