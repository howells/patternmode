"use client";

import type { useRender } from "@base-ui-components/react/use-render";
import { LayoutGroup, motion } from "motion/react";

// Framework-agnostic: do not import Next.js here

import { Button } from "@patternmode/button";
import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { useId } from "react";

type NavbarProps = {
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
} & React.ComponentPropsWithoutRef<"nav">;

/**
 * Root navbar component for horizontal navigation layouts.
 */
const Navbar = ({ className, ...props }: NavbarProps) => {
	return (
		<nav
			data-testid="navbar"
			{...props}
			className={cx(className, "flex flex-1 items-center gap-4 py-2.5")}
		/>
	);
};

Navbar.displayName = "Navbar";

type NavbarDividerProps = {
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
} & React.ComponentPropsWithoutRef<"div">;

/**
 * Navbar divider component for visual separation between sections.
 */
export function NavbarDivider({ className, ...props }: NavbarDividerProps) {
	return (
		<div
			aria-hidden="true"
			{...props}
			className={cx(className, "h-6 w-px bg-zinc-950/10 dark:bg-white/10")}
		/>
	);
}

type NavbarSectionProps = {
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
} & React.ComponentPropsWithoutRef<"div">;

/**
 * Navbar section component for grouping related items with shared animation context.
 */
export function NavbarSection({ className, ...props }: NavbarSectionProps) {
	const id = useId();

	return (
		<LayoutGroup id={id}>
			<div {...props} className={cx(className, "flex items-center gap-3")} />
		</LayoutGroup>
	);
}

type NavbarSpacerProps = {
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
} & React.ComponentPropsWithoutRef<"div">;

/**
 * Navbar spacer component for flexible spacing between sections.
 */
export function NavbarSpacer({ className, ...props }: NavbarSpacerProps) {
	return (
		<div
			aria-hidden="true"
			{...props}
			className={cx(className, "-ml-4 flex-1")}
		/>
	);
}

type NavbarItemProps = {
	/**
	 * Reference to the button element.
	 */
	ref?: React.RefObject<HTMLButtonElement | null>;
	/**
	 * Whether this is the current active page item.
	 * Displays an animated indicator beneath the item.
	 */
	current?: boolean;
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
	/**
	 * Content to display within the navbar item.
	 */
	children?: React.ReactNode;
	/**
	 * URL to navigate to when clicked. Enables Next.js Link integration.
	 */
	href?: string;
	render?: useRender.RenderProp<Record<string, unknown>>;
} & Record<string, unknown>;

/**
 * Interactive navbar item with animated current page indicator and Next.js Link integration.
 */
export const NavbarItem = function NavbarItem({
	ref,
	current,
	className,
	children,
	href,
	render,
	...props
}: NavbarItemProps) {
	const classes = cx(
		// Base - let the minimal variant handle background and colors
		"relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-base/6 font-medium sm:text-sm/5",
		// Leading icon-only
		"*:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:fill-zinc-500 sm:*:data-[slot=icon]:size-5",
		// Trailing icon (down chevron or similar)
		"*:not-nth-2:last:data-[slot=icon]:ml-auto *:not-nth-2:last:data-[slot=icon]:size-5 sm:*:not-nth-2:last:data-[slot=icon]:size-4",
		// Avatar
		"*:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:size-7 *:data-[slot=avatar]:[--avatar-radius:var(--radius-md)] sm:*:data-[slot=avatar]:size-6",
	);

	return (
		<span className={cx(className, "relative")}>
			{current && (
				<motion.span
					layoutId="current-indicator"
					className="absolute inset-x-2 -bottom-2.5 h-0.5 rounded-full bg-zinc-950 dark:bg-white"
				/>
			)}
			<Button
				ref={ref}
				variant="minimal"
				className={classes}
				data-current={current ? "true" : undefined}
				render={render}
				{...props}
			>
				{children}
			</Button>
		</span>
	);
};

type NavbarLabelProps = {
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
} & React.ComponentPropsWithoutRef<"span">;

/**
 * Navbar label component for text content with automatic truncation.
 */
export function NavbarLabel({ className, ...props }: NavbarLabelProps) {
	return <span {...props} className={cx(className, "truncate")} />;
}

export { Navbar };
export type { NavbarLabelProps, NavbarProps };
