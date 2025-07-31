"use client";

import { cx } from "@/lib/utils";
import { useState } from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
} from "@patternmode/ui";

export function Example() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="h-96 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-900 flex">
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        showToggle={true}
      >
        <SidebarHeader isCollapsed={isCollapsed}>
          <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {isCollapsed ? "PM" : "Patternmode"}
          </div>
          {!isCollapsed && (
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              Component Library
            </div>
          )}
        </SidebarHeader>

        <SidebarBody isCollapsed={isCollapsed}>
          <SidebarGroup level={1} isCollapsed={isCollapsed}>
            <SidebarItem href="#overview" current isCollapsed={isCollapsed}>
              Overview
            </SidebarItem>
            <SidebarItem href="#components" isCollapsed={isCollapsed}>
              Components
            </SidebarItem>
            <SidebarItem href="#examples" isCollapsed={isCollapsed}>
              Examples
            </SidebarItem>
          </SidebarGroup>

          <SidebarGroup title="Resources" level={1} isCollapsed={isCollapsed}>
            <SidebarItem href="#documentation" isCollapsed={isCollapsed}>
              Documentation
            </SidebarItem>
            <SidebarItem href="#themes" isCollapsed={isCollapsed}>
              Themes
            </SidebarItem>
            <SidebarItem href="#changelog" isCollapsed={isCollapsed}>
              Changelog
            </SidebarItem>
          </SidebarGroup>

          <SidebarGroup title="Tools" level={1} isCollapsed={isCollapsed}>
            <SidebarItem href="#playground" isCollapsed={isCollapsed}>
              Playground
            </SidebarItem>
            <SidebarItem href="#inspector" isCollapsed={isCollapsed}>
              Inspector
            </SidebarItem>
          </SidebarGroup>
        </SidebarBody>

        <SidebarFooter isCollapsed={isCollapsed}>
          <SidebarGroup level={1} isCollapsed={isCollapsed}>
            <SidebarItem href="#account" isCollapsed={isCollapsed}>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs text-white font-medium">
                  U
                </div>
                <span
                  className={cx(
                    "truncate transition-opacity duration-200",
                    isCollapsed && "opacity-0 w-0 overflow-hidden"
                  )}
                >
                  User Account
                </span>
              </div>
            </SidebarItem>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>

      {/* Content area to show the layout effect */}
      <div className="flex-1 p-4 bg-zinc-50 dark:bg-zinc-800">
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          Content area - resize with sidebar
        </div>
      </div>
    </div>
  );
}
