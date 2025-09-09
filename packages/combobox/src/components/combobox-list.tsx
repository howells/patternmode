"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import React from "react";

/**
 * Combobox list component for items container.
 */
const ComboboxList = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.List>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.List>
>(({ className, ...props }, ref) => (
  <BaseCombobox.List className={className} ref={ref} {...props} />
));
ComboboxList.displayName = "ComboboxList";

export { ComboboxList };
