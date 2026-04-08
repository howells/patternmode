import type { ComponentSize } from "../../lib/size";

/** Shared shell classes for segmented controls (Tabs default, ToggleGroup pill). */
export const SEGMENTED_SHELL_BASE =
  "rounded-full bg-zinc-100/60 text-muted-foreground dark:bg-white/5 dark:text-zinc-500";

/** Shared shell padding scale by size. */
export const SEGMENTED_SHELL_PADDING: Record<ComponentSize, string> = {
  "2xs": "p-0.5",
  xs: "p-0.5",
  sm: "p-0.5",
  base: "p-0.5",
  lg: "p-1",
  xl: "p-1",
  "2xl": "p-1.5",
  "3xl": "p-1.5",
};

/** Shared trigger/item padding scale by size. */
export const SEGMENTED_TRIGGER_PADDING: Record<ComponentSize, string> = {
  "2xs": "px-2 py-1",
  xs: "px-2.5 py-1.5",
  sm: "px-3 py-2",
  base: "px-3.5 py-2.5",
  lg: "px-5 py-3",
  xl: "px-6 py-3.5",
  "2xl": "px-7 py-4",
  "3xl": "px-8 py-5",
};

/** Shared inner gap scale by size (space between triggers inside the shell). */
export const SEGMENTED_GAP: Record<ComponentSize, string> = {
  "2xs": "gap-0.5",
  xs: "gap-0.5",
  sm: "gap-0.5",
  base: "gap-1",
  lg: "gap-1",
  xl: "gap-1.5",
  "2xl": "gap-1.5",
  "3xl": "gap-2",
};

/** Shared active indicator visual treatment — white pill with shadow-border ring. */
export const SEGMENTED_INDICATOR_CLASS =
  "bg-card border-0 shadow-borders-base dark:bg-white/10 dark:shadow-none";

/** Shared active indicator utility for Radix data-state selectors. */
export const SEGMENTED_INDICATOR_ACTIVE_CLASS =
  "data-[state=on]:bg-card data-[state=on]:border-0 data-[state=on]:shadow-borders-base dark:data-[state=on]:bg-white/10 dark:data-[state=on]:shadow-none";
