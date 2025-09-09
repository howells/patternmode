"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import React from "react";

/**
 * Combobox value display component.
 */
const ComboboxValue = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Value>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Value>
>((props) => <BaseCombobox.Value {...props} />);
ComboboxValue.displayName = "ComboboxValue";

export { ComboboxValue };
