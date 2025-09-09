import { tv } from "tailwind-variants";

/**
 * Shared styling for dropdown-like popover surfaces (menus, selects, comboboxes, etc.).
 * - White surface, no shadow, rounded, with a 1px border.
 * - Dark mode standardizes on zinc-950 background and zinc-800 border.
 * - Width and density can be tuned per-component.
 */
export const floatingSurfaceVariants = tv({
  slots: {
    base: "z-50 overflow-hidden rounded-md border border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-zinc-950",
  },
  variants: {
    /**
     * Controls padding applied to the surface container.
     */
    density: {
      none: "p-0",
      compact: "p-1",
      comfy: "p-2",
    },
    /**
     * Common width presets. `anchor` uses Base UI anchor width variables.
     */
    width: {
      auto: "",
      anchor: "min-w-[var(--anchor-width)]",
      sm: "min-w-32",
      md: "min-w-48",
      lg: "min-w-64",
    },
    /**
     * Optional max-height clamp using Base UI available height variable.
     */
    clamp: {
      none: "",
      viewport: "max-h-[var(--available-height)]",
    },
  },
  defaultVariants: {
    density: "compact",
    width: "auto",
    clamp: "viewport",
  },
});

/**
 * Standard classes for triangle arrows that visually merge with the surface.
 * Intended for SVG path elements inside Base UI Arrow components.
 */
export const floatingArrowFill = "fill-white dark:fill-zinc-950";
export const floatingArrowBorderLight = "fill-zinc-200";
export const floatingArrowBorderDark = "dark:fill-zinc-700";
