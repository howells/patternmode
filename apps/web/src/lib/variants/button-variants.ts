/**
 * Button-Specific Variant Definitions
 *
 * Complex interactive styles specifically designed for button components.
 * These variants include hover states, disabled states, and other interactive behaviors.
 */

/**
 * Button-specific variant styling
 * These are complex interactive styles specific to buttons
 */
export const buttonSpecificVariants = {
  "secondary": [
    // clean secondary without border, just shadow
    "shadow-xs",
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // background color
    "bg-zinc-100 dark:bg-zinc-800",
    // hover with shadow only
    "hover:bg-zinc-200 hover:shadow-xs",
    "dark:hover:bg-zinc-700",
    // disabled
    "disabled:bg-zinc-50 disabled:text-zinc-400 disabled:shadow-none",
    "dark:disabled:bg-zinc-900 dark:disabled:text-zinc-600",
  ],
  "destructive": [
    // inset border with normal shadow using proper Tailwind classes
    "inset-ring-1 inset-ring-white/20 shadow-xs",
    "dark:inset-ring-white/10",
    // text color
    "text-white dark:text-white",
    // background color
    "bg-red-500 dark:bg-red-900",
    // hover with enhanced inset border
    "hover:bg-red-600 hover:inset-ring-white/25 hover:shadow-xs",
    "dark:hover:bg-red-800 dark:hover:inset-ring-white/15",
    // disabled
    "disabled:bg-red-300 disabled:text-white disabled:inset-ring-white/15 disabled:shadow-none",
    "dark:disabled:bg-red-950 dark:disabled:text-red-400 dark:disabled:inset-ring-white/5",
  ],
  "outline": [
    // inset border with normal shadow using proper Tailwind classes
    "inset-ring-1 inset-ring-black/15 shadow-xs",
    "dark:inset-ring-white/15",
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // background color
    "bg-white dark:bg-zinc-950",
    // hover with enhanced inset border
    "hover:bg-zinc-100 hover:inset-ring-black/20 hover:shadow-xs",
    "dark:hover:bg-zinc-800 dark:hover:inset-ring-white/20",
    // disabled
    "disabled:text-zinc-400 disabled:inset-ring-black/10 disabled:shadow-none",
    "dark:disabled:text-zinc-600 dark:disabled:inset-ring-white/10",
  ],
  "outline-dashed": [
    // dashed border with normal shadow
    "border-2 border-dashed  shadow-xs",
    "dark:border-zinc-600",
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // background color
    "bg-white dark:bg-zinc-950",
    // hover with enhanced border
    "hover:bg-zinc-100 hover:border-zinc-400 hover:shadow-xs",
    "dark:hover:bg-zinc-800 dark:hover:border-zinc-500",
    // disabled
    "disabled:text-zinc-400 disabled: disabled:shadow-none",
    "dark:disabled:text-zinc-600 dark:disabled:border-zinc-700",
  ],
  "ghost": [
    // base
    "shadow-none",
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // hover with just background and shadow, no border
    "bg-transparent hover:bg-zinc-100 hover:shadow-xs",
    "dark:hover:bg-zinc-800",
    // disabled
    "disabled:text-zinc-400",
    "dark:disabled:text-zinc-600",
  ],
  "inverse-ghost": [
    // base
    "shadow-none",
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // hover and active with white background for light backgrounds
    "bg-transparent hover:bg-white active:bg-white",
    "dark:hover:bg-zinc-800 dark:active:bg-zinc-800",
    // current/selected state with white background
    "data-[current=true]:bg-white",
    "dark:data-[current=true]:bg-zinc-800",
    // disabled
    "disabled:text-zinc-400",
    "dark:disabled:text-zinc-600",
  ],
  "link": [
    // base
    "shadow-none",
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // hover color
    "bg-transparent hover:underline hover:underline-offset-3 decoration-current/25",
    // disabled
    "disabled:text-zinc-400",
    "dark:disabled:text-zinc-600",
  ],
  "minimal": [
    // base - completely transparent, no shadows
    "shadow-none bg-transparent",
    // text color
    "text-zinc-950 dark:text-white",
    // hover - no background change, just subtle opacity
    "hover:text-zinc-700 dark:hover:text-zinc-300",
    // disabled
    "disabled:text-zinc-400 dark:disabled:text-zinc-600",
  ],
} as const;

/**
 * Default button variant with sophisticated styling
 */
export const defaultButtonVariant = [
  // inset border with normal shadow using proper Tailwind classes
  "inset-ring-1 inset-ring-white/10 shadow-xs",
  "dark:inset-ring-black/20",
  // text color
  "text-white dark:text-white",
  // background color
  "bg-zinc-900 dark:bg-zinc-50",
  // hover with enhanced inset border
  "hover:bg-zinc-800 hover:inset-ring-white/15 hover:shadow-xs",
  "dark:hover:bg-zinc-200 dark:hover:inset-ring-black/25",
  // disabled
  "disabled:bg-zinc-400 disabled:text-white disabled:inset-ring-white/5 disabled:shadow-none",
  "dark:disabled:bg-zinc-600 dark:disabled:text-zinc-300 dark:disabled:inset-ring-black/10",
];
