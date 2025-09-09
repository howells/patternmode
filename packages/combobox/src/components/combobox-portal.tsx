"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import React from "react";

/**
 * Combobox portal component for rendering popup in different DOM location.
 */
const ComboboxPortal = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Portal>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Portal>
>(({ container, ...props }) => (
  <BaseCombobox.Portal container={container} {...props} />
));
ComboboxPortal.displayName = "ComboboxPortal";

export { ComboboxPortal };
