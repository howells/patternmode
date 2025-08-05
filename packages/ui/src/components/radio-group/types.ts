import type { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";
import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type { RadioItem } from "../radio/component";
import type { radioGroupVariants } from "./variants";

export type RadioGroupProps = {
  /**
   * Layout orientation of the radio group.
   * Vertical stacks radio items in a column, horizontal arranges them in a row.
   */
  orientation?: VariantProps<typeof radioGroupVariants>["orientation"];

  /**
   * Spacing size between radio items.
   * Controls the gap between individual radio buttons within the group.
   */
  size?: VariantProps<typeof radioGroupVariants>["size"];
} & React.ComponentPropsWithoutRef<typeof BaseRadioGroup> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseRadioGroup> | null>;
};

export type RadioGroupItemProps = React.ComponentPropsWithoutRef<typeof RadioItem> & {
  ref?: React.RefObject<React.ElementRef<typeof RadioItem> | null>;
};
