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
import { Radio as BaseRadio } from "@base-ui-components/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";
import React from "react";
import { cx } from "../../utils/cx";
import {
  radioCardVariants,
  radioGroupVariants,
  radioLabelVariants,
  radioVariants,
} from "./variants";

/**
 * Root radio component built on Base UI's Radio primitive.
 */
export const Radio = (props: RadioProps) => (
  <BaseRadio.Root data-testid="radio" {...props}>
    {props.children}
  </BaseRadio.Root>
);
Radio.displayName = "Radio";

/**
 * Group component for managing mutually exclusive radio button selections.
 */
export const RadioGroup = ({ ref, className, orientation, size, ...props }: RadioGroupProps) => {
  const groupClass = React.useMemo(() => {
    return cx(radioGroupVariants({ orientation, size }), className);
  }, [orientation, size, className]);

  return (
    <BaseRadioGroup data-testid="radio-group" ref={ref} className={groupClass} {...props}>
      {props.children}
    </BaseRadioGroup>
  );
};
RadioGroup.displayName = "RadioGroup";

/**
 * Visual indicator component for showing radio selection state.
 */
export const RadioIndicator = ({ ref, className, size, variant, ...props }: RadioIndicatorProps) => {
  const classes = React.useMemo(() => {
    const variants = radioVariants({ size, variant });
    return {
      circle: cx(variants.circle(), className),
      dot: variants.dot(),
    };
  }, [size, variant, className]);

  return (
    <div className={classes.circle}>
      <BaseRadio.Indicator
        ref={ref}
        className="absolute inset-0 flex items-center justify-center"
        {...props}
      >
        <div className={classes.dot} />
      </BaseRadio.Indicator>
    </div>
  );
};
RadioIndicator.displayName = "RadioIndicator";

/**
 * Styled radio button component with visual circle and dot indicator.
 */
export const RadioItem = ({ ref, className, size, variant, nativeButton = true, ...props }: RadioItemProps) => {
  const classes = React.useMemo(() => {
    const variants = radioVariants({ size, variant });
    return {
      root: cx(variants.root(), className),
      circle: variants.circle(),
      dot: variants.dot(),
    };
  }, [size, variant, className]);

  return (
    <BaseRadio.Root ref={ref} className={classes.root} nativeButton={nativeButton} {...props}>
      <div className={classes.circle}>
        <BaseRadio.Indicator className="absolute inset-0 flex items-center justify-center">
          <div className={classes.dot} />
        </BaseRadio.Indicator>
      </div>
    </BaseRadio.Root>
  );
};
RadioItem.displayName = "RadioItem";

/**
 * Label component for radio buttons with proper styling and accessibility.
 */
export const RadioLabel = ({ ref, className, size, children, ...props }: RadioLabelProps) => {
  const labelClass = React.useMemo(() => {
    return cx(radioLabelVariants({ size }), className);
  }, [size, className]);

  return (
    <label ref={ref} className={labelClass} {...props}>
      {children}
    </label>
  );
};
RadioLabel.displayName = "RadioLabel";

/**
 * Card-style radio button component with enhanced presentation.
 */
export const RadioCard = (
  { ref, className, size, children, indicator, showIndicator = true, ...props }: RadioCardProps,
) => (
  <BaseRadio.Root
    ref={ref}
    className={cx(radioCardVariants({ size: size === "2xs" ? "xs" : size }), className)}
    nativeButton={true}
    {...props}
  >
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1">{children}</div>
      {showIndicator && (
        <div className="flex-shrink-0">
          {indicator || (
            <RadioIndicator size="base" variant="card" />
          )}
        </div>
      )}
    </div>
  </BaseRadio.Root>
);
RadioCard.displayName = "RadioCard";

/**
 * Complete radio option with integrated label and optional description.
 */
export const RadioOption = ({ ref, value, label, description, disabled, size = "base", ...props }: RadioOptionProps) => {
  // Use useMemo to ensure consistent class generation between server and client
  const classes = React.useMemo(() => {
    const labelClass = radioLabelVariants({ size });
    const variants = radioVariants({ size, variant: "default" });
    return {
      label: labelClass,
      root: variants.root(),
      circle: variants.circle(),
      dot: variants.dot(),
    };
  }, [size]);

  return (
    <label className={classes.label}>
      <BaseRadio.Root
        ref={ref}
        value={value}
        disabled={disabled}
        className={classes.root}
        nativeButton={true}
        {...props}
      >
        <div className={classes.circle}>
          <BaseRadio.Indicator className="absolute inset-0 flex items-center justify-center">
            <div className={classes.dot} />
          </BaseRadio.Indicator>
        </div>
      </BaseRadio.Root>
      <div className="flex flex-col">
        <span>{label}</span>
        {description && (
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {description}
          </span>
        )}
      </div>
    </label>
  );
};
RadioOption.displayName = "RadioOption";

/**
 * Complete card-style radio option with title and optional description.
 */
export const RadioCardOption = (
  { ref, value, title, description, disabled, size = "base", showIndicator = true, ...props }: RadioCardOptionProps,
) => (
  <RadioCard
    ref={ref}
    value={value}
    disabled={disabled}
    size={size}
    showIndicator={showIndicator}
    {...props}
  >
    <div className="flex flex-col gap-1">
      <div className="font-medium text-zinc-900 dark:text-zinc-50">
        {title}
      </div>
      {description && (
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          {description}
        </div>
      )}
    </div>
  </RadioCard>
);
RadioCardOption.displayName = "RadioCardOption";
