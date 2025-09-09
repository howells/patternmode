"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import React from "react";

/**
 * Combobox backdrop component.
 */
const ComboboxBackdrop = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Backdrop>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Backdrop>
>((props, ref) => <BaseCombobox.Backdrop ref={ref} {...props} />);
ComboboxBackdrop.displayName = "ComboboxBackdrop";

export { ComboboxBackdrop };
