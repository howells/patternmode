"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import React from "react";
import { comboboxVariants } from "../variants";

/**
 * Root combobox container component.
 */
const ComboboxRoot = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Root>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Root>
>((props) => (
  <div className={comboboxVariants()}>
    <BaseCombobox.Root {...props} />
  </div>
));
ComboboxRoot.displayName = "ComboboxRoot";

export { ComboboxRoot };
