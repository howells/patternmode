import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui-components/react/checkbox-group";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";
import type { CheckboxGroupProps } from "../types";
import { checkboxGroupLabelVariants, checkboxGroupVariants } from "../variants";

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

export { CheckboxGroup };
export type { CheckboxGroupProps };
