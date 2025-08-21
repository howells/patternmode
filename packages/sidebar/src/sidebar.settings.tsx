import { Button } from "@patternmode/ui/components/button";
import {
	Menu,
	MenuContent,
	MenuItem,
	MenuTrigger,
} from "@patternmode/ui/components/menu";
import { Lock, Pin, Settings, X } from "lucide-react";
import { useSidebar } from "./sidebar-store";

const SidebarSettings = () => {
  const isExpanded = useSidebar((s) => s.isExpanded);
  const state = useSidebar((s) => s.state);
  const togglePin = useSidebar((s) => s.togglePin);
  const toggleLock = useSidebar((s) => s.toggleLock);
  const setState = useSidebar((s) => s.setState);

	return (
		<Menu>
			<MenuTrigger
				variant="ghost"
				size={isExpanded ? "base" : "icon"}
				icon={Settings}
			>
				{isExpanded ? "Sidebar Options" : ""}
			</MenuTrigger>
			<MenuContent align="end" sideOffset={4}>
				<MenuItem
					icon={Pin}
					onClick={togglePin}
					className={state === "pinned" ? "bg-zinc-100 dark:bg-zinc-800" : ""}
				>
					{state === "pinned" ? "Unpin Sidebar" : "Pin Sidebar"}
				</MenuItem>
				<MenuItem
					icon={Lock}
					onClick={toggleLock}
					className={state === "locked" ? "bg-zinc-100 dark:bg-zinc-800" : ""}
				>
					{state === "locked" ? "Unlock Sidebar" : "Lock Sidebar"}
				</MenuItem>
				<MenuItem
					icon={X}
					onClick={() => setState("collapsed")}
					className={
						state === "collapsed" ? "bg-zinc-100 dark:bg-zinc-800" : ""
					}
				>
					Collapse Sidebar
				</MenuItem>
			</MenuContent>
		</Menu>
	);
};

export default SidebarSettings;
