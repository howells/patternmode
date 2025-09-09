"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import React from "react";

/**
 * Combobox group label component.
 */
const ComboboxGroupLabel = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.GroupLabel>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.GroupLabel>
>((props, ref) => <BaseCombobox.GroupLabel ref={ref} {...props} />);
ComboboxGroupLabel.displayName = "ComboboxGroupLabel";

export { ComboboxGroupLabel };
