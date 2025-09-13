import { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";
import { cx } from "@patternmode/utils/cx";
import React from "react";
import type { RadioGroupRootProps } from "../types";
import { radioGroupRootVariants } from "../variants";

export const RadioGroupRoot = ({
  ref,
  className,
  orientation,
  ...props
}: RadioGroupRootProps) => {
  const rootClass = React.useMemo(
    () => cx(radioGroupRootVariants({ orientation }), className),
    [orientation, className]
  );

  return (
    <BaseRadioGroup
      className={rootClass}
      data-testid="radio-group-root"
      ref={ref}
      {...props}
    >
      {props.children}
    </BaseRadioGroup>
  );
};
RadioGroupRoot.displayName = "RadioGroup.Root";

export type { RadioGroupRootProps };
