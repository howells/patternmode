"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import React from "react";

/**
 * Combobox arrow component.
 */
const ComboboxArrow = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Arrow>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Arrow>
>((props, ref) => <BaseCombobox.Arrow ref={ref} {...props} />);
ComboboxArrow.displayName = "ComboboxArrow";

export { ComboboxArrow };
