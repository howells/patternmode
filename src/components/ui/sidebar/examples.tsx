"use client";

import React from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
} from "@patternmode/ui";

export function DefaultExample() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="text-lg font-semibold">My App</div>
      </SidebarHeader>
      <SidebarBody>
        <SidebarGroup level={1}>
          <SidebarItem href="#dashboard" current>
            Dashboard
          </SidebarItem>
          <SidebarItem href="#projects">Projects</SidebarItem>
          <SidebarItem href="#team">Team</SidebarItem>
        </SidebarGroup>
      </SidebarBody>
    </Sidebar>
  );
}

export function WithSubmenuExample() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="text-lg font-semibold">Workspace</div>
        <div className="text-sm text-zinc-500">Team Alpha</div>
      </SidebarHeader>
      <SidebarBody>
        <SidebarGroup level={1}>
          <SidebarItem href="#home">Home</SidebarItem>
          <SidebarItem href="#analytics" current>
            Analytics
          </SidebarItem>
        </SidebarGroup>
        <SidebarGroup level={1}>
          <SidebarItem href="#settings">Settings</SidebarItem>
          <SidebarItem href="#help">Help</SidebarItem>
        </SidebarGroup>
      </SidebarBody>
      <SidebarFooter>
        <SidebarGroup level={1}>
          <SidebarItem href="#profile">John Doe</SidebarItem>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
