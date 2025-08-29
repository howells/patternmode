import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { forwardRef } from "react";

export type HeadingElementProps = {
	/**
	 * Heading level determining which HTML element to render (h1-h6).
	 * Controls semantic hierarchy and accessibility structure.
	 */
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	/**
	 * Additional CSS classes.
	 * Applied to the heading element for custom styling.
	 */
	className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

/**
 * Semantic heading element component with proper HTML heading structure.
 */
export const HeadingElement = forwardRef<
	HTMLHeadingElement,
	HeadingElementProps
>(({ level = 1, className, ...props }, ref) => {
	const tags: Record<
		1 | 2 | 3 | 4 | 5 | 6,
		"h1" | "h2" | "h3" | "h4" | "h5" | "h6"
	> = {
		1: "h1",
		2: "h2",
		3: "h3",
		4: "h4",
		5: "h5",
		6: "h6",
	};
	const Element = tags[level];

	return (
		<Element
			ref={ref}
			{...props}
			data-testid="heading-element"
			className={cx(className)}
		/>
	);
});
