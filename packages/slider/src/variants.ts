import { focusRing } from "@patternmode/utils/focus-ring";
import { tv } from "tailwind-variants";

export const sliderVariants = tv({
  slots: {
    root: [
      // base
      "relative flex cursor-pointer touch-none select-none",
      // orientation
      "data-[orientation='horizontal']:w-full data-[orientation='horizontal']:items-center",
      "data-[orientation='vertical']:h-full data-[orientation='vertical']:w-fit data-[orientation='vertical']:justify-center",
      // disabled
      "data-[disabled]:pointer-events-none",
    ],
    control: [
      // base
      "relative flex h-full w-full items-center",
      // orientation
      "data-[orientation='horizontal']:w-full data-[orientation='horizontal']:py-3",
      "data-[orientation='vertical']:h-full data-[orientation='vertical']:flex-col data-[orientation='vertical']:px-3",
    ],
    track: [
      // base: very thin neutral track
      "relative grow rounded-full bg-zinc-300 dark:bg-zinc-700",
      // orientation
      "data-[orientation='horizontal']:h-px data-[orientation='horizontal']:w-full",
      "data-[orientation='vertical']:h-full data-[orientation='vertical']:w-px",
    ],
    indicator: [
      // base: will be colored by variant
      "absolute rounded-full",
      // orientation
      "data-[orientation='horizontal']:h-full",
      "data-[orientation='vertical']:w-full",
      // disabled override stays neutral
      "data-[disabled]:bg-zinc-300 dark:data-[disabled]:bg-zinc-700",
    ],
    thumb: [
      // base: circular handle with blue outline
      "relative block size-5 shrink-0 rounded-full border",
      // border color → blue ring
      "border-blue-600 dark:border-blue-500",
      // background color (white center)
      "bg-white dark:bg-white",
      // disabled
      "data-[disabled]:pointer-events-none data-[disabled]:bg-zinc-200 dark:data-[disabled]:border-zinc-800 dark:data-[disabled]:bg-zinc-600",
      // focus
      focusRing,
      "outline-offset-0",
    ],
    value: [
      // base
      "font-medium text-sm text-zinc-900 dark:text-zinc-50",
      // spacing
      "mb-2",
    ],
  },
  variants: {
    // Controls whether the selected range fill uses accent color or stays neutral
    accent: {
      true: {
        indicator: "bg-blue-600 dark:bg-blue-500",
      },
      false: {
        indicator: "bg-zinc-300 dark:bg-zinc-700",
      },
    },
  },
  defaultVariants: {
    accent: true,
  },
});
