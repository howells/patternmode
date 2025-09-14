"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import React from "react";
import { comboboxVariants } from "../variants";

/**
 * Root combobox container component.
 */
type ComboboxRootComponent = React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Root> &
  React.RefAttributes<React.ElementRef<typeof BaseCombobox.Root>>
>;

const ComboboxRoot: ComboboxRootComponent = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Root>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Root>
>((props) => (
  <div className={comboboxVariants()}>
    <BaseCombobox.Root {...props} />
  </div>
));
ComboboxRoot.displayName = "ComboboxRoot";

export { ComboboxRoot };
