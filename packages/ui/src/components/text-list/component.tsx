"use client";

import { Icon } from "@patternmode/icon";
import type { IconComponent, IconSize } from "@patternmode/icon/types";
import { cx } from "@patternmode/utils/cx";
import { createContext, useContext } from "react";
import type {
	TextListIndicatorProps,
	TextListItemProps,
	TextListProps,
} from "./types";
import { indicatorVariants, listItemVariants, listVariants } from "./variants";

type TextListContextValue = {
	icon?: IconComponent;
	iconSize?: IconSize;
};

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
	icon,
	iconSize,
	...props
}: TextListProps) => {
	const Component: React.ElementType = as || "ul";

	return (
		<TextListContext.Provider value={{ icon, iconSize }}>
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
	heading,
	...props
}: TextListItemProps) {
	const ctx = useContext(TextListContext);

	return (
		<li
			className={cx(!unstyled && listItemVariants({ variant, align }), className)}
			{...props}
		>
			<TextListIndicator
				icon={ctx?.icon}
				size={ctx?.iconSize ?? ("base" as IconSize)}
				variant={variant}
			/>
			{heading && (
				<h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
					{heading}
				</h4>
			)}
			{children}
		</li>
	);
}

/**
 * Custom indicator component for list items with icon or custom content support.
 */
export function TextListIndicator({
	icon: IconComponent,
	size = "base",
	variant,
	unstyled,
	className,
	children,
	...props
}: TextListIndicatorProps) {
	return (
		<span
			className={cx(!unstyled && indicatorVariants({ variant }), className)}
			{...props}
		>
			{IconComponent ? (
				<Icon icon={IconComponent} size={size} />
			) : (
				<span className="block size-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
			)}
		</span>
	);
}
