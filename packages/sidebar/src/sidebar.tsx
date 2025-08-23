"use client";

import { cx } from "@patternmode/utils/cx";
import { useWindowSize } from "@uidotdev/usehooks";
import type React from "react";
import { useEffect, useRef } from "react";
import { useHover } from "@react-aria/interactions";
import SidebarSettings from "./sidebar.settings";
import { SidebarMobile } from "./sidebar-mobile";
import { useSidebar } from "./sidebar-store";
import { SidebarOverlay } from "./sidebar.overlay";

interface SidebarProps {
	children: React.ReactNode;
	className?: string;
	expandOnHover?: boolean;
}

export function Sidebar({
	children,
	className,
	expandOnHover = true,
}: SidebarProps) {
	// Subscribe to specific state slices for optimal performance
	const state = useSidebar((s) => s.state);
	const isHovering = useSidebar((s) => s.isHovering);
	const isMobile = useSidebar((s) => s.isMobile);
	const isExpanded = useSidebar((s) => s.isExpanded);
	const togglePin = useSidebar((s) => s.togglePin);
	const toggleLock = useSidebar((s) => s.toggleLock);
	const setState = useSidebar((s) => s.setState);
	const setHovering = useSidebar((s) => s.setHovering);
	const setMobile = useSidebar((s) => s.setMobile);

	// Set mobile state on mount and resize
	const { width } = useWindowSize();
	useEffect(() => {
		const mobile = width !== null && width < 1024;
		setMobile(mobile);
	}, [width, setMobile]);

	// Hover intent with delays to avoid accidental triggers
	const openDelay = 200; // ms
	const closeDelay = 150; // ms
	const openTimeout = useRef<number | null>(null);
	const closeTimeout = useRef<number | null>(null);

	useEffect(() => {
		return () => {
			if (openTimeout.current) window.clearTimeout(openTimeout.current);
			if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
		};
	}, []);

	const isHoverDisabled =
		!expandOnHover || state === "pinned" || state === "locked";
	const { hoverProps } = useHover({
		isDisabled: isHoverDisabled,
		onHoverStart: () => {
			if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
			if (openTimeout.current) window.clearTimeout(openTimeout.current);
			openTimeout.current = window.setTimeout(() => {
				setHovering(true);
			}, openDelay);
		},
		onHoverEnd: () => {
			if (openTimeout.current) window.clearTimeout(openTimeout.current);
			if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
			closeTimeout.current = window.setTimeout(() => {
				setHovering(false);
			}, closeDelay);
		},
	});

	if (isMobile) {
		return <SidebarMobile>{children}</SidebarMobile>;
	}

	return (
		<>
			<nav
			className={cx(
				"Sidebar",
				"fixed inset-y-0 left-0 z-40",
				"bg-white dark:bg-zinc-900",
				"border-r border-zinc-200 dark:border-zinc-800",
				"transition-[width] duration-200 ease-out",
				isExpanded
					? "w-[var(--sidebar-open-width)]"
					: "w-[var(--sidebar-collapsed-width)]",
				className,
			)}
			data-testid="sidebar"
			aria-expanded={isExpanded}
			{...hoverProps}
		>
			<div className="flex flex-col h-full">
				{children}
				{/* Sidebar Controls - positioned at bottom */}
				<div className="mt-auto border-t p-2.5">
					<SidebarSettings />
				</div>
			</div>
			</nav>
			<SidebarOverlay />
		</>
	);
}
