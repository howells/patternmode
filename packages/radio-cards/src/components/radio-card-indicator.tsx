import type React from "react";
import { Radio as BaseRadio } from "@base-ui-components/react/radio";
import { radioVariants } from "@patternmode/radio/variants";
import { cx } from "@patternmode/utils/cx";

/**
 * Visual indicator for radio card selection state with circular design.
 * Local implementation using Base UI primitives to avoid cross-package coupling.
 */
const RadioCardIndicator = ({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof BaseRadio.Indicator>) => {
  const variants = radioVariants({ size: "base", variant: "card" });
  return (
    <div className={cx(variants.circle(), className)}>
      <BaseRadio.Indicator
        className="absolute inset-0 flex items-center justify-center"
        ref={ref}
        {...props}
      >
        <div className={variants.dot()} />
      </BaseRadio.Indicator>
    </div>
  );
};
RadioCardIndicator.displayName = "RadioCardIndicator";

export { RadioCardIndicator };
export type RadioCardIndicatorProps = React.ComponentProps<
  typeof BaseRadio.Indicator
>;
