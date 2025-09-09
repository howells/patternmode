"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import React from "react";

/**
 * Combobox clear button component.
 */
const ComboboxClear = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Clear>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Clear>
>((props, ref) => <BaseCombobox.Clear ref={ref} {...props} />);
ComboboxClear.displayName = "ComboboxClear";

export { ComboboxClear };
