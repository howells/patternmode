"use client";

/**
 * Inspector Components.
 *
 * A side panel component system for displaying detailed information, properties,
 * or controls related to selected content. Similar to sidebar components but
 * specifically designed for inspection and detail views.
 *
 * Features:
 * - Fixed-width side panel layout
 * - Toggleable overlay mode for mobile devices
 * - Smooth slide-in/out animations
 * - Structured header, body, and section organization
 * - Built-in ScrollArea with automatic overflow handling
 * - Flexible height that adapts to container
 * - Custom styled scrollbars with hover effects
 * - Responsive border and background styling
 * - Dark mode support
 * - Flexible content organization
 * - Floating toggle button with customizable positioning.
 *
 * @example
 * ```tsx
 * // Static inspector panel (desktop)
 * <Inspector>
 *   <InspectorHeader>
 *     <h2>Properties</h2>
 *   </InspectorHeader>
 *   <InspectorBody>
 *     <InspectorSection>
 *       <InspectorGroup>
 *         <label>Width</label>
 *         <input type="number" value={width} />
 *       </InspectorGroup>
 *     </InspectorSection>
 *   </InspectorBody>
 * </Inspector>
 *
 * // Toggleable inspector with responsive behavior
 * const [isOpen, setIsOpen] = useState(false);
 *
 * // Desktop: Static sidebar
 * <div className="hidden lg:block">
 *   <Inspector>
 *     <InspectorBody>Content</InspectorBody>
 *   </Inspector>
 * </div>
 *
 * // Mobile: Toggleable overlay
 * <Inspector isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} asOverlay>
 *   <InspectorBody>Content</InspectorBody>
 * </Inspector>
 *
 * // Toggle button
 * <InspectorToggle isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
 *
 * // Design tool inspector
 * <Inspector>
 *   <InspectorHeader>
 *     <div className="flex items-center gap-2">
 *       <PaintBrush className="w-4 h-4" />
 *       <span>Element Inspector</span>
 *     </div>
 *   </InspectorHeader>
 *   <InspectorBody>
 *     <InspectorSection>
 *       <h3>Layout</h3>
 *       <InspectorGroup>
 *         <label>Display</label>
 *         <select value={display}>
 *           <option value="block">Block</option>
 *           <option value="flex">Flex</option>
 *         </select>
 *       </InspectorGroup>
 *     </InspectorSection>
 *
 *     <InspectorSection>
 *       <h3>Typography</h3>
 *       <InspectorGroup>
 *         <label>Font Size</label>
 *         <input type="range" min="12" max="48" value={fontSize} />
 *       </InspectorGroup>
 *     </InspectorSection>
 *   </InspectorBody>
 * </Inspector>
 *
 * // File properties inspector
 * <Inspector>
 *   <InspectorHeader>
 *     <h2>File Details</h2>
 *   </InspectorHeader>
 *   <InspectorBody>
 *     <InspectorSection>
 *       <InspectorGroup>
 *         <dt>Name</dt>
 *         <dd>document.pdf</dd>
 *       </InspectorGroup>
 *       <InspectorGroup>
 *         <dt>Size</dt>
 *         <dd>2.4 MB</dd>
 *       </InspectorGroup>
 *       <InspectorGroup>
 *         <dt>Modified</dt>
 *         <dd>Oct 15, 2023</dd>
 *       </InspectorGroup>
 *     </InspectorSection>
 *   </InspectorBody>
 * </Inspector>
 * ```
 */

import { Settings, X } from "lucide-react";
import React from "react";

import { config } from "../../lib/config";
import { cx } from "../../lib/utils";
import { ScrollArea } from "../scroll-area/scroll-area";

/**
 * Root inspector component providing the main panel container.
 *
 * Creates a toggleable side panel that slides in from the right with proper borders
 * and background styling. Can be used as a static panel or as a toggleable overlay.
 *
 * @param className - Additional CSS classes.
 * @param isOpen - Whether the inspector is open (for toggleable mode).
 * @param onToggle - Callback to toggle the inspector state.
 * @param asOverlay - Whether to render as an overlay that slides over content.
 * @param props - Additional HTML aside element props.
 *
 * @component
 * @example
 * ```tsx
 * // Static inspector (original behavior)
 * <Inspector>
 *   <InspectorHeader>Inspector Title</InspectorHeader>
 *   <InspectorBody>Inspector content here</InspectorBody>
 * </Inspector>
 *
 * // Toggleable overlay inspector
 * <Inspector
 *   isOpen={isInspectorOpen}
 *   onToggle={setIsInspectorOpen}
 *   asOverlay
 * >
 *   <InspectorHeader>Toggleable Inspector</InspectorHeader>
 *   <InspectorBody>Content</InspectorBody>
 * </Inspector>
 * ```
 */
/**
 * Inspector.
 *
 * @component
 * @id inspector
 * @name Inspector
 */
/**
 * Development tool component for inspecting and debugging component properties.
 *
 * @id inspector
 * @name Inspector
 * @icon Settings
 * @category utility
 * @component
 * @param props - Component properties.
 */
export function Inspector({
  className,
  isOpen,
  onToggle,
  asOverlay = false,
  ...props
}: React.ComponentPropsWithoutRef<"aside"> & {
  isOpen?: boolean;
  onToggle?: () => void;
  asOverlay?: boolean;
}) {
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

/**
 * Inspector header component for titles and controls.
 *
 * Provides a fixed header area at the top of the inspector panel.
 * Typically contains titles, close buttons, or other header controls
 * with proper spacing and border separation.
 *
 * @param className - Additional CSS classes.
 * @param props - Additional HTML div element props.
 *
 * @component
 * @example
 * ```tsx
 * // Simple header
 * <InspectorHeader>
 *   <h2>Properties</h2>
 * </InspectorHeader>
 *
 * // Header with controls
 * <InspectorHeader>
 *   <div className="flex items-center justify-between">
 *     <h2>Element Inspector</h2>
 *     <button>✕</button>
 *   </div>
 * </InspectorHeader>
 *
 * // Header with icon
 * <InspectorHeader>
 *   <div className="flex items-center gap-2">
 *     <Settings className="w-4 h-4" />
 *     <span>Settings</span>
 *   </div>
 * </InspectorHeader>
 * ```
 */
export function InspectorHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
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

/**
 * Inspector body component for main scrollable content.
 *
 * Provides the main content area of the inspector with automatic scrolling
 * when content overflows. Uses ScrollArea internally for consistent styling
 * and behavior. The inspector fills its container height and scrolls when
 * content exceeds the available space. Includes a gradient indicator at the
 * bottom to show when there's more content to scroll.
 *
 * @param className - Additional CSS classes for the content wrapper.
 * @param props - Additional HTML div element props.
 *
 * @component
 * @example
 * ```tsx
 * // Basic body with automatic scrolling
 * <InspectorBody>
 *   <InspectorSection>
 *     Content sections here
 *   </InspectorSection>
 * </InspectorBody>
 *
 * // Body with custom content padding
 * <InspectorBody className="space-y-4">
 *   {longListOfItems.map(item => (
 *     <InspectorSection key={item.id}>
 *       {item.content}
 *     </InspectorSection>
 *   ))}
 * </InspectorBody>
 * ```
 */
export function InspectorBody({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
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
    if (!viewport) { return; }

    const { scrollTop, scrollHeight, clientHeight } = viewport;
    const isScrollable = scrollHeight > clientHeight;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5; // 5px threshold

    setShowGradient(isScrollable && !isAtBottom);
  }, []);

  // Manual scroll event handling since we need to target a specific element
  React.useEffect(() => {
    if (typeof document === "undefined") { return; }

    const viewport = document.querySelector(
      ".scroll-viewport",
    ) as HTMLDivElement;
    if (!viewport) { return; }

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

/**
 * Inspector section component for organizing related content.
 *
 * Groups related inspector content with consistent vertical spacing.
 * Typically contains multiple inspector groups or related form controls
 * with semantic organization.
 *
 * @param className - Additional CSS classes.
 * @param props - Additional HTML div element props.
 *
 * @component
 * @example
 * ```tsx
 * // Basic section
 * <InspectorSection>
 *   <h3>Layout Properties</h3>
 *   <InspectorGroup>
 *     <label>Width</label>
 *     <input type="number" />
 *   </InspectorGroup>
 * </InspectorSection>
 *
 * // Multiple sections
 * <InspectorBody>
 *   <InspectorSection>
 *     <h3>Dimensions</h3>
 *     <!-- dimension controls -->
 *   </InspectorSection>
 *   <InspectorSection>
 *     <h3>Appearance</h3>
 *     <!-- appearance controls -->
 *   </InspectorSection>
 * </InspectorBody>
 *
 * // Section with custom spacing
 * <InspectorSection className="space-y-4">
 *   Content with larger spacing
 * </InspectorSection>
 * ```
 */
export function InspectorSection({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
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

/**
 * Inspector group component for form control groupings.
 *
 * Provides tight spacing for related form elements like labels and inputs.
 * Used within inspector sections to create logical groupings of controls
 * with consistent vertical rhythm.
 *
 * @param className - Additional CSS classes.
 * @param props - Additional HTML div element props.
 *
 * @component
 * @example
 * ```tsx
 * // Basic form group
 * <InspectorGroup>
 *   <label>Button Text</label>
 *   <input type="text" value={buttonText} />
 * </InspectorGroup>
 *
 * // Multiple groups
 * <InspectorSection>
 *   <InspectorGroup>
 *     <label>Width</label>
 *     <input type="number" value={width} />
 *   </InspectorGroup>
 *   <InspectorGroup>
 *     <label>Height</label>
 *     <input type="number" value={height} />
 *   </InspectorGroup>
 * </InspectorSection>
 *
 * // Group with description list
 * <InspectorGroup>
 *   <dt className="font-medium">File Size</dt>
 *   <dd className="text-sm text-zinc-600">2.4 MB</dd>
 * </InspectorGroup>
 *
 * // Group with complex controls
 * <InspectorGroup>
 *   <label>Color</label>
 *   <div className="flex items-center gap-2">
 *     <input type="color" value={color} />
 *     <input type="text" value={color} placeholder="#000000" />
 *   </div>
 * </InspectorGroup>
 * ```
 */
export function InspectorGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
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

/**
 * Toggle button for opening/closing the inspector panel.
 *
 * Provides a floating action button that can be positioned anywhere to trigger
 * the inspector panel. Shows different icons based on the inspector state.
 *
 * @param isOpen - Whether the inspector is currently open.
 * @param onToggle - Callback to toggle the inspector state.
 * @param className - Additional CSS classes.
 * @param position - Positioning classes (defaults to fixed bottom-right).
 *
 * @component
 * @example
 * ```tsx
 * // Default floating toggle button
 * <InspectorToggle
 *   isOpen={isInspectorOpen}
 *   onToggle={() => setIsInspectorOpen(!isInspectorOpen)}
 * />
 *
 * // Custom positioned toggle
 * <InspectorToggle
 *   isOpen={isInspectorOpen}
 *   onToggle={() => setIsInspectorOpen(!isInspectorOpen)}
 *   position="fixed top-4 right-4"
 * />
 *
 * // Inline toggle button
 * <InspectorToggle
 *   isOpen={isInspectorOpen}
 *   onToggle={() => setIsInspectorOpen(!isInspectorOpen)}
 *   position="relative"
 * />
 * ```
 */
export function InspectorToggle({
  isOpen,
  onToggle,
  className,
  position = "fixed bottom-6 right-6 lg:hidden",
  ...props
}: {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
  position?: string;
} & React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
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
