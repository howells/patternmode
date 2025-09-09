"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import React from "react";

/**
 * Combobox collection component.
 */
const ComboboxCollection = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Collection>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Collection>
>((props) => <BaseCombobox.Collection {...props} />);
ComboboxCollection.displayName = "ComboboxCollection";

export { ComboboxCollection };
