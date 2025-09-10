"use client";

import { cx } from "@patternmode/utils/cx";
import React, { useRef } from "react";
import { useWindowSize } from "usehooks-ts";
import { useSidebar } from "../sidebar-store";
import type { SidebarProps } from "../types";
import { sidebarVariants } from "../variants";
import { SidebarMobile } from "./sidebar-mobile";
import { SidebarOverlay } from "./sidebar-overlay";
import SidebarSettings from "./sidebar-settings";

// Individual Base UI Component Exports with patternmode styling
// These are re-exports for consistency with combobox pattern
export { SidebarContent } from "./sidebar-content";
export { SidebarFooter } from "./sidebar-footer";
export { SidebarGroup } from "./sidebar-group";
export { SidebarGroupLabel } from "./sidebar-group-label";
export { SidebarHeader } from "./sidebar-header";
export { SidebarItem } from "./sidebar-item";
export { SidebarMobile } from "./sidebar-mobile";
export { SidebarSeparator } from "./sidebar-separator";
export { default as SidebarSettings } from "./sidebar-settings";

// Compound Sidebar Component (main implementation)
const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      children,
      className,
      expandOnHover = true,
      defaultState,
      onStateChange,
      size = "base",
      ...props
    },
    ref
  ) => {
    // Subscribe to specific state slices for optimal performance
    const state = useSidebar((s) => s.state);
    const _isHovering = useSidebar((s) => s.isHovering);
    const isMobile = useSidebar((s) => s.isMobile);
    const isExpanded = useSidebar((s) => s.isExpanded);
    const isHydrated = useSidebar((s) => s.isHydrated);
    const setState = useSidebar((s) => s.setState);
    const setHovering = useSidebar((s) => s.setHovering);
    const setMobile = useSidebar((s) => s.setMobile);

    // Set initial state if provided
    React.useEffect(() => {
      if (defaultState && isHydrated) {
        setState(defaultState);
      }
    }, [defaultState, isHydrated, setState]);

    // Notify parent of state changes
    React.useEffect(() => {
      if (onStateChange && isHydrated) {
        onStateChange(state);
      }
    }, [state, onStateChange, isHydrated]);

    // Set mobile state on mount and resize
    const { width } = useWindowSize();
    React.useEffect(() => {
      const mobile = width !== null && width < 1024;
      setMobile(mobile);
    }, [width, setMobile]);

    // Hover intent with delays to avoid accidental triggers
    const openDelay = 200; // ms
    const closeDelay = 150; // ms
    const openTimeout = useRef<number | null>(null);
    const closeTimeout = useRef<number | null>(null);

    React.useEffect(() => {
      return () => {
        if (openTimeout.current) window.clearTimeout(openTimeout.current);
        if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
      };
    }, []);

    const isHoverDisabled =
      !expandOnHover || state === "pinned" || state === "locked";

    const onMouseEnter = () => {
      if (isHoverDisabled) return;
      if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
      if (openTimeout.current) window.clearTimeout(openTimeout.current);
      openTimeout.current = window.setTimeout(() => {
        setHovering(true);
      }, openDelay);
    };

    const onMouseLeave = () => {
      if (isHoverDisabled) return;
      if (openTimeout.current) window.clearTimeout(openTimeout.current);
      if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
      closeTimeout.current = window.setTimeout(() => {
        setHovering(false);
      }, closeDelay);
    };

    if (isMobile) {
      return (
        <SidebarMobile>
          <div className="flex h-full flex-col">
            {children}
            {/* Sidebar Controls - positioned at bottom */}
            <div className="mt-auto border-t p-2.5">
              <SidebarSettings />
            </div>
          </div>
        </SidebarMobile>
      );
    }

    return (
      <>
        <nav
          className={cx(
            sidebarVariants({ size, state }),
            // When hovering in collapsed state, expand width visually
            state === "collapsed" &&
              isExpanded &&
              "w-[var(--sidebar-open-width)]",
            className,
            // Force white surface when expanded, overriding any external bg class
            isExpanded && "bg-white dark:bg-zinc-900"
          )}
          data-testid="sidebar"
          onPointerEnter={onMouseEnter}
          // Do not set aria-expanded on nav; apply hover props without aria-expanded
          onPointerLeave={onMouseLeave}
          ref={ref}
          {...props}
        >
          <div className="flex h-full flex-col">
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
);

Sidebar.displayName = "Sidebar";

export { Sidebar };
