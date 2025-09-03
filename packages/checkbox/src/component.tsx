import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import { cx } from "@patternmode/utils/cx";
import type React from "react";
import type { CheckboxProps } from "./types";
import { checkboxIndicatorVariants, checkboxVariants } from "./variants";

const Checkbox = ({
  ref: forwardedRef,
  className,
  checked,
  ...props
}: CheckboxProps & {
  ref?: React.RefObject<React.ElementRef<typeof BaseCheckbox.Root> | null>;
}) => {
  const baseUIProps: React.ComponentPropsWithoutRef<
    typeof BaseCheckbox.Root
  > & {
    indeterminate?: boolean;
  } = {
    ...props,
    checked: checked === "indeterminate" ? false : checked,
    indeterminate: checked === "indeterminate",
  };
  return (
    <BaseCheckbox.Root
      ref={forwardedRef}
      {...baseUIProps}
      className={cx(checkboxVariants(), className)}
      data-testid="checkbox"
    >
      <BaseCheckbox.Indicator className={checkboxIndicatorVariants()}>
        {checked === "indeterminate" ? (
          <svg
            aria-hidden="true"
            fill="none"
            height="16"
            viewBox="0 0 16 16"
            width="16"
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
            />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            fill="none"
            height="16"
            viewBox="0 0 16 16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.2 5.59998L6.79999 9.99998L4.79999 7.99998"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        )}
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
};

Checkbox.displayName = "Checkbox";

export { Checkbox };
