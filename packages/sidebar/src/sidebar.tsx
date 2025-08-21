"use client";

import { cx } from "@patternmode/utils/cx";
import { useWindowSize } from "@uidotdev/usehooks";
import type React from "react";
import { useEffect } from "react";
import { SidebarMobile } from "./sidebar-mobile";
import { useSidebar } from "./sidebar-store";

interface SidebarProps {
	children: React.ReactNode;
	className?: string;
}

export function Sidebar({ children, className }: SidebarProps) {
	// Subscribe to specific state slices for optimal performance
	const state = useSidebar((s) => s.state);
	const isHovering = useSidebar((s) => s.isHovering);
	const isMobile = useSidebar((s) => s.isMobile);
	const isExpanded = useSidebar((s) => s.isExpanded);
	const setHovering = useSidebar((s) => s.setHovering);
	const setMobile = useSidebar((s) => s.setMobile);

	// Set mobile state on mount and resize
	const { width } = useWindowSize();
	useEffect(() => {
		const mobile = width !== null && width < 1024;
		setMobile(mobile);
	}, [width, setMobile]);

	// Update document data attribute for CSS styling
	useEffect(() => {
		document.documentElement.setAttribute("data-sidebar-state", state);
		document.documentElement.setAttribute(
			"data-sidebar-expanded",
			String(isExpanded),
		);

		return () => {
			document.documentElement.removeAttribute("data-sidebar-state");
			document.documentElement.removeAttribute("data-sidebar-expanded");
		};
	}, [state, isExpanded]);

	if (isMobile) {
		return <SidebarMobile>{children}</SidebarMobile>;
	}

	return (
		<div
			className={cx(
				"fixed inset-y-0 left-0 z-40",
				"bg-white dark:bg-zinc-900",
				"border-r border-zinc-200 dark:border-zinc-800",
				"transition-[width] duration-200 ease-out",
				isExpanded
					? "w-[--sidebar-open-width]"
					: "w-[--sidebar-collapsed-width]",
				className,
			)}
			data-sidebar-state={state}
			data-sidebar-expanded={isExpanded}
			onMouseEnter={() => state !== "pinned" && setHovering(true)}
			onMouseLeave={() => setHovering(false)}
		>
			{children}
		</div>
	);
}
