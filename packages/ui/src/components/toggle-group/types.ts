import type { Toggle as BaseToggle } from "@base-ui-components/react/toggle";
import type { ToggleGroup as BaseToggleGroup } from "@base-ui-components/react/toggle-group";
import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type { IconComponent } from "../../lib/icon-utils";
import type { toggleGroupVariants } from "./variants";

export type ToggleGroupProps = {
  /**
   * The visual style variant of the toggle group.
   * @default "default"
   */
  variant?: VariantProps<typeof toggleGroupVariants>["variant"];
  /**
   * The size of the toggle group and its items.
   * @default "default"
   */
  size?: VariantProps<typeof toggleGroupVariants>["size"];
  /**
   * The layout orientation of the toggle group.
   * @default "horizontal"
   */
  orientation?: VariantProps<typeof toggleGroupVariants>["orientation"];
} & React.ComponentPropsWithoutRef<typeof BaseToggleGroup>;

export type ToggleGroupItemProps = {
  /**
   * The unique value for this toggle item, used for selection state.
   */
  value: string;
  /**
   * Icon component to display on the left side of the toggle item.
   */
  leftIcon?: IconComponent;
  /**
   * Icon component to display on the right side of the toggle item.
   */
  rightIcon?: IconComponent;
  /**
   * Custom stroke width for icons. If not provided, uses the global config value.
   */
  iconStrokeWidth?: number;
  /**
   * The visual style variant of the toggle item. Inherits from parent ToggleGroup if not specified.
   */
  variant?: VariantProps<typeof toggleGroupVariants>["variant"];
  /**
   * The size of the toggle item. Inherits from parent ToggleGroup if not specified.
   */
  size?: VariantProps<typeof toggleGroupVariants>["size"];
} & React.ComponentPropsWithoutRef<typeof BaseToggle>;
