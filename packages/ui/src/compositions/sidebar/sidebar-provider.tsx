"use client";

import { TooltipProvider } from "@patternmode/ui/components/tooltip";
import { useIsMobile } from "@patternmode/ui/hooks/use-mobile";
import { cn } from "@patternmode/ui/utils/cn";
import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  HEADER_HEIGHT,
  SIDEBAR_COOKIE_MAX_AGE,
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_KEYBOARD_SHORTCUT,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON,
} from "./sidebar-constants";

interface SidebarContextProps {
  /** Whether the sidebar has completed initial hydration (for animation control) */
  hasHydrated: boolean;
  /** Is mobile */
  isMobile: boolean;
  /** Whether open */
  open: boolean;
  /** Whether open */
  openMobile: boolean;
  /** Set open */
  setOpen: (open: boolean) => void;
  /** Set open mobile */
  setOpenMobile: (open: boolean) => void;
  state: "expanded" | "collapsed";
  /** Toggle sidebar */
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | null>(null);

/**
 * useSidebar React hook.
 * Import from "@patternmode/ui/compositions/sidebar".
 */
export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

/**
 * SidebarProvider UI component.
 * Import from "@patternmode/ui/compositions/sidebar".
 */
export function SidebarProvider({
  defaultOpen = true,
  /** Whether open */
  open: openProp,
  /** Open state change handler */
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  /** Default open */
  defaultOpen?: boolean;
  /** Whether open */
  open?: boolean;
  /** Open state change handler */
  onOpenChange?: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  // Mark as hydrated after initial mount to control animations
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = useCallback(
    (next: boolean | ((prev: boolean) => boolean)) => {
      const openState =
        typeof next === "function"
          ? (next as (p: boolean) => boolean)(open)
          : next;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      if ("cookieStore" in window) {
        window.cookieStore
          .set({
            name: SIDEBAR_COOKIE_NAME,
            value: String(openState),
            path: "/",
            expires: Date.now() + SIDEBAR_COOKIE_MAX_AGE * 1000,
            sameSite: "lax",
          })
          .catch(() => undefined);
      }
    },
    [setOpenProp, open],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = useCallback(
    () =>
      isMobile ? setOpenMobile((prev) => !prev) : setOpen((prev) => !prev),
    [isMobile, setOpen],
  );

  // Adds a keyboard shortcut to toggle the sidebar.
  useEffect(() => {
    // Make header height available to portaled UI (sidepanel, dialogs, etc.).
    document.documentElement.style.setProperty(
      "--header-height",
      HEADER_HEIGHT,
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";

  const contextValue = useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
      hasHydrated,
    }),
    [state, open, setOpen, isMobile, openMobile, toggleSidebar, hasHydrated],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          className={cn(
            "group/sidebar-wrapper flex min-h-svh w-full overflow-visible has-data-[variant=inset]:bg-muted",
            className,
          )}
          data-component="sidebar-wrapper"
          data-slot="sidebar-wrapper"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              "--header-height": HEADER_HEIGHT,
              ...style,
            } as React.CSSProperties
          }
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}
