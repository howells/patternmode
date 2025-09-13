import { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";
import { cx } from "@patternmode/utils/cx";
import React from "react";
import type { RadioGroupProps } from "../types";
import { radioGroupVariants } from "../variants";

export const RadioGroup = ({
  ref,
  className,
  orientation,
  size,
  ...props
}: RadioGroupProps) => {
  const groupClass = React.useMemo(
    () => cx(radioGroupVariants({ orientation, size }), className),
    [orientation, size, className]
  );
  return (
    <BaseRadioGroup
      className={groupClass}
      data-testid="radio-group"
      ref={ref}
      {...props}
    >
      {props.children}
    </BaseRadioGroup>
  );
};
RadioGroup.displayName = "RadioGroup";
