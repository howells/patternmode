"use client";

import { cx } from "@patternmode/utils/cx";
import type * as React from "react";
import type { GapValue, SpacingValue, StackProps } from "./types";
import { stackVariants } from "./variants";

/**
 * Utility function to get gap class string from a gap value.
 */
const getGapClass = (value: GapValue): string => {
	if (value >= 0) {
		return `gap-${value}`;
	}
	// Handle negative values
	return `gap-0`; // Negative spacing handled by compound variants
};

/**
 * Utility function to get padding class string from a spacing value.
 */
const getPaddingClass = (value: SpacingValue): string => {
	return `p-${value}`;
};

/**
 * Layout component for vertical or horizontal stacking with configurable spacing.
 */
const Stack = ({
	ref,
	direction = "vertical",
	gap = 4,
	padding,
	align,
	justify,
	wrap = false,
	as: Component = "div",
	className,
	children,
	...props
}: StackProps & { ref?: React.RefObject<HTMLElement | null> }) => {
	// Generate base classes
	const gapClass = getGapClass(gap);
	const paddingClass = padding !== undefined ? getPaddingClass(padding) : "";

	const generatedClasses = stackVariants({
		direction,
		align,
		justify,
		wrap,
	});

	return (
		<Component
			ref={ref}
			className={cx(
				generatedClasses,
				gapClass,
				paddingClass,
				className,
			)}
			data-testid="stack"
			{...props}
		>
			{children}
		</Component>
	);
};

Stack.displayName = "Stack";

/**
 * Vertical stack helper component.
 */
const VStack = ({
	ref,
	...props
}: Omit<StackProps, "direction"> & {
	ref?: React.RefObject<HTMLElement | null>;
}) => <Stack ref={ref} direction="vertical" {...props} />;
VStack.displayName = "VStack";

/**
 * Horizontal stack helper component.
 */
const HStack = ({
	ref,
	...props
}: Omit<StackProps, "direction"> & {
	ref?: React.RefObject<HTMLElement | null>;
}) => <Stack ref={ref} direction="horizontal" {...props} />;
HStack.displayName = "HStack";

export { HStack, Stack, VStack };