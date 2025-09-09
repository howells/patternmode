"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import { cx } from "@patternmode/utils/cx";
import React from "react";
import { comboboxItemVariants } from "../variants";

/**
 * Combobox item component with styling variants.
 */
const ComboboxItem = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Item>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Item> & {
    size?: "2xs" | "xs" | "sm" | "base" | "lg";
  }
>(({ className, size = "base", ...props }, ref) => (
  <BaseCombobox.Item
    className={cx(comboboxItemVariants({ size }), className)}
    ref={ref}
    {...props}
  />
));
ComboboxItem.displayName = "ComboboxItem";

export { ComboboxItem };
