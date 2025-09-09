"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import React from "react";

/**
 * Combobox positioner component for popup positioning.
 */
const ComboboxPositioner = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Positioner>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Positioner>
>(({ className, sideOffset = 4, align = "start", ...props }, ref) => (
  <BaseCombobox.Positioner
    align={align}
    className={className}
    ref={ref}
    sideOffset={sideOffset}
    {...props}
  />
));
ComboboxPositioner.displayName = "ComboboxPositioner";

export { ComboboxPositioner };
