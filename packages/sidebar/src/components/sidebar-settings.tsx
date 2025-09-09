"use client";

import { Button } from "@patternmode/button";
import { Lock, PanelLeftClose, PanelLeftOpen, Pin } from "lucide-react";
import React from "react";
import { useSidebar } from "../sidebar-store";
import type { SidebarSettingsProps } from "../types";

const SidebarSettings = React.forwardRef<
  HTMLButtonElement,
  SidebarSettingsProps
>(({ className, ...props }, ref) => {
  const _isExpanded = useSidebar((s) => s.isExpanded);
  const state = useSidebar((s) => s.state);
  const setState = useSidebar((s) => s.setState);

  const getNextState = (
    current: "collapsed" | "open" | "pinned" | "locked"
  ) => {
    // biome-ignore lint/nursery/noUnnecessaryConditions: Switch is necessary for state transitions
    switch (current) {
      case "collapsed":
        return "pinned";
      case "pinned":
        return "locked";
      case "locked":
        return "collapsed"; // unpin/collapse
      case "open":
        return "pinned"; // treat open like pinned in desktop flow
      default:
        return "collapsed";
    }
  };

  const handleClick = () => {
    const next = getNextState(state);
    setState(next);
  };

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
      className={className}
      data-testid="sidebar"
      icon={CurrentIcon}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      ref={ref}
      size="icon"
      variant="ghost"
      {...props}
    />
  );
});

SidebarSettings.displayName = "SidebarSettings";

export default SidebarSettings;
