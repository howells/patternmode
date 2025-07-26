"use client";

import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from "./sidebar";

export function Example() {
  return (
    <div className="h-96 w-64 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-900">
      <Sidebar>
        <SidebarHeader>
          <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Patternmode
          </div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            Component Library
          </div>
        </SidebarHeader>

        <SidebarBody>
          <SidebarGroup level={1}>
            <SidebarItem href="#overview" current>
              <SidebarLabel>Overview</SidebarLabel>
            </SidebarItem>
            <SidebarItem href="#components">
              <SidebarLabel>Components</SidebarLabel>
            </SidebarItem>
            <SidebarItem href="#examples">
              <SidebarLabel>Examples</SidebarLabel>
            </SidebarItem>
          </SidebarGroup>

          <SidebarGroup title="Resources" level={1}>
            <SidebarItem href="#documentation">
              <SidebarLabel>Documentation</SidebarLabel>
            </SidebarItem>
            <SidebarItem href="#themes">
              <SidebarLabel>Themes</SidebarLabel>
            </SidebarItem>
            <SidebarItem href="#changelog">
              <SidebarLabel>Changelog</SidebarLabel>
            </SidebarItem>
          </SidebarGroup>

          <SidebarGroup title="Tools" level={1}>
            <SidebarItem href="#playground">
              <SidebarLabel>Playground</SidebarLabel>
            </SidebarItem>
            <SidebarItem href="#inspector">
              <SidebarLabel>Inspector</SidebarLabel>
            </SidebarItem>
          </SidebarGroup>
        </SidebarBody>

        <SidebarFooter>
          <SidebarGroup level={1}>
            <SidebarItem href="#account">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs text-white font-medium">
                  U
                </div>
                <SidebarLabel>User Account</SidebarLabel>
              </div>
            </SidebarItem>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
