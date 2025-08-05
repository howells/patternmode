import { tv } from "tailwind-variants";

/**
 * Style variants for breadcrumb navigation components.
 *
 * Defines consistent styling for all breadcrumb elements including
 * navigation structure, links, separators, and truncation indicators.
 */
export const breadcrumbVariants = tv({
  slots: {
    /**
     * Root navigation container styling.
     */
    root: [
      // base
      "w-full",
    ],
    /**
     * Breadcrumb list container styling.
     */
    list: [
      // base
      "flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
      // text color
      "text-zinc-500 dark:text-zinc-400",
    ],
    /**
     * Individual breadcrumb item styling.
     */
    item: [
      // base
      "inline-flex items-center gap-1.5",
    ],
    /**
     * Clickable breadcrumb link styling.
     */
    link: [
      // base
      "transition-colors",
      // hover
      "hover:text-zinc-900 dark:hover:text-zinc-50",
      // focus
      "focus:outline-none focus:text-zinc-900 dark:focus:text-zinc-50",
    ],
    /**
     * Current page (non-clickable) styling.
     */
    page: [
      // base
      "font-normal",
      // text color
      "text-zinc-900 dark:text-zinc-50",
    ],
    /**
     * Separator icon styling.
     */
    separator: [
      // base
      "[&>svg]:size-3.5",
      // text color
      "text-zinc-400 dark:text-zinc-500",
    ],
    /**
     * Ellipsis indicator for truncated paths.
     */
    ellipsis: [
      // base
      "flex size-9 items-center justify-center",
      // text color
      "text-zinc-400 dark:text-zinc-500",
    ],
  },
});
