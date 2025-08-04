"use client";

import { Settings, X } from "lucide-react";
import React from "react";

import { config } from "../../lib/config";
import { cx } from "../../lib/utils";
import { ScrollArea } from "../scroll-area";

type InspectorProps = React.ComponentPropsWithoutRef<"aside"> & {
  /**
   * Whether the inspector is open (for toggleable mode).
   * When undefined, the inspector renders as a static panel.
   */
  isOpen?: boolean;

  /**
   * Callback to toggle the inspector state.
   * Required when isOpen is provided for toggleable functionality.
   */
  onToggle?: () => void;

  /**
   * Whether to render as an overlay that slides over content.
   * When true, the inspector becomes a toggleable overlay panel with backdrop.
   * When false, renders as a static side panel.
   */
  asOverlay?: boolean;
};

/**
 * Development tool component for inspecting and debugging component properties.
 *
 * A side panel component system for displaying detailed information, properties,
 * or controls related to selected content. Features toggleable overlay mode for
 * mobile devices, smooth slide-in/out animations, and structured content organization.
 *
 * @param props - Component properties.
 * @param props.isOpen - Whether the inspector is open (for toggleable mode).
 * @param props.onToggle - Callback to toggle the inspector state.
 * @param props.asOverlay - Whether to render as an overlay that slides over content.
 * @param props.className - Additional CSS classes.
 */
export function Inspector({
  className,
  isOpen,
  onToggle,
  asOverlay = false,
  ...props
}: InspectorProps) {
  // If not toggleable, render as static panel (original behavior)
  if (!asOverlay && isOpen === undefined) {
    return (
      <aside
        className={cx(
          // Base layout
          "flex h-full w-80 flex-shrink-0 flex-col",
          // Border and background
          "border-l border-zinc-200 bg-zinc-50/50",
          "dark:border-zinc-800 dark:bg-zinc-900/50",
          className,
        )}
        {...props}
      />
    );
  }

  // Toggleable overlay mode
  return (
    <>
      {/* Backdrop */}
      {asOverlay && isOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Inspector Panel */}
      <aside
        className={cx(
          // Base layout
          "flex h-full w-80 flex-shrink-0 flex-col",
          // Border and background
          "border-l border-zinc-200 bg-zinc-50/50",
          "dark:border-zinc-800 dark:bg-zinc-900/50",
          // Overlay positioning and animation
          asOverlay && [
            "fixed right-0 top-0 z-50 shadow-xl",
            "transform transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "translate-x-full",
            // On larger screens, show as static sidebar
            "lg:relative lg:translate-x-0 lg:shadow-none",
          ],
          className,
        )}
        {...props}
      />
    </>
  );
}

type InspectorHeaderProps = React.ComponentPropsWithoutRef<"div">;

/**
 * Inspector header component for titles and controls.
 */
export function InspectorHeader({
  className,
  ...props
}: InspectorHeaderProps) {
  return (
    <div
      className={cx(
        // Base layout
        "flex flex-shrink-0 items-center justify-between px-6 py-6",
        // Border
        "border-b border-zinc-200 dark:border-zinc-800",
        className,
      )}
      {...props}
    />
  );
}

type InspectorBodyProps = React.ComponentPropsWithoutRef<"div">;

/**
 * Inspector body component for main scrollable content.
 */
export function InspectorBody({
  className,
  ...props
}: InspectorBodyProps) {
  const [showGradient, setShowGradient] = React.useState(true);
  const viewportRef = React.useRef<HTMLDivElement>(null);

  // Check if content is scrollable and not at bottom
  const checkScrollable = React.useCallback(() => {
    // Find the viewport element by class selector (fallback if ref not available)
    const viewport
      = viewportRef.current
        || (typeof document !== "undefined"
          ? (document.querySelector(".scroll-viewport") as HTMLDivElement)
          : null);
    if (!viewport) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = viewport;
    const isScrollable = scrollHeight > clientHeight;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;

    setShowGradient(isScrollable && !isAtBottom);
  }, []);

  // Manual scroll event handling since we need to target a specific element
  React.useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const viewport = document.querySelector(
      ".scroll-viewport",
    ) as HTMLDivElement;
    if (!viewport) {
      return;
    }

    viewport.addEventListener("scroll", checkScrollable);
    return () => viewport.removeEventListener("scroll", checkScrollable);
  }, [checkScrollable]);

  React.useEffect(() => {
    // Check initially with a small delay to ensure content is rendered
    const timer = setTimeout(checkScrollable, 100);

    // Check on resize (content changes) using ResizeObserver
    if (typeof document === "undefined") {
      return () => clearTimeout(timer);
    }

    const viewport = document.querySelector(
      ".scroll-viewport",
    ) as HTMLDivElement;
    if (viewport) {
      const resizeObserver = new ResizeObserver(checkScrollable);
      resizeObserver.observe(viewport);

      return () => {
        clearTimeout(timer);
        resizeObserver.disconnect();
      };
    }

    return () => clearTimeout(timer);
  }, [checkScrollable]);

  return (
    <div className="flex-1 min-h-0 relative">
      <ScrollArea className="h-full" viewportClassName="scroll-viewport">
        <div
          className={cx(
            // Content padding and spacing
            "px-6 py-6",
            className,
          )}
          {...props}
        />
      </ScrollArea>

      {/* Bottom gradient indicator */}
      {showGradient && (
        <div
          className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(249, 250, 251, 0.5) 50%, rgba(249, 250, 251, 0.95) 100%)",
          }}
        />
      )}

      {/* Dark mode gradient */}
      {showGradient && (
        <div
          className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none dark:block hidden z-10"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(24, 24, 27, 0.5) 50%, rgba(24, 24, 27, 0.95) 100%)",
          }}
        />
      )}
    </div>
  );
}

type InspectorSectionProps = React.ComponentPropsWithoutRef<"div">;

/**
 * Inspector section component for organizing related content.
 */
export function InspectorSection({
  className,
  ...props
}: InspectorSectionProps) {
  return (
    <div
      className={cx(
        // Base layout
        "space-y-6",
        className,
      )}
      {...props}
    />
  );
}

type InspectorGroupProps = React.ComponentPropsWithoutRef<"div">;

/**
 * Inspector group component for form control groupings.
 */
export function InspectorGroup({
  className,
  ...props
}: InspectorGroupProps) {
  return (
    <div
      className={cx(
        // Base layout for form groups
        "space-y-2",
        className,
      )}
      {...props}
    />
  );
}

type InspectorToggleProps = {
  /**
   * Whether the inspector is currently open.
   * Controls the icon displayed and accessibility labels.
   */
  isOpen: boolean;

  /**
   * Callback to toggle the inspector state.
   * Called when the toggle button is clicked.
   */
  onToggle: () => void;

  /**
   * Positioning classes for the toggle button.
   * Defaults to fixed bottom-right positioning hidden on large screens.
   */
  position?: string;
} & React.ComponentPropsWithoutRef<"button">;

/**
 * Toggle button for opening/closing the inspector panel.
 */
export function InspectorToggle({
  isOpen,
  onToggle,
  className,
  position = "fixed bottom-6 right-6 lg:hidden",
  ...props
}: InspectorToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cx(
        // Base button styling
        "flex items-center justify-center w-12 h-12 rounded-full",
        "bg-white dark:bg-zinc-800 shadow-lg border border-zinc-200 dark:border-zinc-700",
        // Hover and focus states
        "hover:bg-zinc-50 dark:hover:bg-zinc-700",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        "dark:focus:ring-offset-zinc-900",
        // Transitions
        "transition-all duration-200 ease-in-out",
        // Active state
        "active:scale-95",
        // Positioning
        position,
        // Z-index to appear above content
        "z-30",
        className,
      )}
      aria-label={isOpen ? "Close inspector" : "Open inspector"}
      {...props}
    >
      {isOpen
        ? (
            <X
              className="w-5 h-5 text-zinc-600 dark:text-zinc-400"
              strokeWidth={config.getIconStrokeWidth()}
            />
          )
        : (
            <Settings
              className="w-5 h-5 text-zinc-600 dark:text-zinc-400"
              strokeWidth={config.getIconStrokeWidth()}
            />
          )}
    </button>
  );
}

export type {
  InspectorBodyProps,
  InspectorGroupProps,
  InspectorHeaderProps,
  InspectorProps,
  InspectorSectionProps,
  InspectorToggleProps,
};
