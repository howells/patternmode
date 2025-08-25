import { focusRing } from "@patternmode/utils/focus-ring";
import { tv } from "tailwind-variants";
import { borderRadiusVariants } from "@patternmode/utils/border-radius-variants";

export const toolbarVariants = tv({
  slots: {
    root: [
      "flex items-center gap-px border p-0.5",
      "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700",
    ],
    button: [
      "flex items-center justify-center font-medium select-none transition-all duration-100 ease-in-out",
      "text-zinc-600 dark:text-zinc-400",
      "hover:bg-zinc-100 dark:hover:bg-zinc-700",
      "data-[highlighted]:bg-zinc-100 dark:data-[highlighted]:bg-zinc-700",
      "data-[pressed]:bg-zinc-100 data-[pressed]:text-zinc-900 dark:data-[pressed]:bg-zinc-700 dark:data-[pressed]:text-zinc-100",
      "disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      focusRing,
      "focus-visible:bg-none focus-visible:-outline-offset-1",
    ],
    link: [
      "flex items-center justify-center font-medium select-none transition-all duration-100 ease-in-out no-underline",
      "text-zinc-500 dark:text-zinc-400",
      "hover:text-blue-600 dark:hover:text-blue-400",
      "data-[highlighted]:text-blue-600 dark:data-[highlighted]:text-blue-400",
      focusRing,
      "focus-visible:-outline-offset-2",
    ],
    input: [
      "flex items-center justify-center font-medium transition-all duration-100 ease-in-out",
      "text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-950",
      "border  dark:border-zinc-600",
      "hover:border-zinc-400 dark:hover:border-zinc-500",
      "data-[highlighted]:border-blue-500 dark:data-[highlighted]:border-blue-400",
      "focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:border-blue-400 dark:focus:ring-blue-400/20",
      "disabled:opacity-50 disabled:cursor-not-allowed",
    ],
    group: ["flex items-center gap-1"],
    separator: ["mx-1 h-4 w-px", "bg-zinc-300 dark:bg-zinc-600"],
  },
  variants: {
    variant: {
      default: { root: " bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800" },
      outline: { root: " bg-transparent dark:border-zinc-600" },
      ghost: { root: "border-transparent bg-transparent" },
    },
    size: {
      sm: {
        root: `gap-0.5 p-0.5 ${borderRadiusVariants.sm}`,
        button: `h-6 min-w-6 px-1.5 text-xs ${borderRadiusVariants.sm}`,
        link: `h-6 px-1.5 text-xs ${borderRadiusVariants.sm}`,
        input: `h-6 px-1.5 text-xs ${borderRadiusVariants.sm}`,
      },
      default: {
        root: `gap-px p-0.5 ${borderRadiusVariants.base}`,
        button: `h-8 min-w-8 px-3 text-sm ${borderRadiusVariants.base}`,
        link: `h-8 px-3 text-sm ${borderRadiusVariants.base}`,
        input: `h-8 px-3 text-sm ${borderRadiusVariants.base}`,
      },
      lg: {
        root: `gap-1 p-1 ${borderRadiusVariants.lg}`,
        button: `h-10 min-w-10 px-4 text-base ${borderRadiusVariants.lg}`,
        link: `h-10 px-4 text-base ${borderRadiusVariants.lg}`,
        input: `h-10 px-4 text-base ${borderRadiusVariants.lg}`,
      },
    },
    orientation: {
      horizontal: { root: "flex-row", separator: "h-4 w-px" },
      vertical: { root: "flex-col", separator: "h-px w-4" },
    },
  },
  defaultVariants: { variant: "default", size: "default", orientation: "horizontal" },
});
