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

export type HeadingProps = {
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	className?: string;
} & Omit<HeadingElementProps, "level" | "className">;

export const Heading = ({ className, level = 1, ...props }: HeadingProps) => {
	return (
		<HeadingElement
			level={level}
			data-testid="heading"
			className={cx(
				className,
				"m-0 text-xl text-zinc-950 font-semibold dark:text-white",
			)}
			{...props}
		/>
	);
};
