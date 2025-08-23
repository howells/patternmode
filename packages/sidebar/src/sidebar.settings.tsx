import { Button } from "@patternmode/button";
import { Lock, PanelLeftClose, PanelLeftOpen, Pin } from "lucide-react";
import { useSidebar } from "./sidebar-store";

const SidebarSettings = () => {
	const isExpanded = useSidebar((s) => s.isExpanded);
	const state = useSidebar((s) => s.state);
	const setState = useSidebar((s) => s.setState);

	const getNextState = (current: "collapsed" | "open" | "pinned" | "locked") => {
		switch (current) {
			case "collapsed":
				return "pinned";
			case "pinned":
				return "locked";
			case "locked":
				return "collapsed"; // unpin/collapse
			case "open":
			default:
				return "pinned"; // treat open like pinned in desktop flow
		}
	};

	const handleClick = () => {
		const next = getNextState(state);
		setState(next);
	};

	// Removed currentIcon function - using text-only button for now

	const currentLabel = (() => {
		switch (state) {
			case "pinned":
				return "Sidebar: Pinned";
			case "locked":
				return "Sidebar: Locked";
			case "collapsed":
				return "Sidebar: Collapsed";
			case "open":
			default:
				return "Sidebar: Pinned"; // open maps to pinned semantics
		}
	})();

	const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleClick();
		}
	};

	const CurrentIcon = (() => {
		switch (state) {
			case "pinned":
				return Pin;
			case "locked":
				return Lock;
			case "open":
				return PanelLeftOpen;
			case "collapsed":
			default:
				return PanelLeftClose;
		}
	})();

	return (
		<Button
			data-testid="sidebar"
			variant="ghost"
			size="icon"
			icon={CurrentIcon}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			aria-label={`${currentLabel}. Click to cycle state.`}
		/>
	);
};

export default SidebarSettings;
