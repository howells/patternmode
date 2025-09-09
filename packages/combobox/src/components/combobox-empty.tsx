"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import React from "react";

/**
 * Combobox empty state component.
 */
const ComboboxEmpty = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Empty>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Empty>
>((props, ref) => <BaseCombobox.Empty ref={ref} {...props} />);
ComboboxEmpty.displayName = "ComboboxEmpty";

export { ComboboxEmpty };
