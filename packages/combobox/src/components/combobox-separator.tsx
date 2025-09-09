"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import React from "react";

/**
 * Combobox separator component.
 */
const ComboboxSeparator = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Separator>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Separator>
>((props, ref) => <BaseCombobox.Separator ref={ref} {...props} />);
ComboboxSeparator.displayName = "ComboboxSeparator";

export { ComboboxSeparator };
