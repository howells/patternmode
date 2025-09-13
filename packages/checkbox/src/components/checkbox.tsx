import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import { cx } from "@patternmode/utils/cx";
import type React from "react";
import type { CheckboxProps } from "../types";
import { checkboxVariants } from "../variants";

const Checkbox = ({
  ref: forwardedRef,
  className,
  checked,
  onCheckedChange,
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
  const handleChange = (next: boolean) => {
    onCheckedChange?.(next);
  };
  return (
    <BaseCheckbox.Root
      ref={forwardedRef}
      {...baseUIProps}
      className={cx(checkboxVariants(), className)}
      data-testid="checkbox"
      nativeButton={false}
      onCheckedChange={handleChange}
    >
      {props.children}
    </BaseCheckbox.Root>
  );
};

Checkbox.displayName = "Checkbox";

export { Checkbox };
export type { CheckboxProps };
