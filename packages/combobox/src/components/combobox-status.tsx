"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import React from "react";

/**
 * Combobox status component.
 */
const ComboboxStatus = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Status>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Status>
>((props, ref) => <BaseCombobox.Status ref={ref} {...props} />);
ComboboxStatus.displayName = "ComboboxStatus";

export { ComboboxStatus };
