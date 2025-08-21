import { cx } from "@patternmode/utils/cx";
import type React from "react";
import {
	clampValue,
	defaultValueFormatter,
	getProgressPercentage,
} from "../progress-utils";
import type { ProgressCircleProps } from "./types";
import { progressCircleVariants } from "./variants";

/**
 * Circular progress indicator for displaying completion status and loading states.
 */
const ProgressCircle = ({
	ref,
	value = 0,
	max = 100,
	radius = 32,
	strokeWidth = 6,
	showAnimation = true,
	variant = "default",
	size,
	className,
	children,
	label,
	showValue = false,
	valueFormatter,
	"aria-label": ariaLabel,
	"aria-describedby": ariaDescribedBy,
	...props
}: ProgressCircleProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
	const safeValue = value !== null ? clampValue(value, 0, max) : null;
	const normalizedRadius = radius - strokeWidth / 2;
	const circumference = normalizedRadius * 2 * Math.PI;
	const percentage = getProgressPercentage(safeValue, max);
	const offset = circumference - (percentage / 100) * circumference;

	const formatValue = valueFormatter || defaultValueFormatter;
	const {
		root,
		svg,
		track,
		indicator,
		content,
		label: labelClass,
		value: valueClass,
	} = progressCircleVariants({ variant, showAnimation, size });

	// Determine effective size from size variant or radius
	const effectiveSize = size ? undefined : radius * 2;

	return (
		<div
			data-testid="progress-circle"
			ref={ref}
			className={cx(root(), className)}
			role="progressbar"
			aria-label={ariaLabel || label || "Progress circle"}
			aria-valuenow={safeValue ?? undefined}
			aria-valuemin={0}
			aria-valuemax={max}
			aria-describedby={ariaDescribedBy}
			data-max={max}
			data-value={safeValue}
			data-percentage={Math.round(percentage)}
			style={
				effectiveSize
					? { width: effectiveSize, height: effectiveSize }
					: undefined
			}
			{...props}
		>
			<svg
				width={radius * 2}
				height={radius * 2}
				viewBox={`0 0 ${radius * 2} ${radius * 2}`}
				className={cx(svg(), "w-full h-full")}
			>
				{/* Background track */}
				<circle
					r={normalizedRadius}
					cx={radius}
					cy={radius}
					strokeWidth={strokeWidth}
					fill="transparent"
					strokeLinecap="round"
					className={track()}
				/>
				{/* Progress indicator */}
				{safeValue !== null && safeValue >= 0 && (
					<circle
						r={normalizedRadius}
						cx={radius}
						cy={radius}
						strokeWidth={strokeWidth}
						strokeDasharray={`${circumference} ${circumference}`}
						strokeDashoffset={offset}
						fill="transparent"
						strokeLinecap="round"
						className={indicator()}
					/>
				)}
			</svg>

			{/* Content area */}
			<div className={content()}>
				{children || (
					<div className="flex flex-col items-center justify-center text-center">
						{showValue && (
							<span className={valueClass()}>
								{formatValue(safeValue, max)}
							</span>
						)}
						{label && !showValue && (
							<span className={labelClass()}>{label}</span>
						)}
						{label && showValue && (
							<span className={cx(labelClass(), "text-xs mt-1")}>{label}</span>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

ProgressCircle.displayName = "ProgressCircle";

export { ProgressCircle };
