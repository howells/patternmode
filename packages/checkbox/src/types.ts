import type { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import type React from "react";

type BaseProps = React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root>;

export type CheckboxProps = Omit<BaseProps, "checked" | "onCheckedChange"> & {
  className?: string;
  /**
   * Supports tri-state: true | false | "indeterminate".
   */
  checked?: boolean | "indeterminate";
  /**
   * Change handler receives boolean or "indeterminate" for convenience.
   * Note: Base UI only emits boolean; "indeterminate" is typically used for controlled parents.
   */
  onCheckedChange?: (value: boolean | "indeterminate") => void;
};
