import { tv } from "tailwind-variants";

/**
 * Variants for preview card components with consistent floating surface styling.
 */
export const previewCardVariants = tv({
  slots: {
    // Trigger element with link-like styling
    trigger:
      "inline-flex items-center gap-1 text-blue-600 no-underline decoration-1 decoration-blue-600/60 underline-offset-2 outline-none transition-all duration-200 ease-out hover:underline hover:decoration-blue-600 focus-visible:rounded-sm focus-visible:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 data-[popup-open]:underline data-[popup-open]:decoration-blue-600 data-[popup-open]:focus-visible:no-underline dark:text-blue-400 dark:decoration-blue-400/60 dark:data-[popup-open]:decoration-blue-400 dark:hover:decoration-blue-400",

    // Positioner for smart positioning
    positioner:
      "z-50 data-[ending-style]:animate-out data-[starting-style]:animate-in",

    // Main content container with floating surface styling
    content:
      "w-80 max-w-sm origin-[var(--transform-origin)] overflow-hidden rounded-lg border-zinc-200 bg-white shadow-xl transition-[transform,scale,opacity] duration-200 ease-out data-[ending-style]:scale-90 data-[starting-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:border-zinc-800 dark:bg-zinc-950",

    // Arrow with floating surface styling
    arrow:
      "data-[side=right]:-rotate-90 flex transition-all duration-200 ease-out data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=top]:bottom-[-8px] data-[side=right]:left-[-13px] data-[side=left]:rotate-90 data-[side=top]:rotate-180",

    // Image with consistent aspect ratio
    image: "block aspect-video w-full rounded-t-md object-cover",

    // Header section with consistent spacing
    header: "flex flex-col space-y-1.5 p-4 pb-2",

    // Heading with prominent typography
    heading: "text-lg text-zinc-900 leading-6 tracking-tight dark:text-zinc-50",

    // Description with muted styling
    description:
      "text-pretty text-sm text-zinc-600 leading-6 dark:text-zinc-400",

    // Body section with padding
    body: "px-4 pt-0 pb-4",

    // Footer section with subtle styling and border
    footer:
      "flex items-center justify-between border-zinc-200 border-t bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50",
  },
  variants: {
    /**
     * Size variants for different preview card sizes
     */
    size: {
      sm: {
        content: "w-64 max-w-xs",
        header: "p-3 pb-1.5",
        body: "px-3 pt-0 pb-3",
        footer: "px-3 py-2.5",
      },
      md: {
        content: "w-80 max-w-sm",
        header: "p-4 pb-2",
        body: "px-4 pt-0 pb-4",
        footer: "px-4 py-3",
      },
      lg: {
        content: "w-96 max-w-md",
        header: "p-5 pb-2.5",
        body: "px-5 pt-0 pb-5",
        footer: "px-5 py-4",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * SVG paths for the preview card arrow with proper fill colors for light/dark modes.
 */
export const arrowSvgPaths = {
  // Main arrow shape
  main: "M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z",
  // Border layer 1
  border1:
    "M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z",
  // Border layer 2
  border2:
    "M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z",
};

/**
 * Fill classes for arrow SVG paths to match floating surface styling.
 */
export const arrowFillClasses = {
  main: "fill-white dark:fill-zinc-950",
  border1: "fill-zinc-200 dark:fill-zinc-700",
  border2: "fill-zinc-300 dark:fill-zinc-600",
};
