import { Progress as BaseProgress } from "@base-ui-components/react/progress";
import type React from "react";
import { cx } from "@patternmode/core/utils/cx";
import { defaultValueFormatter } from "../progress-utils";
import type { ProgressBarProps } from "./types";
import { progressVariants } from "./variants";

/**
 * Root progress component built on Base UI's Progress primitive.
 */
const Progress = (
	props: React.ComponentPropsWithoutRef<typeof BaseProgress.Root>,
) => (
	<BaseProgress.Root data-testid="progress" {...props}>
		{props.children}
	</BaseProgress.Root>
);
Progress.displayName = "Progress";

/**
 * Progress track component containing the background rail.
 */
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
			ref={_ref}
			className={cx(track(), className)}
			{...props}
		/>
	);
};
ProgressTrack.displayName = "ProgressTrack";

/**
 * Visual indicator showing progress completion.
 */
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
			ref={_ref}
			className={cx(indicator(), className)}
			{...props}
		/>
	);
};
ProgressIndicator.displayName = "ProgressIndicator";

/**
 * Accessible label for the progress bar.
 */
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
			ref={ref}
			className={cx(label(), className)}
			{...props}
		/>
	);
};
ProgressLabel.displayName = "ProgressLabel";

/**
 * Displays the current progress value.
 */
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
			ref={ref}
			className={cx(value(), className)}
			{...props}
		/>
	);
};
ProgressValue.displayName = "ProgressValue";

/**
 * Complete progress bar with all components composed together.
 */
const ProgressBar = ({
	ref: _ref,
	value = 0,
	max = 100,
	label,
	showValue = false,
	valueFormatter,
	showAnimation = false,
	variant = "default",
	className,
	...props
}: ProgressBarProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseProgress.Root> | null>;
}) => {
	const { root } = progressVariants({ variant, animated: showAnimation });
	const formatValue = valueFormatter || defaultValueFormatter;

	return (
		<Progress
			value={value}
			max={max}
			className={cx(root(), className)}
			{...props}
		>
			{label && (
				<ProgressLabel variant={variant} animated={showAnimation}>
					{label}
				</ProgressLabel>
			)}
			<ProgressTrack variant={variant} animated={showAnimation}>
				<ProgressIndicator variant={variant} animated={showAnimation} />
			</ProgressTrack>
			{showValue && (
				<ProgressValue variant={variant} animated={showAnimation}>
					{(_formattedValue, val) => formatValue(val, max)}
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
