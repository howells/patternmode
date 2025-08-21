"use client";

import { Button } from "@patternmode/ui/components/button";
import { cx } from "@patternmode/utils/cx";
import { useWindowSize } from "@uidotdev/usehooks";
import { Pin } from "lucide-react";
import type React from "react";
import { useEffect } from "react";
import { SidebarMobile } from "./sidebar-mobile";
import { useSidebar } from "./sidebar-store";

interface SidebarProps {
	children: React.ReactNode;
	className?: string;
	expandOnHover?: boolean;
}

export function Sidebar({ children, className, expandOnHover = false }: SidebarProps) {
	// Subscribe to specific state slices for optimal performance
	const state = useSidebar((s) => s.state);
	const isHovering = useSidebar((s) => s.isHovering);
	const isMobile = useSidebar((s) => s.isMobile);
	const isExpanded = useSidebar((s) => s.isExpanded);
	const togglePin = useSidebar((s) => s.togglePin);
	const setHovering = useSidebar((s) => s.setHovering);
	const setMobile = useSidebar((s) => s.setMobile);

	// Set mobile state on mount and resize
	const { width } = useWindowSize();
	useEffect(() => {
		const mobile = width !== null && width < 1024;
		setMobile(mobile);
	}, [width, setMobile]);

	const handleMouseEnter = () => {
		if (expandOnHover && state !== "pinned") {
			setHovering(true);
		}
	};

	const handleMouseLeave = () => {
		if (expandOnHover) {
			setHovering(false);
		}
	};

	if (isMobile) {
		return <SidebarMobile>{children}</SidebarMobile>;
	}

	return (
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
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{isExpanded && (
				<Button variant="ghost" size="icon-xs" className="absolute top-2 right-2" icon={Pin} onClick={() => togglePin()} />
			)}
			{children}
		</nav>
	);
}
