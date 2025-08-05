import { tv } from "tailwind-variants";

export const accordionVariants = tv({
  base: "flex w-full flex-col",
});

export const accordionTriggerVariants = tv({
  base: [
    // base
    "group flex flex-1 cursor-pointer items-center justify-between py-3 text-left font-medium",
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // disabled
    "data-[disabled]:cursor-default data-[disabled]:text-zinc-400 dark:data-[disabled]:text-zinc-600",
    // focus
    "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden focus-visible:ring-inset",
  ],
});

export const accordionIconVariants = tv({
  base: [
    // base
    "size-5 shrink-0 transition-transform duration-150 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[panel-open]:rotate-45",
    // text color
    "text-zinc-600 dark:text-zinc-400",
  ],
});

export const accordionContentVariants = tv({
  base: "overflow-hidden",
});

export const accordionContentInnerVariants = tv({
  base: "pb-3 pt-1",
});

export const accordionItemVariants = tv({
  base: [
    // base
    "overflow-hidden border-b first:mt-0",
    // border color
    "dark:border-zinc-800",
  ],
});