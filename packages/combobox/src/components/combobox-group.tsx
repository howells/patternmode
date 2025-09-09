"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import React from "react";

/**
 * Combobox group component.
 */
const ComboboxGroup = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Group>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Group>
>((props, ref) => <BaseCombobox.Group ref={ref} {...props} />);
ComboboxGroup.displayName = "ComboboxGroup";

export { ComboboxGroup };
