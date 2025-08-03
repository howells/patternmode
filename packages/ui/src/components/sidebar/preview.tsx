"use client";

import type { SidebarProps } from "./component";
import React from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarGroup,
} from "./component";

export function SidebarExample(props: SidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h2 className="text-lg font-semibold">Navigation</h2>
      </SidebarHeader>
      <SidebarBody>
        <SidebarGroup>
          <SidebarItem href="#home">Home</SidebarItem>
          <SidebarItem href="#dashboard">Dashboard</SidebarItem>
          <SidebarItem href="#settings">Settings</SidebarItem>
        </SidebarGroup>
      </SidebarBody>
      <SidebarFooter>
        <div className="text-sm text-gray-500">© 2024 Company</div>
      </SidebarFooter>
    </Sidebar>
  );
}
