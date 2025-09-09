"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import { cx } from "@patternmode/utils/cx";
import React from "react";
import { comboboxListVariants } from "../variants";

/**
 * Combobox popup container component.
 */
const ComboboxPopup = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Popup>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Popup> & {
    size?: "2xs" | "xs" | "sm" | "base" | "lg";
  }
>(({ className, size = "base", ...props }, ref) => (
  <BaseCombobox.Popup
    className={cx(
      comboboxListVariants({ size }),
      "max-h-[min(var(--available-height),23rem)] w-[var(--anchor-width)] max-w-[var(--available-width)]",
      className
    )}
    data-testid="combobox-popup"
    ref={ref}
    {...props}
  />
));
ComboboxPopup.displayName = "ComboboxPopup";

export { ComboboxPopup };
