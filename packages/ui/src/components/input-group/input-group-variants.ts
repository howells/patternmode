import { cva } from "class-variance-authority";
import { RADIUS_CLASSES } from "../../lib/radius";
import type { ComponentSize } from "../../lib/size";
import type { IconSize } from "../icon";
import type { InputGroupSize } from "./input-group-types";

/** Map input group size to icon size.
 * Matches Button behavior: icons stay relatively consistent (xs for most sizes).
 */
export function inputGroupSizeToIconSize(
  size: InputGroupSize | null | undefined,
): IconSize {
  switch (size) {
    case "2xs":
      return "2xs"; // 12px
    case "xs":
      return "2xs"; // 12px
    case "sm":
      return "xs"; // 16px
    case "base":
      return "xs"; // 16px
    case "lg":
      return "xs"; // 16px
    case "xl":
      return "xs"; // 16px
    case "2xl":
      return "xs"; // 16px
    case "3xl":
      return "xs"; // 16px
    default:
      return "xs";
  }
}

export type IconButtonSize = `icon-${ComponentSize}`;

/** Map input group size to base button size (for styling/padding). */
export function inputGroupSizeToButtonSize(
  size: InputGroupSize | null | undefined,
): IconButtonSize {
  switch (size) {
    case "2xs":
      return "icon-2xs";
    case "xs":
      return "icon-2xs";
    case "sm":
      return "icon-xs";
    case "base":
      return "icon-sm";
    case "lg":
      return "icon-base";
    case "xl":
      return "icon-lg";
    case "2xl":
      return "icon-xl";
    case "3xl":
      return "icon-2xl";
    default:
      return "icon-sm";
  }
}

/** Get exact height class for InputGroupButton to achieve 2px gap.
 * Formula: button height = container height - 2px border - 4px gap (2px each side)
 */
export function inputGroupButtonHeightClass(
  size: InputGroupSize | null | undefined,
): string {
  switch (size) {
    case "2xs":
      return "!h-[18px]"; // 24 - 2 - 4 = 18px
    case "xs":
      return "!h-[22px]"; // 28 - 2 - 4 = 22px
    case "sm":
      return "!h-[26px]"; // 32 - 2 - 4 = 26px
    case "base":
      return "!h-[30px]"; // 36 - 2 - 4 = 30px
    case "lg":
      return "!h-[34px]"; // 40 - 2 - 4 = 34px
    case "xl":
      return "!h-[38px]"; // 44 - 2 - 4 = 38px
    case "2xl":
      return "!h-[42px]"; // 48 - 2 - 4 = 42px
    case "3xl":
      return "!h-[50px]"; // 56 - 2 - 4 = 50px
    default:
      return "!h-[30px]";
  }
}

/** Get negative margin class for InputGroupButton to pull to edge. */
export function inputGroupButtonMarginClass(
  size: InputGroupSize | null | undefined,
): string {
  // Leave ~2px gap from edge (padding minus 0.5)
  switch (size) {
    case "2xs":
      return "-mr-1"; // px-1.5 - 0.5 = 1
    case "xs":
      return "-mr-1.5"; // px-2 - 0.5 = 1.5
    case "sm":
      return "-mr-1.5"; // px-2 - 0.5 = 1.5
    case "base":
      return "-mr-2"; // px-2.5 - 0.5 = 2
    case "lg":
      return "-mr-2.5"; // px-3 - 0.5 = 2.5
    case "xl":
      return "-mr-2.5"; // px-3 - 0.5 = 2.5
    case "2xl":
      return "-mr-3"; // px-3.5 - 0.5 = 3
    case "3xl":
      return "-mr-3.5"; // px-4 - 0.5 = 3.5
    default:
      return "-mr-2";
  }
}

/** InputGroup container variants. */
export const inputGroupVariants = cva(
  "relative flex w-full items-center border border-border bg-input shadow-xs transition-[box-shadow,border-color]",
  {
    variants: {
      size: {
        "2xs": "h-6 gap-1 px-1.5",
        xs: "h-7 gap-1.5 px-2",
        sm: "h-8 gap-1.5 px-2",
        base: "h-9 gap-2 px-2.5",
        lg: "h-10 gap-2 px-3",
        xl: "h-11 gap-2.5 px-3",
        "2xl": "h-12 gap-2.5 px-3.5",
        "3xl": "h-14 gap-3 px-4",
      },
      radius: RADIUS_CLASSES,
    },
    compoundVariants: [
      { radius: "rounded", size: ["2xs", "xs"], class: "rounded-sm" },
    ],
    defaultVariants: {
      size: "base",
      radius: "rounded",
    },
  },
);

/** InputGroupInput/Textarea variants (inside InputGroup). */
export const inputGroupControlVariants = cva(
  "min-w-0 flex-1 border-0 bg-transparent shadow-none outline-none ring-0 selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:border-0 focus-visible:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      size: {
        "2xs": "h-6 py-0.5 text-xs",
        xs: "h-7 py-1 text-xs",
        sm: "h-8 py-1 text-sm",
        base: "h-9 py-1.5 text-sm",
        lg: "h-10 py-2 text-base",
        xl: "h-11 py-2 text-base",
        "2xl": "h-12 py-2.5 text-lg",
        "3xl": "h-14 py-3 text-xl",
      },
    },
    defaultVariants: {
      size: "base",
    },
  },
);

/** InputGroupAddon variants for muted background styling. */
export const inputGroupAddonMutedVariants = cva(
  "flex items-center justify-center whitespace-nowrap border-border bg-secondary text-muted-foreground",
  {
    variants: {
      size: {
        "2xs": "text-xs",
        xs: "text-xs",
        sm: "text-xs",
        base: "text-sm",
        lg: "text-sm",
        xl: "text-base",
        "2xl": "text-base",
        "3xl": "text-lg",
      },
      align: {
        "inline-start": "border-r",
        "inline-end": "border-l",
        "block-start": "",
        "block-end": "",
      },
    },
    compoundVariants: [
      // inline-start: negative margin + padding must match InputGroup px-* for each size
      // Parent overflow-hidden clips to container border radius
      { size: "2xs", align: "inline-start", class: "-ml-1.5 px-1.5" },
      { size: "xs", align: "inline-start", class: "-ml-2 px-2" },
      { size: "sm", align: "inline-start", class: "-ml-2 px-2" },
      { size: "base", align: "inline-start", class: "-ml-2.5 px-2.5" },
      { size: "lg", align: "inline-start", class: "-ml-3 px-3" },
      { size: "xl", align: "inline-start", class: "-ml-3 px-3" },
      { size: "2xl", align: "inline-start", class: "-ml-3.5 px-3.5" },
      { size: "3xl", align: "inline-start", class: "-ml-4 px-4" },
      // inline-end: same pattern for suffix
      { size: "2xs", align: "inline-end", class: "-mr-1.5 px-1.5" },
      { size: "xs", align: "inline-end", class: "-mr-2 px-2" },
      { size: "sm", align: "inline-end", class: "-mr-2 px-2" },
      { size: "base", align: "inline-end", class: "-mr-2.5 px-2.5" },
      { size: "lg", align: "inline-end", class: "-mr-3 px-3" },
      { size: "xl", align: "inline-end", class: "-mr-3 px-3" },
      { size: "2xl", align: "inline-end", class: "-mr-3.5 px-3.5" },
      { size: "3xl", align: "inline-end", class: "-mr-4 px-4" },
    ],
    defaultVariants: {
      size: "base",
      align: "inline-start",
    },
  },
);
