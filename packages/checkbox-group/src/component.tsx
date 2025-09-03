// Checkbox Group Component [v1.0.0]

import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui-components/react/checkbox-group";
import { Checkbox } from "@patternmode/checkbox";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";
import { useId } from "react";
import type { CheckboxGroupItemProps, CheckboxGroupProps } from "./types";
import {
  checkboxGroupItemTextVariants,
  checkboxGroupItemVariants,
  checkboxGroupLabelVariants,
  checkboxGroupVariants,
} from "./variants";

/**
 * A powerful checkbox group component for managing multiple checkbox selections with comprehensive state management and accessibility.
 */
const CheckboxGroup = ({
  ref,
  className,
  label,
  labelId,
  children,
  ...props
}: CheckboxGroupProps & {
  ref?: React.RefObject<React.ElementRef<typeof BaseCheckboxGroup> | null>;
}) => (
  <BaseCheckboxGroup
    aria-labelledby={labelId}
    className={cx(checkboxGroupVariants(), className)}
    data-testid="checkbox-group"
    ref={ref}
    {...props}
  >
    {label && (
      <div className={checkboxGroupLabelVariants()} id={labelId}>
        {label}
      </div>
    )}
    {children}
  </BaseCheckboxGroup>
);
CheckboxGroup.displayName = "CheckboxGroup";

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

export { CheckboxGroup, CheckboxGroupItem };
