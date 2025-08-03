"use client";

import type { VariantProps } from "tailwind-variants";
import type { ButtonProps } from "../button/component";
import * as React from "react";

import { tv } from "tailwind-variants";
import { cx } from "../../lib/utils";
import { Button } from "../button/component";

const dropdownItemVariants = tv({
  base: [
    // Override button defaults for dropdown context
    "w-full justify-start text-left font-normal rounded-sm shadow-none",
    // hover - subtle background change
    "hover:bg-zinc-100 dark:hover:bg-zinc-900",
    // highlighted/focused state
    "data-[highlighted]:bg-zinc-100 dark:data-[highlighted]:bg-zinc-800",
    // selected state
    "data-[selected]:bg-blue-50 data-[selected]:text-blue-900 dark:data-[selected]:bg-blue-900/20 dark:data-[selected]:text-blue-100",
    "data-[selected]:font-semibold",
  ],
  variants: {
    variant: {
      default: "",
      destructive: [
        "text-red-900 dark:text-red-100",
        "hover:bg-red-50 dark:hover:bg-red-900/20",
        "data-[highlighted]:bg-red-50 dark:data-[highlighted]:bg-red-900/20",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type DropdownItemProps = {
  /**
   * Whether the item is highlighted/focused.
   * Typically managed by dropdown component state.
   */
  highlighted?: boolean;
  /**
   * Whether the item is selected.
   * Shows visual selection state and selection indicator.
   */
  selected?: boolean;
  /**
   * Hint text to display on the right.
   * Useful for showing roles, statuses, or additional context.
   */
  hint?: string;
  /**
   * Visual style variant of the dropdown item.
   * Use destructive for dangerous actions like delete.
   * @default "default"
   */
  variant?: "default" | "destructive";
} & Omit<ButtonProps, "variant" | "fullWidth" | "textAlign"> & VariantProps<typeof dropdownItemVariants> & {
  /**
   * ARIA role for accessibility.
   * Typically "option" for dropdown items.
   */
  role?: string;
};

/**
 * A consistent dropdown item component that extends Button for use across dropdown components.
 */
const DropdownItem = ({ ref, className, variant, highlighted = false, selected = false, hint, children, role = "option", ...props }: DropdownItemProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  return (
    <Button
      ref={ref}
      render={<div />}
      variant="ghost"
      className={cx(
        dropdownItemVariants({ variant }),
        className,
      )}
      data-highlighted={highlighted ? "true" : undefined}
      data-selected={selected ? "true" : undefined}
      aria-selected={selected}
      role={role}
      {...props}
    >
      {children}
      {hint && (
        <span className="ml-auto text-xs text-zinc-500 dark:text-zinc-400">
          {hint}
        </span>
      )}
    </Button>
  );
};

DropdownItem.displayName = "DropdownItem";

export { DropdownItem };
