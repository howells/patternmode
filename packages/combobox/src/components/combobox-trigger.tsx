"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import { cx } from "@patternmode/utils/cx";
import React from "react";
import { comboboxTriggerVariants } from "../variants";

/**
 * Combobox trigger button component.
 */
const ComboboxTrigger = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Trigger>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Trigger> & {
    size?: "2xs" | "xs" | "sm" | "base" | "lg";
  }
>(({ className, size = "base", children, ...props }, ref) => (
  <BaseCombobox.Trigger
    className={cx(
      comboboxTriggerVariants({ size }),
      "flex h-10 min-w-[12rem] items-center justify-between gap-3 bg-[canvas] pr-3 pl-3.5",
      "hover:bg-zinc-100 data-[popup-open]:bg-zinc-100",
      className
    )}
    data-testid="combobox-trigger"
    ref={ref}
    {...props}
  >
    {children}
  </BaseCombobox.Trigger>
));
ComboboxTrigger.displayName = "ComboboxTrigger";

export { ComboboxTrigger };
