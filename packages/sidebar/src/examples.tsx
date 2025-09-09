"use client";

import {
  BarChart3,
  Calendar,
  FileText,
  Home,
  Inbox,
  MessageSquare,
  Search,
  Settings,
  User,
} from "lucide-react";
import React from "react";
import { Sidebar } from "./components/sidebar";
import { SidebarContent } from "./components/sidebar-content";
import { SidebarFooter } from "./components/sidebar-footer";
import { SidebarGroup } from "./components/sidebar-group";
import { SidebarGroupLabel } from "./components/sidebar-group-label";
import { SidebarHeader } from "./components/sidebar-header";
import { SidebarItem } from "./components/sidebar-item";
import { SidebarSeparator } from "./components/sidebar-separator";

export const DefaultExample = () => {
  return (
    <div className="flex h-96 w-full">
      <Sidebar>
        <SidebarHeader>
          <h2 className="font-semibold text-lg">My App</h2>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarItem id="ex1-home" icon={<Home />}>Home</SidebarItem>
            <SidebarItem id="ex1-search" icon={<Search />}>Search</SidebarItem>
            <SidebarItem id="ex1-inbox" icon={<Inbox />}>Inbox</SidebarItem>
            <SidebarItem id="ex1-cal" icon={<Calendar />}>Calendar</SidebarItem>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarItem id="ex1-profile" icon={<User />}>Profile</SidebarItem>
            <SidebarItem id="ex1-settings" icon={<Settings />}>Settings</SidebarItem>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="text-xs text-zinc-500">© 2024 My App</div>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 p-6">
        <h1 className="font-bold text-2xl">Main Content</h1>
        <p>This is the main content area with the sidebar.</p>
      </main>
    </div>
  );
};

export const CollapsedExample = () => {
  return (
    <div className="flex h-96 w-full">
      <Sidebar defaultState="collapsed">
        <SidebarHeader>
          <h2 className="font-semibold text-lg">My App</h2>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarItem id="ex2-home" icon={<Home />}>Home</SidebarItem>
            <SidebarItem id="ex2-search" icon={<Search />}>Search</SidebarItem>
            <SidebarItem id="ex2-inbox" icon={<Inbox />}>Inbox</SidebarItem>
            <SidebarItem id="ex2-cal" icon={<Calendar />}>Calendar</SidebarItem>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarItem id="ex2-profile" icon={<User />}>Profile</SidebarItem>
            <SidebarItem id="ex2-settings" icon={<Settings />}>Settings</SidebarItem>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="text-xs text-zinc-500">© 2024 My App</div>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 p-6">
        <h1 className="font-bold text-2xl">Main Content</h1>
        <p>The sidebar is collapsed by default and expands on hover.</p>
      </main>
    </div>
  );
};

export const PinnedExample = () => {
  return (
    <div className="flex h-96 w-full">
      <Sidebar defaultState="pinned">
        <SidebarHeader>
          <h2 className="font-semibold text-lg">My App</h2>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarItem id="ex3-home" icon={<Home />}>Home</SidebarItem>
            <SidebarItem id="ex3-search" icon={<Search />}>Search</SidebarItem>
            <SidebarItem id="ex3-inbox" icon={<Inbox />}>Inbox</SidebarItem>
            <SidebarItem id="ex3-cal" icon={<Calendar />}>Calendar</SidebarItem>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarItem id="ex3-profile" icon={<User />}>Profile</SidebarItem>
            <SidebarItem id="ex3-settings" icon={<Settings />}>Settings</SidebarItem>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="text-xs text-zinc-500">© 2024 My App</div>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 p-6">
        <h1 className="font-bold text-2xl">Main Content</h1>
        <p>The sidebar is pinned open and will push content aside.</p>
      </main>
    </div>
  );
};

export const WithActiveStatesExample = () => {
  const [activeItem, setActiveItem] = React.useState("home");

  return (
    <div className="flex h-96 w-full">
      <Sidebar>
        <SidebarHeader>
          <h2 className="font-semibold text-lg">Dashboard</h2>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Analytics</SidebarGroupLabel>
            <SidebarItem
              id="analytics"
              icon={<BarChart3 />}
              isActive={activeItem === "analytics"}
              onClick={() => setActiveItem("analytics")}
            >
              Analytics
            </SidebarItem>
            <SidebarItem
              id="reports"
              icon={<FileText />}
              isActive={activeItem === "reports"}
              onClick={() => setActiveItem("reports")}
            >
              Reports
            </SidebarItem>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Communication</SidebarGroupLabel>
            <SidebarItem
              id="messages"
              icon={<MessageSquare />}
              isActive={activeItem === "messages"}
              onClick={() => setActiveItem("messages")}
            >
              Messages
            </SidebarItem>
            <SidebarItem
              id="inbox"
              icon={<Inbox />}
              isActive={activeItem === "inbox"}
              onClick={() => setActiveItem("inbox")}
            >
              Inbox
            </SidebarItem>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="text-xs text-zinc-500">© 2024 Dashboard</div>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 p-6">
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <p>Active item: {activeItem}</p>
        <p>The sidebar shows active states for navigation items.</p>
      </main>
    </div>
  );
};

export const SizesExample = () => {
  return (
    <div className="space-y-4">
      <div className="flex h-64 w-full rounded border">
        <Sidebar size="sm">
          <SidebarHeader>
            <h2 className="font-semibold text-sm">Small</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarItem id="ex-size-sm-home" icon={<Home />}>Home</SidebarItem>
            <SidebarItem id="ex-size-sm-settings" icon={<Settings />}>Settings</SidebarItem>
          </SidebarContent>
        </Sidebar>
      </div>

      <div className="flex h-64 w-full rounded border">
        <Sidebar size="base">
          <SidebarHeader>
            <h2 className="font-semibold text-lg">Base</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarItem id="ex-size-base-home" icon={<Home />}>Home</SidebarItem>
            <SidebarItem id="ex-size-base-settings" icon={<Settings />}>Settings</SidebarItem>
          </SidebarContent>
        </Sidebar>
      </div>

      <div className="flex h-64 w-full rounded border">
        <Sidebar size="lg">
          <SidebarHeader>
            <h2 className="font-semibold text-xl">Large</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarItem id="ex-size-lg-home" icon={<Home />}>Home</SidebarItem>
            <SidebarItem id="ex-size-lg-settings" icon={<Settings />}>Settings</SidebarItem>
          </SidebarContent>
        </Sidebar>
      </div>
    </div>
  );
};
