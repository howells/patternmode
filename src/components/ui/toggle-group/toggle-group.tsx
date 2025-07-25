// Tremor ToggleGroup [v1.0.0] - Base UI

"use client";

import { cx, focusRing } from "@/lib/utils";
import { Toggle as BaseToggle } from "@base-ui-components/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui-components/react/toggle-group";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { createButtonStyleVariants } from "../button/button";

const buttonStyleVariants = createButtonStyleVariants("destructive");

const toggleGroupVariants = tv({
  slots: {
    root: [
      // base
      "flex gap-px rounded-md border p-0.5",
      // colors
      "border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800",
    ],
    item: [
      // base
      "flex size-8 items-center justify-center rounded-sm text-sm font-medium select-none transition-all duration-100 ease-in-out",
      // colors
      "text-zinc-600 dark:text-zinc-400",
      // hover
      "hover:bg-zinc-100 dark:hover:bg-zinc-700",
      // active
      "active:bg-zinc-200 dark:active:bg-zinc-600",
      // pressed
      "data-[pressed]:bg-zinc-100 data-[pressed]:text-zinc-900 dark:data-[pressed]:bg-zinc-700 dark:data-[pressed]:text-zinc-100",
      // disabled
      "disabled:pointer-events-none disabled:opacity-50",
      // focus
      focusRing,
      "focus-visible:bg-none focus-visible:-outline-offset-1",
    ],
  },
  variants: {
    variant: {
      default: {
        root: "border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800",
        item: "",
      },
      outline: {
        root: "border-zinc-200 bg-transparent dark:border-zinc-600",
        item: "border border-transparent data-[pressed]:border-blue-500 dark:data-[pressed]:border-blue-400",
      },
      ghost: {
        root: "border-transparent bg-transparent",
        item: "hover:bg-zinc-100 dark:hover:bg-zinc-800",
      },
      // Button-style variants using shared button styling
      "button-default": {
        root: "border-transparent bg-transparent gap-2 p-0",
        item: [
          ...buttonStyleVariants.base,
          ...buttonStyleVariants.variants.default,
        ],
      },
      "button-secondary": {
        root: "border-transparent bg-transparent gap-2 p-0",
        item: [
          ...buttonStyleVariants.base,
          ...buttonStyleVariants.variants.secondary,
        ],
      },
      "button-outline": {
        root: "border-transparent bg-transparent gap-2 p-0",
        item: [
          ...buttonStyleVariants.base,
          ...buttonStyleVariants.variants.outline,
        ],
      },
      "button-ghost": {
        root: "border-transparent bg-transparent gap-2 p-0",
        item: [
          ...buttonStyleVariants.base,
          ...buttonStyleVariants.variants.ghost,
        ],
      },
      "button-destructive": {
        root: "border-transparent bg-transparent gap-2 p-0",
        item: [
          ...buttonStyleVariants.base,
          ...buttonStyleVariants.variants.destructive,
        ],
      },
    },
    size: {
      sm: {
        root: "gap-0.5 p-0.5",
        item: "size-6 text-xs rounded-sm",
      },
      default: {
        root: "gap-px p-0.5",
        item: "size-8 text-sm rounded-sm",
      },
      lg: {
        root: "gap-1 p-1",
        item: "size-10 text-base rounded-md",
      },
      // Button-style sizes using shared button sizing
      "button-sm": {
        root: "gap-2 p-0",
        item: buttonStyleVariants.sizes.sm,
      },
      "button-default": {
        root: "gap-2 p-0",
        item: buttonStyleVariants.sizes.default,
      },
      "button-lg": {
        root: "gap-2 p-0",
        item: buttonStyleVariants.sizes.lg,
      },
    },
    orientation: {
      horizontal: {
        root: "flex-row",
      },
      vertical: {
        root: "flex-col",
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    orientation: "horizontal",
  },
});

interface ToggleGroupProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof BaseToggleGroup>,
      "children"
    >,
    VariantProps<typeof toggleGroupVariants> {
  children: React.ReactNode;
}

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof BaseToggleGroup>,
  ToggleGroupProps
>(({ className, variant, size, orientation, children, ...props }, ref) => {
  const { root } = toggleGroupVariants({ variant, size, orientation });

  return (
    <BaseToggleGroup ref={ref} className={cx(root(), className)} {...props}>
      {children}
    </BaseToggleGroup>
  );
});

ToggleGroup.displayName = "ToggleGroup";

interface ToggleGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof BaseToggle>,
    VariantProps<typeof toggleGroupVariants> {
  value: string;
}

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof BaseToggle>,
  ToggleGroupItemProps
>(({ className, variant, size, children, ...props }, ref) => {
  const { item } = toggleGroupVariants({ variant, size });

  return (
    <BaseToggle ref={ref} className={cx(item(), className)} {...props}>
      {children}
    </BaseToggle>
  );
});

ToggleGroupItem.displayName = "ToggleGroupItem";

// Export the components
export { ToggleGroup, ToggleGroupItem, toggleGroupVariants };

export type { ToggleGroupItemProps, ToggleGroupProps };
