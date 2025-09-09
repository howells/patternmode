"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import React from "react";

/**
 * Combobox row component.
 */
const ComboboxRow = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Row>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Row>
>((props, ref) => <BaseCombobox.Row ref={ref} {...props} />);
ComboboxRow.displayName = "ComboboxRow";

export { ComboboxRow };
