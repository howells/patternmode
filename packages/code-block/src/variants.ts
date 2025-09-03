import { tv } from "tailwind-variants";

export const codeBlockVariants = tv({
  base: "relative w-full min-w-lg overflow-hidden rounded-lg border dark:border-zinc-800",
});

export const codeBlockHeaderVariants = tv({
  base: "flex items-center justify-between border-b bg-zinc-50 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900",
});

export const codeBlockLanguageLabelVariants = tv({
  base: "font-medium text-xs text-zinc-500 dark:text-zinc-400",
});
