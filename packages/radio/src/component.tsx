import { Radio as BaseRadio } from "@base-ui-components/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";
import { cx } from "@patternmode/utils/cx";
import React from "react";
import type {
  RadioCardOptionProps,
  RadioCardProps,
  RadioGroupProps,
  RadioIndicatorProps,
  RadioItemProps,
  RadioLabelProps,
  RadioOptionProps,
  RadioProps,
} from "./types";
import {
  radioCardVariants,
  radioGroupVariants,
  radioLabelVariants,
  radioVariants,
} from "./variants";

export const Radio = (props: RadioProps) => (
  <BaseRadio.Root data-testid="radio" {...props}>
    {props.children}
  </BaseRadio.Root>
);
Radio.displayName = "Radio";

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

export const RadioIndicator = ({
  ref,
  className,
  size,
  variant,
  ...props
}: RadioIndicatorProps) => {
  const classes = React.useMemo(() => {
    const variants = radioVariants({ size, variant });
    return { circle: cx(variants.circle(), className), dot: variants.dot() };
  }, [size, variant, className]);
  return (
    <div className={classes.circle}>
      <BaseRadio.Indicator
        className="absolute inset-0 flex items-center justify-center"
        ref={ref}
        {...props}
      >
        <div className={classes.dot} />
      </BaseRadio.Indicator>
    </div>
  );
};
RadioIndicator.displayName = "RadioIndicator";

export const RadioItem = ({
  ref,
  className,
  size,
  variant,
  nativeButton = true,
  ...props
}: RadioItemProps) => {
  const classes = React.useMemo(() => {
    const variants = radioVariants({ size, variant });
    return {
      root: cx(variants.root(), className),
      circle: variants.circle(),
      dot: variants.dot(),
    };
  }, [size, variant, className]);
  return (
    <BaseRadio.Root
      className={classes.root}
      nativeButton={nativeButton}
      ref={ref}
      {...props}
    >
      <div className={classes.circle}>
        <BaseRadio.Indicator className="absolute inset-0 flex items-center justify-center">
          <div className={classes.dot} />
        </BaseRadio.Indicator>
      </div>
    </BaseRadio.Root>
  );
};
RadioItem.displayName = "RadioItem";

export const RadioLabel = ({
  ref,
  className,
  size,
  children,
  ...props
}: RadioLabelProps) => {
  const labelClass = React.useMemo(
    () => cx(radioLabelVariants({ size }), className),
    [size, className]
  );
  return (
    <span
      className={labelClass}
      ref={ref as React.RefObject<HTMLSpanElement | null>}
      {...props}
    >
      {children}
    </span>
  );
};
RadioLabel.displayName = "RadioLabel";

export const RadioCard = ({
  ref,
  className,
  size,
  children,
  indicator,
  showIndicator = true,
  ...props
}: RadioCardProps) => (
  <BaseRadio.Root
    className={cx(
      radioCardVariants({ size: size === "2xs" ? "xs" : size }),
      className
    )}
    nativeButton
    ref={ref}
    {...props}
  >
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1">{children}</div>
      {showIndicator && (
        <div className="flex-shrink-0">
          {indicator || <RadioIndicator size="base" variant="card" />}
        </div>
      )}
    </div>
  </BaseRadio.Root>
);
RadioCard.displayName = "RadioCard";

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

export const RadioCardOption = ({
  ref,
  value,
  title,
  description,
  disabled,
  size = "base",
  showIndicator = true,
  ...props
}: RadioCardOptionProps) => (
  <BaseRadio.Root
    className={radioCardVariants({ size: size === "2xs" ? "xs" : size })}
    data-disabled={disabled ? "" : undefined}
    disabled={disabled}
    nativeButton
    ref={ref as React.RefObject<React.ElementRef<typeof BaseRadio.Root> | null>}
    value={value}
    {...props}
  >
    <div className="flex items-start justify-between gap-3">
      <div className="flex flex-1 flex-col">
        <div className="font-medium">{title}</div>
        {description && (
          <div className="text-sm text-zinc-500">{description}</div>
        )}
      </div>
      {showIndicator && <RadioIndicator size="base" variant="card" />}
    </div>
  </BaseRadio.Root>
);
RadioCardOption.displayName = "RadioCardOption";
