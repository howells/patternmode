import type { Toggle as BaseToggle } from "@base-ui-components/react/toggle";
import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type { toggleVariants } from "./variants";

export type ToggleProps = {
  /**
   * The visual style variant of the toggle button.
   * @default "default"
   */
  variant?: VariantProps<typeof toggleVariants>["variant"];
  /**
   * The size of the toggle button.
   * @default "default"
   */
  size?: VariantProps<typeof toggleVariants>["size"];
} & React.ComponentPropsWithoutRef<typeof BaseToggle>;
