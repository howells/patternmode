import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";

type AppShellVariant = "bordered" | "framed";

/** Edge style for the sidebar divider. */
type SidebarEdge = "border" | "shadow" | "card" | "none";

interface AppShellProps extends React.ComponentProps<"div"> {
  /** Layout variant.
   * - `"bordered"` — white sidebar, content fills remaining space (Linear, Slack style)
   * - `"framed"` — muted background, sidebar floats on bg, content in a raised white card frame (Medusa, Vercel style)
   */
  variant?: AppShellVariant;
}

interface AppShellSidebarProps extends React.ComponentProps<"div"> {
  /** Width class (e.g., "w-52", "w-60"). Applied directly as className. */
  width?: string;
  /** Edge divider style between sidebar and content.
   * - `"shadow"` (default) — subtle 1px shadow edge, softer than a border
   * - `"border"` — traditional 1px CSS border
   * - `"card"` — sidebar renders as a raised card with shadow-borders-base
   * - `"none"` — no divider (sidebar floats on background)
   */
  edge?: SidebarEdge;
}

const EDGE_CLASSES: Record<SidebarEdge, string> = {
  shadow: "shadow-[1px_0_0_0_rgba(0,0,0,0.06)]",
  border: "border-r border-border",
  card: "m-2 rounded-lg shadow-borders-base",
  none: "",
};

/**
 * App shell layout with configurable sidebar style.
 *
 * @example
 * ```tsx
 * <AppShell variant="bordered">
 *   <AppShellSidebar width="w-56" edge="shadow">
 *     <MenuItem>Overview</MenuItem>
 *   </AppShellSidebar>
 *   <AppShellContent>
 *     <h1>Dashboard</h1>
 *   </AppShellContent>
 * </AppShell>
 * ```
 */
function AppShell({
  variant = "bordered",
  className,
  ...props
}: AppShellProps) {
  return (
    <div
      className={cn(
        "flex h-screen overflow-hidden",
        variant === "framed" && "bg-muted/50",
        className,
      )}
      data-component="app-shell"
      data-variant={variant}
      {...props}
    />
  );
}

/** Sidebar panel within an AppShell. */
function AppShellSidebar({
  width = "w-52",
  edge = "shadow",
  className,
  ...props
}: AppShellSidebarProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-col overflow-hidden",
        width,
        // In bordered mode: white bg + chosen edge style
        // In framed mode: transparent, sits on muted bg (no edge)
        "[[data-variant=bordered]>&]:bg-card",
        EDGE_CLASSES[edge],
        className,
      )}
      data-slot="app-shell-sidebar"
      {...props}
    />
  );
}

/** Main content area within an AppShell. In framed mode, renders as a raised card panel. */
function AppShellContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col overflow-hidden bg-background",
        // In framed mode: white card with border and rounded corners
        "[[data-variant=framed]>&]:my-2 [[data-variant=framed]>&]:mr-2 [[data-variant=framed]>&]:overflow-hidden [[data-variant=framed]>&]:rounded-lg [[data-variant=framed]>&]:border [[data-variant=framed]>&]:border-border [[data-variant=framed]>&]:bg-card",
        className,
      )}
      data-slot="app-shell-content"
      {...props}
    />
  );
}

export { AppShell, AppShellContent, AppShellSidebar };
