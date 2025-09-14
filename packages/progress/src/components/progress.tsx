import { Progress as BaseProgress } from "@base-ui-components/react/progress";
import { cx } from "@patternmode/utils/cx";
import type React from "react";
import type { ProgressBarProps } from "../types";
import { progressVariants } from "../variants";

const Progress = (
  props: React.ComponentPropsWithoutRef<typeof BaseProgress.Root>
) => (
  <BaseProgress.Root data-testid="progress" {...props}>
    {props.children}
  </BaseProgress.Root>
);
Progress.displayName = "Progress";

const ProgressTrack = ({
  ref: _ref,
  className,
  variant,
  animated,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseProgress.Track> & {
  variant?: "default" | "neutral" | "warning" | "error" | "success";
  animated?: boolean;
} & {
  ref?: React.RefObject<React.ElementRef<typeof BaseProgress.Track> | null>;
}) => {
  const { track } = progressVariants({ variant, animated });
  return (
    <BaseProgress.Track
      className={cx(track(), className)}
      ref={_ref}
      {...props}
    />
  );
};
ProgressTrack.displayName = "ProgressTrack";

const ProgressIndicator = ({
  ref: _ref,
  className,
  variant,
  animated,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseProgress.Indicator> & {
  variant?: "default" | "neutral" | "warning" | "error" | "success";
  animated?: boolean;
} & {
  ref?: React.RefObject<React.ElementRef<typeof BaseProgress.Indicator> | null>;
}) => {
  const { indicator } = progressVariants({ variant, animated });
  return (
    <BaseProgress.Indicator
      className={cx(indicator(), className)}
      ref={_ref}
      {...props}
    />
  );
};
ProgressIndicator.displayName = "ProgressIndicator";

const ProgressLabel = ({
  ref,
  className,
  variant,
  animated,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseProgress.Label> & {
  variant?: "default" | "neutral" | "warning" | "error" | "success";
  animated?: boolean;
} & {
  ref?: React.RefObject<React.ElementRef<typeof BaseProgress.Label> | null>;
}) => {
  const { label } = progressVariants({ variant, animated });
  return (
    <BaseProgress.Label
      className={cx(label(), className)}
      ref={ref}
      {...props}
    />
  );
};
ProgressLabel.displayName = "ProgressLabel";

const ProgressValue = ({
  ref,
  className,
  variant,
  animated,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseProgress.Value> & {
  variant?: "default" | "neutral" | "warning" | "error" | "success";
  animated?: boolean;
} & {
  ref?: React.RefObject<React.ElementRef<typeof BaseProgress.Value> | null>;
}) => {
  const { value } = progressVariants({ variant, animated });
  return (
    <BaseProgress.Value
      className={cx(value(), className)}
      ref={ref}
      {...props}
    />
  );
};
ProgressValue.displayName = "ProgressValue";

const ProgressBar = ({
  className,
  value,
  max = 100,
  min = 0,
  label,
  showValue = true,
  valueFormatter = (v: number | null, m: number) =>
    v == null ? "" : `${Math.round((v / m) * 100)}%`,
  variant = "default",
  showAnimation = false,
  ...props
}: ProgressBarProps) => {
  const { root } = progressVariants({ variant, animated: showAnimation });
  const numeric = typeof value === "number" ? value : null;
  const clamped = numeric == null ? 0 : Math.max(0, Math.min(max, numeric));
  const percentage = max > min ? ((clamped - min) / (max - min)) * 100 : 0;
  const ariaProps =
    numeric == null
      ? { "aria-valuemin": min, "aria-valuemax": max }
      : {
          "aria-valuemin": min,
          "aria-valuemax": max,
          "aria-valuenow": numeric,
        };
  return (
    <Progress
      className={cx(root(), className)}
      max={max}
      min={min}
      value={numeric}
      {...ariaProps}
      {...props}
    >
      {label ? <ProgressLabel>{label}</ProgressLabel> : null}
      <ProgressTrack animated={showAnimation} variant={variant}>
        <ProgressIndicator
          animated={showAnimation}
          style={{ width: `${Math.max(0, Math.min(100, percentage))}%` }}
          variant={variant}
        />
      </ProgressTrack>
      {showValue && (
        <ProgressValue>
          {(_formatted, current) => valueFormatter(current, max)}
        </ProgressValue>
      )}
    </Progress>
  );
};
ProgressBar.displayName = "ProgressBar";

export {
  Progress,
  ProgressBar,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
};
