import { cn } from "@patternmode/ui/utils/cn";
import { focusRing } from "@patternmode/ui/utils/focus-ring";
import { cva } from "class-variance-authority";
import {
  SEGMENTED_GAP,
  SEGMENTED_SHELL_BASE,
  SEGMENTED_SHELL_PADDING,
  SEGMENTED_TRIGGER_PADDING,
} from "../../compositions/segmented";
import type { ComponentSize } from "../../lib/size";

const segmentedShellPaddingVariants = (
  Object.entries(SEGMENTED_SHELL_PADDING) as [ComponentSize, string][]
).map(([size, className]) => ({
  variant: "pill" as const,
  size,
  className,
}));

const segmentedGapVariants = (
  Object.entries(SEGMENTED_GAP) as [ComponentSize, string][]
).map(([size, className]) => ({
  variant: "pill" as const,
  size,
  className,
}));

/**
 * tabsListVariants variant class helper for Tabs.
 *
 * Both pill and line variants auto-size from content (h-auto).
 * Pill gets shell padding + gap from shared segmented tokens.
 */
export const tabsListVariants = cva(
  "inline-flex h-auto w-fit items-center justify-center",
  {
    variants: {
      variant: {
        pill: SEGMENTED_SHELL_BASE,
        line: "gap-6",
      },
      size: {
        "2xs": "",
        xs: "",
        sm: "",
        base: "",
        lg: "",
        xl: "",
        "2xl": "",
        "3xl": "",
      } satisfies Record<ComponentSize, string>,
    },
    compoundVariants: [
      ...segmentedShellPaddingVariants,
      ...segmentedGapVariants,
    ],
    defaultVariants: {
      variant: "pill",
      size: "base",
    },
  },
);

/** Text size per component size (shared by all trigger variants). */
const TRIGGER_TEXT_SIZE: Record<ComponentSize, string> = {
  "2xs": "text-2xs",
  xs: "text-xs",
  sm: "text-sm",
  base: "text-sm",
  lg: "text-sm",
  xl: "text-sm",
  "2xl": "text-sm",
  "3xl": "text-sm",
};

/** Line variant trigger padding (no horizontal padding, asymmetric vertical). */
const LINE_TRIGGER_PADDING: Record<ComponentSize, string> = {
  "2xs": "px-0 pt-0.5 pb-1.5",
  xs: "px-0 pt-1 pb-2",
  sm: "px-0 pt-1.5 pb-2.5",
  base: "px-0 pt-2 pb-3",
  lg: "px-0 pt-2.5 pb-3.5",
  xl: "px-0 pt-3 pb-4",
  "2xl": "px-0 pt-3.5 pb-4.5",
  "3xl": "px-0 pt-4 pb-5",
};

const pillTriggerCompoundVariants = (
  Object.entries(SEGMENTED_TRIGGER_PADDING) as [ComponentSize, string][]
).map(([size, className]) => ({
  variant: "pill" as const,
  size,
  className,
}));

const lineTriggerCompoundVariants = (
  Object.entries(LINE_TRIGGER_PADDING) as [ComponentSize, string][]
).map(([size, className]) => ({
  variant: "line" as const,
  size,
  className,
}));

/**
 * tabsTriggerVariants variant class helper for Tabs.
 *
 * Size variants only set text size. ALL padding is set via compound variants
 * (pill uses SEGMENTED_TRIGGER_PADDING, line uses LINE_TRIGGER_PADDING)
 * to avoid Tailwind class conflicts from competing padding utilities.
 */
export const tabsTriggerVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap font-medium transition-[color,box-shadow,border-color] disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        pill: "rounded-full text-muted-foreground data-[state=active]:text-foreground dark:text-gray-500 dark:data-[state=active]:text-gray-100",
        line: cn(
          "text-muted-foreground hover:text-foreground data-[state=active]:text-foreground dark:text-gray-500 dark:data-[state=active]:text-gray-100 dark:hover:text-gray-300",
          focusRing,
        ),
      },
      size: Object.fromEntries(
        Object.entries(TRIGGER_TEXT_SIZE).map(([size, textClass]) => [
          size,
          textClass,
        ]),
      ) as Record<ComponentSize, string>,
    },
    compoundVariants: [
      ...pillTriggerCompoundVariants,
      ...lineTriggerCompoundVariants,
    ],
    defaultVariants: {
      variant: "pill",
      size: "base",
    },
  },
);
