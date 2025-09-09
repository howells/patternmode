"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import { Button } from "@patternmode/button";
import type { Size } from "@patternmode/config/sizes";
import { cx } from "@patternmode/utils/cx";
import { hasErrorInput } from "@patternmode/utils/has-error-input";
import { ChevronsUpDown } from "lucide-react";
import React from "react";

/**
 * Combobox trigger button component.
 */
const ComboboxTrigger = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Trigger>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Trigger> & {
    hasError?: boolean;
    size?: Size;
  }
>(({ className, hasError, size = "base", children, render, ...props }, ref) => {
  const defaultRender = (
    <Button
      className={cx("justify-between", hasError && hasErrorInput, className)}
      fullWidth
      rightIcon={ChevronsUpDown}
      size={size}
      variant="outline"
    />
  );

  return (
    <BaseCombobox.Trigger
      nativeButton={true}
      ref={ref}
      render={render ?? defaultRender}
      {...props}
    >
      {children}
    </BaseCombobox.Trigger>
  );
});
ComboboxTrigger.displayName = "ComboboxTrigger";

export { ComboboxTrigger };
