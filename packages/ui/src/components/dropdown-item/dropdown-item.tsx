"use client";

import type { VariantProps } from "tailwind-variants";
import type { ButtonProps } from "../button/button";
import * as React from "react";

import { tv } from "tailwind-variants";
import { cx } from "../../lib/utils";
import { Button } from "../button/button";

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

/**
 * Props for the DropdownItem component.
 */
export type DropdownItemProps = {
  /**
   * Whether the item is highlighted/focused.
   */
  highlighted?: boolean;
  /**
   * Whether the item is selected.
   */
  selected?: boolean;
  /**
   * Hint text to display on the right.
   */
  hint?: string;
} & Omit<ButtonProps, "variant" | "fullWidth" | "textAlign"> & VariantProps<typeof dropdownItemVariants>;

/**
 * A consistent dropdown item component that extends Button for use across Select, Combobox, TagInput, Menu, and other dropdown components.
 *
 * Built on top of the Button component, inheriting all its functionality (icons, variants, sizes, states) while providing
 * dropdown-specific styling and behavior. This ensures consistency across all dropdown components while leveraging
 * the robust Button foundation.
 *
 * **Key Features:**
 * - **Button Foundation**: Inherits all Button functionality (icons, kbd shortcuts, loading states, etc.)
 * - **Dropdown Styling**: Specialized styling for dropdown contexts (full width, left alignment, subtle hover)
 * - **Selection States**: Visual feedback for highlighted and selected states
 * - **Consistent Behavior**: Standardized interaction patterns across all dropdown components
 * - **Accessibility**: Proper ARIA attributes and keyboard navigation support inherited from Button
 * - **Theme Support**: Full dark mode compatibility.
 *
 * @category utility
 * @icon List
 * @example
 * ```tsx
 * // Basic dropdown item
 * <DropdownItem>Option 1</DropdownItem>
 *
 * // With icon and selection state
 * <DropdownItem
 *   leftIcon={UserIcon}
 *   selected={true}
 *   rightIcon={CheckIcon}
 * >
 *   John Doe
 * </DropdownItem>
 *
 * // With keyboard shortcut (inherited from Button)
 * <DropdownItem
 *   kbd="⌘K"
 *   leftIcon={SearchIcon}
 * >
 *   Quick Search
 * </DropdownItem>
 *
 * // Disabled state
 * <DropdownItem disabled>
 *   Unavailable Option
 * </DropdownItem>
 * ```
 */
const DropdownItem = ({ ref, className, variant, highlighted = false, selected = false, hint, children, ...props }: DropdownItemProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
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
      role="option"
      aria-selected={selected}
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
