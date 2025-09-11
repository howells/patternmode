import { borderRadiusVariants } from "@patternmode/utils/border-radius-variants";
import { borderRadiusVariantsWithFull as extendedBorderRadiusVariants } from "@patternmode/utils/border-radius-variants-with-full";
import {
  componentRing,
  componentRingWithHover,
} from "@patternmode/utils/component-ring";
import { tv } from "tailwind-variants";

/**
 * Navigation menu component variants`
 */
export const navigationMenuVariants = tv({
  base: [
    // Base layout and positioning
    "relative inline-flex items-center",
  ],
  variants: {
    /**
     * Rounded variant for fully rounded navigation menus
     * When true, applies rounded-full and adjusts padding for better visual balance
     */
    rounded: {
      true: extendedBorderRadiusVariants.full,
      false: borderRadiusVariants.base,
    },
    /**
     * Ring variant for visual separation and depth
     * When true, applies subtle ring styling similar to card components
     */
    ring: {
      true: componentRing,
      false: "",
    },
  },
  defaultVariants: {
    rounded: false,
    ring: false,
  },
});

/**
 * Navigation menu popup variants for dropdown containers
 */
export const navigationMenuPopupVariants = tv({
  base: [
    // Base popup styling with floating surface appearance
    "relative h-[var(--popup-height)] w-max origin-[var(--transform-origin)]",
    // Animations
    "data-[ending-style]:scale-90 data-[starting-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[ending-style]:duration-150",
    "transition-[opacity,transform,width,height,scale,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)]",
    // Responsive width
    "xs:w-[var(--popup-width)] min-[500px]:w-[var(--popup-width)]",
  ],
  variants: {
    /**
     * Rounded variant for fully rounded dropdown containers
     */
    rounded: {
      true: extendedBorderRadiusVariants.full,
      false: "rounded-lg",
    },
    /**
     * Ring variant for dropdown containers
     * Uses hover-enhanced ring for better interactive feedback
     */
    ring: {
      true: componentRingWithHover,
      false: "",
    },
  },
  defaultVariants: {
    rounded: false,
    ring: false,
  },
});

/**
 * Navigation menu content variants for dropdown content areas
 */
export const navigationMenuContentVariants = tv({
  base: [
    // Layout: simple 2-column grid with sensible spacing and padding
    "grid grid-cols-2 gap-3 p-2",
    // Ensure content doesn't exceed the popup width
    "max-w-[var(--popup-width)]",
    // Animations
    "transition-[opacity,transform,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)]",
    // States
    "data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
  ],
  variants: {
    /**
     * Rounded variant for fully rounded content areas with adjusted padding
     */
    rounded: {
      true: [
        extendedBorderRadiusVariants.full,
        // Slightly increase padding to match rounded shape nicely
        "p-3",
      ],
      false: "",
    },
    /**
     * Ring variant for content areas (kept minimal to avoid double borders)
     */
    ring: {
      true: componentRing,
      false: "",
    },
  },
  defaultVariants: {
    rounded: false,
    ring: false,
  },
});

/**
 * Navigation menu trigger variants for menu buttons
 */
export const navigationMenuTriggerVariants = tv({
  base: [
    // Base trigger styling
    "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium text-sm",
    // Layout
    "px-3 py-2",
    // Interactions
    "focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-none",
    "hover:bg-accent hover:text-accent-foreground",
    // States
    "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
    // Transitions
    "transition-colors",
  ],
  variants: {
    /**
     * Rounded variant for fully rounded trigger buttons
     */
    rounded: {
      true: [
        extendedBorderRadiusVariants.full,
        // Adjust padding for rounded triggers
        "px-4 py-2",
      ],
      false: "",
    },
    /**
     * Ring variant for trigger buttons
     * Uses hover-enhanced ring for better interactive feedback
     */
    ring: {
      true: componentRingWithHover,
      false: "",
    },
  },
  defaultVariants: {
    rounded: false,
    ring: false,
  },
});
