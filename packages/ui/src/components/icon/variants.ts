import { tv } from "tailwind-variants";

export const iconVariants = tv({
  base: "shrink-0",
  variants: {
    size: {
      "xs": "size-3", // 12px - for very small contexts
      "sm": "size-3.5", // 14px - for small buttons, compact UI
      "base": "size-4", // 16px - default size for most UI
      "lg": "size-5", // 20px - for larger contexts
      "xl": "size-6", // 24px - for headers, prominent UI
      "2xl": "size-8", // 32px - for large display contexts
      "3xl": "size-12", // 48px - for hero sections, empty states
    },
  },
  defaultVariants: {
    size: "base",
  },
});
