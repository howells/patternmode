/*
 * Tailwind CSS Grid Classes Reference for @patternmode/grid
 *
 * This file contains literal class name strings that Tailwind CSS will scan and include
 * in the build. Since your @source directive includes this package, Tailwind will
 * find these string literals and ensure the corresponding CSS is generated.
 *
 * The GridCell component generates classes dynamically, so we need these references
 * to prevent purging of the grid utility classes.
 */

// Column spans
export const COLUMN_SPAN_CLASSES = [
  "col-span-1",
  "col-span-2",
  "col-span-3",
  "col-span-4",
  "col-span-5",
  "col-span-6",
  "col-span-7",
  "col-span-8",
  "col-span-9",
  "col-span-10",
  "col-span-11",
  "col-span-12",
] as const;

// Row spans
export const ROW_SPAN_CLASSES = [
  "row-span-1",
  "row-span-2",
  "row-span-3",
  "row-span-4",
  "row-span-5",
  "row-span-6",
  "row-span-7",
  "row-span-8",
  "row-span-9",
  "row-span-10",
  "row-span-11",
  "row-span-12",
] as const;

// Column starts
export const COLUMN_START_CLASSES = [
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
  "col-start-8",
  "col-start-9",
  "col-start-10",
  "col-start-11",
  "col-start-12",
  "col-start-13",
] as const;

// Column ends
export const COLUMN_END_CLASSES = [
  "col-end-1",
  "col-end-2",
  "col-end-3",
  "col-end-4",
  "col-end-5",
  "col-end-6",
  "col-end-7",
  "col-end-8",
  "col-end-9",
  "col-end-10",
  "col-end-11",
  "col-end-12",
  "col-end-13",
  "col-end-14",
] as const;

// Row starts
export const ROW_START_CLASSES = [
  "row-start-1",
  "row-start-2",
  "row-start-3",
  "row-start-4",
  "row-start-5",
  "row-start-6",
  "row-start-7",
  "row-start-8",
  "row-start-9",
  "row-start-10",
  "row-start-11",
  "row-start-12",
  "row-start-13",
] as const;

// Row ends
export const ROW_END_CLASSES = [
  "row-end-1",
  "row-end-2",
  "row-end-3",
  "row-end-4",
  "row-end-5",
  "row-end-6",
  "row-end-7",
  "row-end-8",
  "row-end-9",
  "row-end-10",
  "row-end-11",
  "row-end-12",
  "row-end-13",
  "row-end-14",
] as const;

// All grid classes combined (for convenience)
export const ALL_GRID_CLASSES = [
  ...COLUMN_SPAN_CLASSES,
  ...ROW_SPAN_CLASSES,
  ...COLUMN_START_CLASSES,
  ...COLUMN_END_CLASSES,
  ...ROW_START_CLASSES,
  ...ROW_END_CLASSES,
] as const;
