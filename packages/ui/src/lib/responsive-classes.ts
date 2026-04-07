/**
 * Pre-defined class maps for responsive utilities.
 * All classes are spelled out explicitly for Tailwind static analysis.
 */

import type { FlexAlign } from "./alignment";
import type { FlexDirection } from "./direction";
import type { FlexJustify } from "./justify";
import { COMPONENT_SIZES, type ComponentSize } from "./size";
import type { FlexWrap } from "./wrap";

// ============================================================================
// GAP CLASSES
// ============================================================================

/** Extended gap size including none and 3xs */
export const GAP_SIZES = ["none", "3xs", ...COMPONENT_SIZES] as const;
export type GapSize = (typeof GAP_SIZES)[number];

/**
 * GAP_CLASS utility.
 * Import from "@patternmode/ui/lib/responsive-classes".
 */
export const GAP_CLASS: Record<GapSize, string> = {
  none: "gap-0",
  "3xs": "gap-0.5",
  "2xs": "gap-1",
  xs: "gap-2",
  sm: "gap-3",
  base: "gap-4",
  lg: "gap-5",
  xl: "gap-6",
  "2xl": "gap-8",
  "3xl": "gap-10",
};

/**
 * GAP_X_CLASS utility.
 * Import from "@patternmode/ui/lib/responsive-classes".
 */
export const GAP_X_CLASS: Record<GapSize, string> = {
  none: "gap-x-0",
  "3xs": "gap-x-0.5",
  "2xs": "gap-x-1",
  xs: "gap-x-2",
  sm: "gap-x-3",
  base: "gap-x-4",
  lg: "gap-x-5",
  xl: "gap-x-6",
  "2xl": "gap-x-8",
  "3xl": "gap-x-10",
};

/**
 * GAP_Y_CLASS utility.
 * Import from "@patternmode/ui/lib/responsive-classes".
 */
export const GAP_Y_CLASS: Record<GapSize, string> = {
  none: "gap-y-0",
  "3xs": "gap-y-0.5",
  "2xs": "gap-y-1",
  xs: "gap-y-2",
  sm: "gap-y-3",
  base: "gap-y-4",
  lg: "gap-y-5",
  xl: "gap-y-6",
  "2xl": "gap-y-8",
  "3xl": "gap-y-10",
};

// ============================================================================
// FLEX DIRECTION CLASSES
// ============================================================================

/**
 * DIRECTION_CLASS utility.
 * Import from "@patternmode/ui/lib/responsive-classes".
 */
export const DIRECTION_CLASS: Record<FlexDirection, string> = {
  row: "flex-row",
  column: "flex-col",
  "row-reverse": "flex-row-reverse",
  "column-reverse": "flex-col-reverse",
};

// ============================================================================
// JUSTIFY CLASSES
// ============================================================================

/**
 * JUSTIFY_CLASS utility.
 * Import from "@patternmode/ui/lib/responsive-classes".
 */
export const JUSTIFY_CLASS: Record<FlexJustify, string> = {
  "flex-start": "justify-start",
  center: "justify-center",
  "flex-end": "justify-end",
  "space-between": "justify-between",
  "space-around": "justify-around",
  "space-evenly": "justify-evenly",
};

// ============================================================================
// ALIGN CLASSES
// ============================================================================

/**
 * ALIGN_CLASS utility.
 * Import from "@patternmode/ui/lib/responsive-classes".
 */
export const ALIGN_CLASS: Record<FlexAlign, string> = {
  stretch: "items-stretch",
  "flex-start": "items-start",
  center: "items-center",
  "flex-end": "items-end",
  baseline: "items-baseline",
};

// ============================================================================
// WRAP CLASSES
// ============================================================================

/**
 * WRAP_CLASS utility.
 * Import from "@patternmode/ui/lib/responsive-classes".
 */
export const WRAP_CLASS: Record<FlexWrap, string> = {
  wrap: "flex-wrap",
  nowrap: "flex-nowrap",
  "wrap-reverse": "flex-wrap-reverse",
};

// ============================================================================
// GRID COLUMN CLASSES
// ============================================================================

/**
 * GRID_COLS_CLASS utility.
 * Import from "@patternmode/ui/lib/responsive-classes".
 */
export const GRID_COLS_CLASS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
};

// ============================================================================
// GRID COLUMN SPAN CLASSES
// ============================================================================

/**
 * COL_SPAN_CLASS utility.
 * Import from "@patternmode/ui/lib/responsive-classes".
 */
export const COL_SPAN_CLASS: Record<number | "auto" | "full", string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
  auto: "col-auto",
  full: "col-span-full",
};

// ============================================================================
// GRID COLUMN START (OFFSET) CLASSES
// ============================================================================

/**
 * COL_START_CLASS utility.
 * Import from "@patternmode/ui/lib/responsive-classes".
 */
export const COL_START_CLASS: Record<number | "auto", string> = {
  1: "col-start-1",
  2: "col-start-2",
  3: "col-start-3",
  4: "col-start-4",
  5: "col-start-5",
  6: "col-start-6",
  7: "col-start-7",
  8: "col-start-8",
  9: "col-start-9",
  10: "col-start-10",
  11: "col-start-11",
  12: "col-start-12",
  13: "col-start-13",
  auto: "col-start-auto",
};

// ============================================================================
// WIDTH CLASSES (for Space component)
// ============================================================================

/**
 * WIDTH_CLASS utility.
 * Import from "@patternmode/ui/lib/responsive-classes".
 */
export const WIDTH_CLASS: Record<ComponentSize, string> = {
  "2xs": "w-1",
  xs: "w-2",
  sm: "w-3",
  base: "w-4",
  lg: "w-5",
  xl: "w-6",
  "2xl": "w-8",
  "3xl": "w-10",
};

// ============================================================================
// HEIGHT CLASSES (for Space component)
// ============================================================================

/**
 * HEIGHT_CLASS utility.
 * Import from "@patternmode/ui/lib/responsive-classes".
 */
export const HEIGHT_CLASS: Record<ComponentSize, string> = {
  "2xs": "h-1",
  xs: "h-2",
  sm: "h-3",
  base: "h-4",
  lg: "h-5",
  xl: "h-6",
  "2xl": "h-8",
  "3xl": "h-10",
};

// ============================================================================
// PADDING CLASSES (for Container component)
// ============================================================================

/**
 * PADDING_X_CLASS utility.
 * Import from "@patternmode/ui/lib/responsive-classes".
 */
export const PADDING_X_CLASS: Record<ComponentSize, string> = {
  "2xs": "px-1",
  xs: "px-2",
  sm: "px-3",
  base: "px-4",
  lg: "px-5",
  xl: "px-6",
  "2xl": "px-8",
  "3xl": "px-10",
};

/**
 * PADDING_Y_CLASS utility.
 * Import from "@patternmode/ui/lib/responsive-classes".
 */
export const PADDING_Y_CLASS: Record<ComponentSize, string> = {
  "2xs": "py-1",
  xs: "py-2",
  sm: "py-3",
  base: "py-4",
  lg: "py-5",
  xl: "py-6",
  "2xl": "py-8",
  "3xl": "py-10",
};

// ============================================================================
// MAX-WIDTH CLASSES (for Container component)
// ============================================================================

/**
 * MAX_WIDTH_CLASS utility.
 * Import from "@patternmode/ui/lib/responsive-classes".
 */
export const MAX_WIDTH_CLASS: Record<ComponentSize, string> = {
  "2xs": "max-w-xs",
  xs: "max-w-sm",
  sm: "max-w-md",
  base: "max-w-lg",
  lg: "max-w-xl",
  xl: "max-w-2xl",
  "2xl": "max-w-4xl",
  "3xl": "max-w-6xl",
};

// ============================================================================
// ORDER CLASSES (for GridCol component)
// ============================================================================

/** Order type - supports numbers 1-12 plus special values */
export type OrderValue =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | "first"
  | "last"
  | "none";

/**
 * ORDER_CLASS utility.
 * Import from "@patternmode/ui/lib/responsive-classes".
 */
export const ORDER_CLASS: Record<OrderValue, string> = {
  1: "order-1",
  2: "order-2",
  3: "order-3",
  4: "order-4",
  5: "order-5",
  6: "order-6",
  7: "order-7",
  8: "order-8",
  9: "order-9",
  10: "order-10",
  11: "order-11",
  12: "order-12",
  first: "order-first",
  last: "order-last",
  none: "order-none",
};
