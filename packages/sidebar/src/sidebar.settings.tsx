import { Button } from "@patternmode/button";
import { Lock, PanelLeftClose, PanelLeftOpen, Pin } from "lucide-react";
import { useSidebar } from "./sidebar-store";

const SidebarSettings = () => {
  const _isExpanded = useSidebar((s) => s.isExpanded);
  const state = useSidebar((s) => s.state);
  const setState = useSidebar((s) => s.setState);

  const getNextState = (
    current: "collapsed" | "open" | "pinned" | "locked"
  ) => {
    switch (current) {
      case "collapsed":
        return "pinned";
      case "pinned":
        return "locked";
      case "locked":
        return "collapsed"; // unpin/collapse
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
      default:
        return PanelLeftClose;
    }
  })();

  return (
    <Button
      aria-label={`${currentLabel}. Click to cycle state.`}
      data-testid="sidebar"
      icon={CurrentIcon}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      size="icon"
      variant="ghost"
    />
  );
};

export default SidebarSettings;
