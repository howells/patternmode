import type { RadioGroupItemProps, RadioGroupProps } from "./types";
import { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";

import React from "react";
import { cx } from "../../lib/utils";
// Import RadioItem from the radio component for backward compatibility
import { RadioItem } from "../radio/component";
import { radioGroupVariants } from "./variants";

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

export { RadioGroup, RadioGroupItem };
