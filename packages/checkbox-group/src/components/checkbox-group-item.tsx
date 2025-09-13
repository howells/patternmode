import { Checkbox } from "@patternmode/checkbox";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";
import { useId } from "react";
import type { CheckboxGroupItemProps } from "../types";
import {
  checkboxGroupItemTextVariants,
  checkboxGroupItemVariants,
} from "../variants";

/**
 * Individual checkbox item component designed for use within CheckboxGroup containers.
 */
const CheckboxGroupItem = ({
  ref,
  value,
  name,
  children,
  disabled,
  className,
  ...props
}: CheckboxGroupItemProps & {
  ref?: React.RefObject<HTMLLabelElement | null>;
}) => {
  const checkboxId = useId();
  return (
    <label
      className={cx(checkboxGroupItemVariants({ disabled }), className)}
      htmlFor={checkboxId}
      ref={ref}
      {...props}
    >
      <Checkbox
        className="absolute top-0 left-0 size-4"
        disabled={disabled}
        id={checkboxId}
        name={name}
        value={value}
      />
      <span className={checkboxGroupItemTextVariants()}>{children}</span>
    </label>
  );
};
CheckboxGroupItem.displayName = "CheckboxGroupItem";

export { CheckboxGroupItem };
export type { CheckboxGroupItemProps };
