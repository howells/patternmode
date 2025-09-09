"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import type { Size } from "@patternmode/constants/sizes";
import { cx } from "@patternmode/utils/cx";
import React from "react";
import { comboboxListVariants } from "../variants";

/**
 * Combobox popup container component.
 */
const ComboboxPopup = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Popup>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Popup> & {
    size?: Size;
  }
>(({ className, size = "base", ...props }, ref) => {
  const { base } = comboboxListVariants({ size });

  return (
    <BaseCombobox.Popup
      className={cx(
        base(),
        "min-w-[var(--anchor-width)] max-w-[var(--available-width)]",
        className
      )}
      data-testid="combobox-popup"
      ref={ref}
      {...props}
    />
  );
});
ComboboxPopup.displayName = "ComboboxPopup";

export { ComboboxPopup };
