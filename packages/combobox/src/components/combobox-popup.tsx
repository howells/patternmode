"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import type { Size } from "@patternmode/constants/sizes";
import { cx } from "@patternmode/utils/cx";
import { floatingSurfaceVariants } from "@patternmode/utils/floating-surface";
import React from "react";

/**
 * Combobox popup container component.
 */
const ComboboxPopup = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Popup>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Popup> & {
    size?: Size;
  }
>(({ className, size = "base", ...props }, ref) => {
  const surface = floatingSurfaceVariants({ density: "compact", width: "anchor" }).base();

  return (
    <BaseCombobox.Popup
      className={cx(
        surface,
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
