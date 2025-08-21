import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import type React from "react";
import { cx } from "@patternmode/core/utils/cx";

// Framework-agnostic: do not import Next.js here
import { Button } from "../button/component";

type PaginationProps = {
	/**
	 * Accessible label for screen readers describing the pagination navigation.
	 */
	"aria-label"?: string;
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
	/**
	 * Pagination controls including previous/next buttons and page list.
	 */
	children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"nav">;

/**
 * Root pagination component for navigation container with proper accessibility.
 */
export const Pagination = ({
	"aria-label": ariaLabel = "Page navigation",
	className,
	...props
}: PaginationProps) => {
	return (
		<nav
			data-testid="pagination"
			aria-label={ariaLabel}
			{...props}
			className={cx("flex items-center justify-center gap-2", className)}
		/>
	);
};

type PaginationPreviousProps = {
	/**
	 * URL for the previous page. When undefined, button is disabled.
	 */
	href?: string;
	/**
	 * Custom render function for the button element (e.g., Next.js Link).
	 * Takes precedence over href when provided.
	 */
	render?: (props: Record<string, unknown>) => React.ReactElement;
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
	/**
	 * Whether the button should be disabled regardless of href.
	 */
	disabled?: boolean;
	/**
	 * Button text content for the previous button.
	 */
	children?: React.ReactNode;
};

/**
 * Previous page navigation button with automatic disabled state handling.
 */
export const PaginationPrevious = ({
	href,
	render,
	className,
	children = "Previous",
	disabled = false,
}: PaginationPreviousProps) => {
	if (disabled || (!href && !render)) {
		return (
			<Button
				variant="secondary"
				disabled={true}
				aria-label="Previous page"
				leftIcon={ChevronLeft}
				className={className}
			>
				<span className="sr-only sm:not-sr-only">{children}</span>
			</Button>
		);
	}

	return (
		<Button
			render={render || ((props) => <a href={href} {...props} />)}
			variant="secondary"
			leftIcon={ChevronLeft}
			className={className}
		>
			<span className="sr-only sm:not-sr-only">{children}</span>
		</Button>
	);
};

type PaginationNextProps = {
	/**
	 * URL for the next page. When undefined, button is disabled.
	 */
	href?: string;
	/**
	 * Custom render function for the button element (e.g., Next.js Link).
	 * Takes precedence over href when provided.
	 */
	render?: (props: Record<string, unknown>) => React.ReactElement;
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
	/**
	 * Whether the button should be disabled regardless of href.
	 */
	disabled?: boolean;
	/**
	 * Button text content for the next button.
	 */
	children?: React.ReactNode;
};

/**
 * Next page navigation button with automatic disabled state handling.
 */
export const PaginationNext = ({
	href,
	render,
	className,
	children = "Next",
	disabled = false,
}: PaginationNextProps) => {
	if (disabled || (!href && !render)) {
		return (
			<Button
				variant="secondary"
				disabled={true}
				aria-label="Next page"
				rightIcon={ChevronRight}
				className={className}
			>
				<span className="sr-only sm:not-sr-only">{children}</span>
			</Button>
		);
	}

	return (
		<Button
			render={render || ((props) => <a href={href} {...props} />)}
			variant="secondary"
			rightIcon={ChevronRight}
			className={className}
		>
			<span className="sr-only sm:not-sr-only">{children}</span>
		</Button>
	);
};

type PaginationListProps = {
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
	/**
	 * Page buttons and gap indicators to display in the list.
	 */
	children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"ul">;

/**
 * List container for page number buttons with semantic markup.
 */
export const PaginationList = ({
	className,
	...props
}: PaginationListProps) => {
	return <ul {...props} className={cx("flex items-center gap-1", className)} />;
};

type PaginationPageProps = {
	/**
	 * URL for this page navigation.
	 */
	href?: string;
	/**
	 * Custom render function for the button element (e.g., Next.js Link).
	 * Takes precedence over href when provided.
	 */
	render?: (props: Record<string, unknown>) => React.ReactElement;
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
	/**
	 * Whether this is the current active page with distinct styling.
	 */
	current?: boolean;
	/**
	 * Page number or content to display within the button.
	 */
	children?: React.ReactNode;
};

/**
 * Individual page number button with current page state support.
 */
export const PaginationPage = ({
	href,
	render,
	className,
	current = false,
	children,
}: PaginationPageProps) => {
	if (current) {
		return (
			<li>
				<Button
					variant="primary"
					aria-label={`Page ${children}`}
					aria-current="page"
					className={cx("min-w-10", className)}
				>
					{children}
				</Button>
			</li>
		);
	}

	return (
		<li>
			<Button
				render={render || ((props) => <a href={href} {...props} />)}
				variant="ghost"
				className={cx("min-w-10", className)}
			>
				{children}
			</Button>
		</li>
	);
};

type PaginationGapProps = {
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
	/**
	 * Gap content to display (defaults to MoreHorizontal icon).
	 */
	children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"span">;

/**
 * Gap indicator for truncated page ranges showing omitted pages.
 */
export const PaginationGap = ({
	className,
	children = <MoreHorizontal className="h-4 w-4" />,
	...props
}: PaginationGapProps) => {
	return (
		<span
			aria-hidden="true"
			{...props}
			className={cx(
				"flex h-9 w-9 items-center justify-center text-zinc-500 dark:text-zinc-400",
				className,
			)}
		>
			{children}
		</span>
	);
};

export type {
	PaginationGapProps,
	PaginationListProps,
	PaginationNextProps,
	PaginationPageProps,
	PaginationPreviousProps,
	PaginationProps,
};
