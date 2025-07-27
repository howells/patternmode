"use client";

import React from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from "./sidebar";

export function DefaultExample() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="text-lg font-semibold">My App</div>
      </SidebarHeader>
      <SidebarBody>
        <SidebarGroup level={1}>
          <SidebarItem href="#dashboard" current>
            <SidebarLabel>Dashboard</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="#projects">
            <SidebarLabel>Projects</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="#team">
            <SidebarLabel>Team</SidebarLabel>
          </SidebarItem>
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
          <SidebarItem href="#home">
            <SidebarLabel>Home</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="#analytics" current>
            <SidebarLabel>Analytics</SidebarLabel>
          </SidebarItem>
        </SidebarGroup>
        <SidebarGroup level={1}>
          <SidebarItem href="#settings">
            <SidebarLabel>Settings</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="#help">
            <SidebarLabel>Help</SidebarLabel>
          </SidebarItem>
        </SidebarGroup>
      </SidebarBody>
      <SidebarFooter>
        <SidebarGroup level={1}>
          <SidebarItem href="#profile">
            <SidebarLabel>John Doe</SidebarLabel>
          </SidebarItem>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
