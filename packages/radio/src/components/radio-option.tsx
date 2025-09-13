import { Radio as BaseRadio } from "@base-ui-components/react/radio";
import { cx } from "@patternmode/utils/cx";
import React from "react";
import type { RadioOptionProps } from "../types";
import { radioLabelVariants, radioVariants } from "../variants";

export const RadioOption = ({
  ref,
  value,
  label,
  description,
  disabled,
  size = "base",
  ...props
}: RadioOptionProps) => {
  const classes = React.useMemo(() => {
    const labelClass = radioLabelVariants({ size });
    const variants = radioVariants({ size, variant: "default" });
    return {
      root: cx("group inline-flex items-center gap-2", labelClass),
      circle: variants.circle(),
      dot: variants.dot(),
    };
  }, [size]);
  return (
    <BaseRadio.Root
      className={classes.root}
      data-disabled={disabled ? "" : undefined}
      disabled={disabled}
      nativeButton
      ref={
        ref as React.RefObject<React.ElementRef<typeof BaseRadio.Root> | null>
      }
      value={value}
      {...props}
    >
      <div className={classes.circle}>
        <BaseRadio.Indicator className="absolute inset-0 flex items-center justify-center">
          <div className={classes.dot} />
        </BaseRadio.Indicator>
      </div>
      <div className="flex flex-col text-left">
        <span className="font-medium">{label}</span>
        {description && (
          <span className="text-sm text-zinc-500">{description}</span>
        )}
      </div>
    </BaseRadio.Root>
  );
};
RadioOption.displayName = "RadioOption";
