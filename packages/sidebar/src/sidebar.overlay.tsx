import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { useSidebar } from "./sidebar-store";

/**
 * Slightly dark clickable overlay shown on desktop when the sidebar is open.
 */
export const SidebarOverlay = (): React.ReactElement | null => {
	const state = useSidebar((s) => s.state);
	const isMobile = useSidebar((s) => s.isMobile);
	const isHovering = useSidebar((s) => s.isHovering);

	if (isMobile) return null;

	const visible = state === "collapsed" && isHovering;

	return (
		<div
			data-testid="sidebar"
			aria-hidden="true"
			className={cx(
				"fixed inset-0 z-30",
				// Slightly more transparent than before
				"bg-black/20",
				// Match sidebar timing: fade in/out with same duration/ease
				"transition-opacity duration-200 ease-out",
				// Visual only; don't block interactions
				"pointer-events-none",
				visible ? "opacity-100" : "opacity-0",
			)}
		/>
	);
};
