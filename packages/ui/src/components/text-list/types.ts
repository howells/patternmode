import type { IconSize } from "@patternmode/icon/types";
import type { LucideIcon } from "lucide-react";
import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type {
	indicatorVariants,
	listItemVariants,
	listVariants,
} from "./variants";

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
	/**
	 * Optional icon component to use as a custom bullet for all list items.
	 * Accepts Lucide icons or any component supporting `className` and `strokeWidth`.
	 */
	icon?:
		| React.ComponentType<{ className?: string; strokeWidth?: number }>
		| LucideIcon;
	/**
	 * Size to render the custom icon bullets when `icon` is provided.
	 */
	iconSize?: IconSize;
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
	/**
	 * Optional heading text to display above the main content of the list item.
	 * Renders as a semantic heading element for better accessibility.
	 */
	heading?: string;
} & React.HTMLAttributes<HTMLLIElement> &
	VariantProps<typeof listItemVariants>;

/**
 * Props for the TextListIndicator component.
 */
export type TextListIndicatorProps = {
	/**
	 * The icon component to render as the list item indicator.
	 * Should be a Lucide React icon or similar component that accepts className and strokeWidth props.
	 * When provided, this takes precedence over children content.
	 */
	icon?:
		| React.ComponentType<{ className?: string; strokeWidth?: number }>
		| LucideIcon;
	/**
	 * The size of the icon indicator when using the icon prop.
	 * Controls both width and height of the rendered icon.
	 */
	size?: IconSize;
	/**
	 * The visual style variant that should match the parent List component.
	 * 'marker' hides the indicator (for traditional lists), 'plain' shows it.
	 */
	variant?: "marker" | "plain";
	/**
	 * Whether to remove all default component styling.
	 * When true, only user-provided className styles are applied.
	 */
	unstyled?: boolean;
	/**
	 * Additional CSS classes to apply to the indicator container.
	 * Merged with component's default styling unless unstyled is true.
	 */
	className?: string;
	/**
	 * Custom content to display as the indicator when no icon is provided.
	 * Can be text, symbols, or other React nodes to serve as list markers.
	 */
	children?: string | React.ReactNode;
} & VariantProps<typeof indicatorVariants>;
