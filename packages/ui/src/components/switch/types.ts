import type { Switch as BaseSwitch } from "@base-ui-components/react/switch";
import type * as React from "react";
import type { VariantProps } from "tailwind-variants";

import type { switchVariants } from "./variants";

export type SwitchProps = {
  /**
   * Optional label text displayed next to the switch.
   * When provided, the switch and label are wrapped in a container for proper spacing.
   */
  label?: string;
  /**
   * The size variant of the switch component.
   * Controls both the switch track and thumb dimensions.
   * @default "default"
   */
  size?: "default" | "small";
} & Omit<
      React.ComponentPropsWithoutRef<typeof BaseSwitch.Root>,
      "children"
    > & VariantProps<typeof switchVariants>;
