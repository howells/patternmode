import { tv } from "tailwind-variants";

import { focusInput, hasErrorInput } from "../../lib/utils";

export const inputStyles = tv({
  base: [
    // base
    "relative block w-full max-w-sm appearance-none rounded-md border shadow-xs outline-hidden transition",
    // border color
    " dark:border-zinc-800",
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // placeholder color
    "placeholder-zinc-400 dark:placeholder-zinc-500",
    // background color
    "bg-white dark:bg-zinc-950",
    // disabled
    "data-disabled: data-disabled:bg-zinc-100 data-disabled:text-zinc-400",
    "dark:data-disabled:border-zinc-700 dark:data-disabled:bg-zinc-800 dark:data-disabled:text-zinc-500",
    // focus
    focusInput,
    // invalid - Base UI uses data-invalid
    "data-invalid:ring-2 data-invalid:ring-red-200 data-invalid:border-red-500 dark:data-invalid:ring-red-400/20",
    // remove search cancel button (optional)
    "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
  ],
  variants: {
    size: {
      xs: [
        "h-control-xs text-xs",
        // file styles for xs
        "file:-my-1.5 file:-ml-1.5 file:px-1.5 file:py-1 file:[margin-inline-end:0.375rem]",
      ],
      sm: [
        "h-control-sm text-sm",
        // file styles for sm
        "file:-my-2 file:-ml-2 file:px-2 file:py-1.5 file:[margin-inline-end:0.5rem]",
      ],
      base: [
        "h-control-base text-sm",
        // file styles for base
        "file:-my-2.5 file:-ml-2.5 file:px-3 file:py-2 file:[margin-inline-end:0.75rem]",
      ],
      lg: [
        "h-control-lg text-base",
        // file styles for lg
        "file:-my-3 file:-ml-3 file:px-4 file:py-2.5 file:[margin-inline-end:1rem]",
      ],
    },
    hasError: {
      true: hasErrorInput,
    },
    // number input
    enableStepper: {
      false:
        "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
    },
  },
  defaultVariants: {
    size: "base",
  },
  compoundVariants: [
    // File input styles that are shared across all sizes
    {
      class: [
        "file:cursor-pointer file:rounded-l-[5px] file:rounded-r-none file:border-0 file:outline-hidden focus:outline-hidden data-disabled:pointer-events-none file:data-disabled:pointer-events-none",
        "file:border-solid file: file:bg-zinc-50 file:text-zinc-500 file:hover:bg-zinc-100 dark:file:border-zinc-800 dark:file:bg-zinc-950 dark:file:hover:bg-zinc-900/20 dark:file:data-disabled:border-zinc-700",
        "file:[border-inline-end-width:1px]",
        "file:data-disabled:bg-zinc-100 file:data-disabled:text-zinc-500 dark:file:data-disabled:bg-zinc-800",
      ],
    },
  ],
});
