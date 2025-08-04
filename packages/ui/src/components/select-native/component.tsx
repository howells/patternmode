import type { VariantProps } from "tailwind-variants";

import React from "react";
import { tv } from "tailwind-variants";

import { cx, focusInput, hasErrorInput } from "../../lib/utils";

const selectNativeStyles = tv({
  base: [
    // base
    "peer w-full cursor-pointer appearance-none truncate rounded-md border py-2 pl-3 pr-7 shadow-xs outline-hidden transition-all sm:text-sm",
    // background color
    "bg-white dark:bg-zinc-950",
    // border color
    "border-zinc-200 dark:border-zinc-800",
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // placeholder color
    "placeholder-zinc-400 dark:placeholder-zinc-500",
    // hover
    "hover:bg-zinc-50 dark:hover:bg-zinc-950/50",
    // disabled
    "disabled:pointer-events-none",
    "disabled:bg-zinc-100 disabled:text-zinc-400",
    "dark:disabled:border-zinc-700 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-500",
    // focus
    focusInput,
  ],
  variants: {
    /**
     * Whether to show error styling.
     */
    hasError: {
      true: hasErrorInput,
    },
  },
});

/**
 * Props for the SelectNative component.
 */
type SelectNativeProps = {
  /**
   * Whether to display error styling for form validation.
   * Adds red border and error state styling to indicate validation errors.
   */
  hasError?: boolean;
} & React.InputHTMLAttributes<HTMLSelectElement> & VariantProps<typeof selectNativeStyles>;

/**
 * A styled native HTML select component with consistent design system styling.
 */
const SelectNative = ({ ref: forwardedRef, className, hasError, ...props }: SelectNativeProps & { ref?: React.RefObject<HTMLSelectElement | null> }) => {
  return (
    <select
      ref={forwardedRef}
      className={cx(selectNativeStyles({ hasError }), className)}
      data-testid="select-native"
      {...props}
    />
  );
};

SelectNative.displayName = "SelectNative";

export { SelectNative, type SelectNativeProps, selectNativeStyles };
