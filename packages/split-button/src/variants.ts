import { tv } from "tailwind-variants";

// Split button container variants - handles the overall layout and appearance
export const splitButtonVariants = tv({
  base: ["relative flex items-center"],
  variants: {
    rounded: {
      true: "rounded-full",
      false: "rounded-lg",
    },
  },
  defaultVariants: {
    rounded: false,
  },
});

// Dropdown trigger button variants - handles the right-side button styling
export const dropdownTriggerVariants = tv({
  slots: {
    trigger: [
      // Base styles for the dropdown trigger button
      "border-black/10 border-l",
      "dark:border-white/10",
      // Remove left border radius to connect with main button
      "rounded-l-none",
    ],
  },
  variants: {
    rounded: {
      true: "rounded-r-full",
      false: "rounded-r-lg",
    },
  },
  defaultVariants: {
    rounded: false,
  },
});
