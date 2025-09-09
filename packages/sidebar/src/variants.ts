import { tv } from "tailwind-variants";

export const sidebarVariants = tv({
  base: [
    "Sidebar",
    "fixed inset-y-0 left-0 z-40",
    "transition-[width] duration-200 ease-out",
    "bg-white dark:bg-zinc-900",
    "border-zinc-200 border-r dark:border-zinc-800",
  ],
  variants: {
    size: {
      "2xs": "",
      xs: "",
      sm: "",
      base: "",
      lg: "",
    },
    state: {
      collapsed: "w-[var(--sidebar-collapsed-width)]",
      open: "w-[var(--sidebar-open-width)]",
      pinned: "w-[var(--sidebar-open-width)]",
      locked: "w-[var(--sidebar-collapsed-width)]",
    },
  },
  defaultVariants: {
    size: "base",
    state: "collapsed",
  },
});

export const sidebarContentVariants = tv({
  base: "flex-1 overflow-y-auto p-2.5",
  variants: {
    size: {
      "2xs": "p-1.5",
      xs: "p-2",
      sm: "p-2.5",
      base: "p-2.5",
      lg: "p-3",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

export const sidebarHeaderVariants = tv({
  base: "flex-shrink-0 p-2.5",
  variants: {
    size: {
      "2xs": "p-1.5",
      xs: "p-2",
      sm: "p-2.5",
      base: "p-2.5",
      lg: "p-3",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

export const sidebarFooterVariants = tv({
  base: "flex flex-shrink-0 flex-col gap-2 p-2",
  variants: {
    size: {
      "2xs": "gap-1.5 p-1.5",
      xs: "gap-1.5 p-1.5",
      sm: "gap-2 p-2",
      base: "gap-2 p-2",
      lg: "gap-2.5 p-2.5",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

export const sidebarGroupVariants = tv({
  base: "relative flex w-full min-w-0 flex-col",
  variants: {
    size: {
      "2xs": "",
      xs: "",
      sm: "",
      base: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

export const sidebarGroupLabelVariants = tv({
  base: "group-data-[collapsible=icon]:-mt-8 flex h-8 shrink-0 items-center rounded-md px-2 font-medium text-xs text-zinc-500 transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 focus-visible:ring-zinc-200 group-data-[collapsible=icon]:opacity-0 dark:text-zinc-400 dark:focus-visible:ring-zinc-800 [&>svg]:size-4 [&>svg]:shrink-0",
  variants: {
    size: {
      "2xs": "h-6 px-1.5 text-xs",
      xs: "h-7 px-1.5 text-xs",
      sm: "h-8 px-2 text-xs",
      base: "h-8 px-2 text-xs",
      lg: "h-9 px-2.5 text-sm",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

export const sidebarItemVariants = tv({
  base: [],
  variants: {
    isActive: {
      true: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
      false: "",
    },
    isExpanded: {
      true: "",
      false: "justify-center",
    },
  },
  defaultVariants: {
    isActive: false,
    isExpanded: true,
  },
});

export const sidebarSeparatorVariants = tv({
  base: "mx-2 w-auto bg-border",
  variants: {
    size: {
      "2xs": "mx-1.5",
      xs: "mx-1.5",
      sm: "mx-2",
      base: "mx-2",
      lg: "mx-2.5",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

export const sidebarMobileVariants = tv({
  base: [
    "fixed inset-y-0 left-0 z-50",
    "w-[var(--sidebar-open-width)] max-w-xs",
    "bg-white dark:bg-zinc-900",
    "border-zinc-200 border-r dark:border-zinc-800",
    "transition-transform duration-200 ease-out",
    "focus:outline-none",
  ],
});

export const sidebarOverlayVariants = tv({
  base: [
    "fixed inset-0 z-30",
    "bg-black/20",
    "transition-opacity duration-200 ease-out",
    "pointer-events-none",
  ],
  variants: {
    visible: {
      true: "opacity-100",
      false: "opacity-0",
    },
  },
  defaultVariants: {
    visible: false,
  },
});
