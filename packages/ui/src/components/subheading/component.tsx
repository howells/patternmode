import { cx } from "@patternmode/utils/cx";
import type { HeadingElementProps } from "../heading-element/component";
import { HeadingElement } from "../heading-element/component";

export type SubheadingProps = {
	/**
	 * Heading level determining which HTML element to render (h1-h6).
	 * Defaults to h2 for typical subheading usage.
	 */
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	/**
	 * Additional CSS classes.
	 * Applied alongside default subheading styling.
	 */
	className?: string;
} & Omit<HeadingElementProps, "level" | "className">;

/**
 * Secondary heading component for section subtitles and supplementary titles.
 */
export const Subheading = ({
	className,
	level = 2,
	...props
}: SubheadingProps) => {
	return (
		<HeadingElement
			level={level}
			className={cx(className, "m-0 text-sm font-semibold text-current")}
			data-testid="subheading"
			{...props}
		/>
	);
};
