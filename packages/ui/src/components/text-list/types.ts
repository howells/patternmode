// Simplified TextList types (no icon or heading support)
import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type { listItemVariants, listVariants } from "./variants";

/**
 * Props for the TextList component.
 */
export type TextListProps = {
	/**
	 * The underlying HTML element to render for the list container.
	 * Commonly 'ul' for unordered lists or 'ol' for ordered lists.
	 * Defaults to 'ul' if not specified.
	 */
	as?: React.ElementType;
	/**
	 * The visual style variant for the list display.
	 * 'marker' shows traditional bullet points or numbers,
	 * 'plain' removes default markers for custom styling.
	 */
	variant?: "marker" | "plain";
	/**
	 * Controls the alignment of list items within the container.
	 * 'start' aligns to the beginning, 'center' centers items,
	 * 'end' aligns to the end of the container.
	 */
	align?: "start" | "center" | "end";
	/**
	 * Whether to remove all default component styling.
	 * When true, only user-provided className styles are applied.
	 */
	unstyled?: boolean;
} & React.HTMLAttributes<HTMLUListElement> &
	VariantProps<typeof listVariants>;

/**
 * Props for the TextListItem component.
 */
export type TextListItemProps = {
	/**
	 * The visual style variant that should match the parent List component.
	 * 'marker' for traditional list styling, 'plain' for custom indicator styling.
	 */
	variant?: "marker" | "plain";
	/**
	 * Controls the alignment of content within the list item.
	 * Should typically match the parent List component's align prop.
	 */
	align?: "start" | "center" | "end";
	/**
	 * Whether to remove all default component styling.
	 * When true, only user-provided className styles are applied.
	 */
	unstyled?: boolean;
} & React.HTMLAttributes<HTMLLIElement> &
	VariantProps<typeof listItemVariants>;

/**
 * Props for the TextListIndicator component.
 */
export type TextListIndicatorProps = never;
