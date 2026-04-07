"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type React from "react";
import { SidebarTrigger } from "./sidebar-trigger";

/**
 * SidebarLayout UI component.
 * Import from "@patternmode/ui/compositions/sidebar".
 */
export function SidebarLayout({
  children,
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      className={cn("flex min-h-svh w-full flex-col", className)}
      {...props}
    >
      {/* Mobile top bar with right-aligned trigger */}
      <div className="sticky top-0 z-20 flex h-12 items-center justify-end border-b bg-background px-3 md:hidden">
        <SidebarTrigger />
      </div>
      {/* Rounded gray content area */}
      <div className="flex-1 bg-background">{children}</div>
    </main>
  );
}
