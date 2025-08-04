import type { VariantProps } from "tailwind-variants";

import { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";
import React from "react";
import { tv } from "tailwind-variants";

import { cx } from "../../lib/utils";
// Import RadioItem from the radio component for backward compatibility
import { RadioItem } from "../radio";

const radioGroupVariants = tv({
  base: [
    // base
    "grid gap-2",
  ],
  variants: {
    /**
     * Layout orientation of radio items.
     */
    orientation: {
      vertical: "grid-cols-1",
      horizontal: "grid-flow-col auto-cols-max gap-4",
    },
    /**
     * Spacing size between radio items.
     */
    size: {
      sm: "gap-1.5",
      md: "gap-2",
      lg: "gap-3",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    size: "md",
  },
});

type RadioGroupProps = {
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

type RadioGroupItemProps = React.ComponentPropsWithoutRef<typeof RadioItem> & {
  ref?: React.RefObject<React.ElementRef<typeof RadioItem> | null>;
};

/**
 * Group component for managing mutually exclusive radio button selections.
 */
const RadioGroup = ({ ref, className, orientation, size, ...props }: RadioGroupProps) => (
  <BaseRadioGroup
    data-testid="radio-group"
    ref={ref}
    className={cx(radioGroupVariants({ orientation, size }), className)}
    {...props}
  >
    {props.children}
  </BaseRadioGroup>
);
RadioGroup.displayName = "RadioGroup";

/**
 * Legacy radio group item component for backward compatibility.
 */
const RadioGroupItem = ({ ref, className, ...props }: RadioGroupItemProps) => (
  <RadioItem ref={ref} className={className} {...props} />
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem, radioGroupVariants };
export type { RadioGroupItemProps, RadioGroupProps };
