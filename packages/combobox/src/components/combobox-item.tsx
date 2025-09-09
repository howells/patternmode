"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import { cx } from "@patternmode/utils/cx";
import { floatingItemVariants } from "@patternmode/utils/floating-item";
import React from "react";

/**
 * Combobox item component with styling variants.
 */
const ComboboxItem = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Item>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Item> & {
    size?: "2xs" | "xs" | "sm" | "base" | "lg";
  }
>(({ className, size = "base", ...props }, ref) => {
  const mappedSize = size === "2xs" ? "xs" : size;
  return (
    <BaseCombobox.Item
      className={cx(floatingItemVariants({ size: mappedSize }), className)}
      ref={ref}
      {...props}
    />
  );
});
ComboboxItem.displayName = "ComboboxItem";

export { ComboboxItem };
