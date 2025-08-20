import type { useRender } from "@base-ui-components/react/use-render";
import type React from "react";

export type BreadcrumbsProps = React.ComponentProps<"nav"> & {
	/**
	 * Optional ref to the nav element.
	 * Provides direct access to the underlying navigation element for advanced use cases.
	 */
	ref?: React.RefObject<React.ElementRef<"nav"> | null>;
};

export type BreadcrumbListProps = React.ComponentProps<"ol"> & {
	/**
	 * Optional ref to the ordered list element.
	 * Provides direct access to the underlying list element for advanced use cases.
	 */
	ref?: React.RefObject<HTMLOListElement | null>;
};

export type BreadcrumbItemProps = React.ComponentProps<"li"> & {
	/**
	 * Optional ref to the list item element.
	 * Provides direct access to the underlying list item element for advanced use cases.
	 */
	ref?: React.RefObject<HTMLLIElement | null>;
};

export type BreadcrumbLinkProps = useRender.ComponentProps<"a"> & {
	/**
	 * Optional ref to the anchor element.
	 * Provides direct access to the underlying anchor element for advanced use cases.
	 */
	ref?: React.RefObject<HTMLAnchorElement | null>;

	/**
	 * Custom element to render (defaults to anchor tag).
	 * Supports custom elements like Next.js Link or React Router Link via the render prop pattern.
	 * When provided, the custom element will receive all props and styling.
	 */
	render?: React.ReactElement;
};

export type BreadcrumbPageProps = React.ComponentProps<"span"> & {
	/**
	 * Optional ref to the span element.
	 * Provides direct access to the underlying span element for advanced use cases.
	 */
	ref?: React.RefObject<HTMLSpanElement | null>;
};

export type BreadcrumbSeparatorProps = React.ComponentProps<"li"> & {
	/**
	 * Optional ref to the list item element.
	 * Provides direct access to the underlying separator list item element for advanced use cases.
	 */
	ref?: React.RefObject<HTMLLIElement | null>;

	/**
	 * Custom separator content (defaults to ChevronRight icon).
	 * Can be text, custom icons, or any React element to display between breadcrumb items.
	 * The separator is automatically hidden from screen readers with proper ARIA attributes.
	 */
	children?: React.ReactNode;
};

export type BreadcrumbEllipsisProps = React.ComponentProps<"span"> & {
	/**
	 * Optional ref to the span element.
	 * Provides direct access to the underlying ellipsis span element for advanced use cases.
	 */
	ref?: React.RefObject<HTMLSpanElement | null>;
};
