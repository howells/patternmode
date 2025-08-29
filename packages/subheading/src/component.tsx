import { cx } from "@patternmode/utils/cx";
import type * as React from "react";

export type HeadingElementProps = {
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	className?: string;
} & React.ComponentPropsWithoutRef<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">;

const HeadingElement = ({
	level = 1,
	className,
	...props
}: HeadingElementProps) => {
	const Element: `h${typeof level}` = `h${level}`;
	return (
		<Element
			{...props}
			data-testid="heading-element"
			className={cx(className)}
		/>
	);
};

export type SubheadingProps = {
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	className?: string;
} & Omit<HeadingElementProps, "level" | "className">;

export const Subheading = ({
	className,
	level = 2,
	...props
}: SubheadingProps) => {
	return (
		<HeadingElement
			level={level}
			className={cx(className, "m-0 text-sm text-current font-medium")}
			data-testid="subheading"
			{...props}
		/>
	);
};
