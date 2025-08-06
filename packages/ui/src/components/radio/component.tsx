import type {
  RadioCardOptionProps,
  RadioCardProps,
  RadioIndicatorProps,
  RadioItemProps,
  RadioLabelProps,
  RadioOptionProps,
  RadioProps,
} from "./types";
import { Radio as BaseRadio } from "@base-ui-components/react/radio";
import React from "react";
import { cx } from "../../lib/utils";
import {
  radioCardVariants,
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
 * Visual indicator component for showing radio selection state.
 */
export const RadioIndicator = ({ ref, className, ...props }: RadioIndicatorProps) => (
  <BaseRadio.Indicator
    ref={ref}
    className={cx("flex items-center justify-center", className)}
    {...props}
  />
);
RadioIndicator.displayName = "RadioIndicator";

/**
 * Styled radio button component with visual circle and dot indicator.
 */
export const RadioItem = ({ ref, className, size, variant, ...props }: RadioItemProps) => {
  const { root, circle, indicator, dot } = radioVariants({ size, variant });

  return (
    <BaseRadio.Root ref={ref} className={cx(root(), className)} nativeButton={true} {...props}>
      <div className={circle()}>
        <BaseRadio.Indicator className={indicator()}>
          <div className={dot()} />
        </BaseRadio.Indicator>
      </div>
    </BaseRadio.Root>
  );
};
RadioItem.displayName = "RadioItem";

/**
 * Label component for radio buttons with proper styling and accessibility.
 */
export const RadioLabel = ({ ref, className, size, children, ...props }: RadioLabelProps) => (
  <label
    ref={ref}
    className={cx(radioLabelVariants({ size }), className)}
    {...props}
  >
    {children}
  </label>
);
RadioLabel.displayName = "RadioLabel";

/**
 * Card-style radio button component with enhanced presentation.
 */
export const RadioCard = (
  { ref, className, size, children, indicator, showIndicator = true, ...props }: RadioCardProps,
) => (
  <BaseRadio.Root
    ref={ref}
    className={cx(radioCardVariants({ size }), className)}
    nativeButton={true}
    {...props}
  >
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1">{children}</div>
      {showIndicator && (
        <div className="flex-shrink-0">
          {indicator || (
            <RadioItem size="base" variant="card" value={props.value} />
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
  const { root, circle, indicator, dot } = radioVariants({ size, variant: "default" });

  return (
    <div className={cx(radioLabelVariants({ size }))}>
      <BaseRadio.Root
        ref={ref}
        value={value}
        disabled={disabled}
        className={cx(root())}
        nativeButton={true}
        {...props}
      >
        <div className={circle()}>
          <BaseRadio.Indicator className={indicator()}>
            <div className={dot()} />
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
    </div>
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
