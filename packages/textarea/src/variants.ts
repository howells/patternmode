import { tv } from "tailwind-variants";

export const textareaStyles = tv({
  base: ["w-full resize-none rounded-md border"],
  variants: {
    size: {
      xs: "px-2 py-1 text-xs",
      sm: "px-2.5 py-1.5 text-xs",
      base: "px-3 py-2 text-sm",
      lg: "px-4 py-2.5 text-base",
    },
    fullWidth: { true: "w-full max-w-none", false: "max-w-sm" },
  },
  defaultVariants: { size: "base", fullWidth: false },
});
