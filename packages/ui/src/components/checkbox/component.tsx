// Tremor Checkbox [v1.0.0] - Base UI

import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import React from "react";

import { cx, focusRing } from "../../lib/utils";

/**
 * Props for the Checkbox component.
 */
type CheckboxProps = {
  /**
   * Checked state of the checkbox.
   *
   * - `true`: Checkbox is checked
   * - `false`: Checkbox is unchecked
   * - `"indeterminate"`: Checkbox shows indeterminate state (partial selection).
   */
  checked?: boolean | "indeterminate";
} & Omit<React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root>, "checked">;

/**
 * A versatile checkbox input component with full accessibility support and indeterminate state capabilities.
 */
const Checkbox = ({ ref: forwardedRef, className, checked, ...props }: CheckboxProps & { ref?: React.RefObject<React.ElementRef<typeof BaseCheckbox.Root> | null> }) => {
  // Convert indeterminate to Base UI's format
  const baseUIProps = {
    ...props,
    checked: checked === "indeterminate" ? false : checked,
    indeterminate: checked === "indeterminate",
  };

  return (
    <BaseCheckbox.Root
      ref={forwardedRef}
      {...baseUIProps}
      className={cx(
        // base
        "relative inline-flex size-4 shrink-0 appearance-none items-center justify-center rounded-sm shadow-xs outline-hidden ring-1 ring-inset transition duration-100 enabled:cursor-pointer",
        // text color
        "text-white dark:text-zinc-50",
        // background color
        "bg-white dark:bg-zinc-950",
        // ring color
        "ring-zinc-300 dark:ring-zinc-800",
        // disabled
        "data-disabled:bg-zinc-100 data-disabled:text-zinc-400 data-disabled:ring-zinc-300",
        "dark:data-disabled:bg-zinc-800 dark:data-disabled:text-zinc-500 dark:data-disabled:ring-zinc-700",
        // checked and enabled - Base UI uses data-checked instead of data-[state=checked]
        "enabled:data-checked:bg-blue-500 enabled:data-checked:ring-0 enabled:data-checked:ring-transparent",
        // indeterminate - Base UI has data-indeterminate attribute
        "enabled:data-[indeterminate]:bg-blue-500 enabled:data-[indeterminate]:ring-0 enabled:data-[indeterminate]:ring-transparent",
        // focus
        focusRing,
        className,
      )}
    >
      <BaseCheckbox.Indicator className="flex size-full items-center justify-center">
        {checked === "indeterminate"
          ? (
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  x1="4"
                  x2="12"
                  y1="8"
                  y2="8"
                >
                </line>
              </svg>
            )
          : (
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.2 5.59998L6.79999 9.99998L4.79999 7.99998"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                </path>
              </svg>
            )}
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
};

Checkbox.displayName = "Checkbox";

export { Checkbox, type CheckboxProps };
