"use client";

import { cx } from "@patternmode/utils/cx";
import { createContext, useContext } from "react";
import type { TextListIndicatorProps, TextListItemProps, TextListProps } from "./types";
import { listItemVariants, listVariants } from "./variants";

// Simplified context (no icon/heading)
type TextListContextValue = Record<string, never>;

const TextListContext = createContext<TextListContextValue | null>(null);

/**
 * List component with customizable styling and semantic markup options.
 */
export const TextList = ({
	as = "ul",
	variant,
	align,
	unstyled,
	className,
	children,
	...props
}: TextListProps) => {
	const Component: React.ElementType = as || "ul";

	return (
		<TextListContext.Provider value={{}}>
			<Component
				data-testid="text-list"
				className={cx(!unstyled && listVariants({ variant, align }), className)}
				{...props}
			>
				{children}
			</Component>
		</TextListContext.Provider>
	);
};

/**
 * Individual list item component with consistent styling and alignment.
 *
 * @component
 */
export function TextListItem({
	variant,
	align,
	unstyled,
	className,
	children,
	...props
}: TextListItemProps) {
	useContext(TextListContext);

	return (
		<li
			className={cx(!unstyled && listItemVariants({ variant, align }), className)}
			{...props}
		>
			{children}
		</li>
	);
}

/**
 * TextListIndicator has been removed in the simplified TextList.
 */
export function TextListIndicator(_: TextListIndicatorProps) {
	return null;
}
