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
            <SidebarItem icon={<Home />} id="ex1-home">
              Home
            </SidebarItem>
            <SidebarItem icon={<Search />} id="ex1-search">
              Search
            </SidebarItem>
            <SidebarItem icon={<Inbox />} id="ex1-inbox">
              Inbox
            </SidebarItem>
            <SidebarItem icon={<Calendar />} id="ex1-cal">
              Calendar
            </SidebarItem>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarItem icon={<User />} id="ex1-profile">
              Profile
            </SidebarItem>
            <SidebarItem icon={<Settings />} id="ex1-settings">
              Settings
            </SidebarItem>
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
            <SidebarItem icon={<Home />} id="ex2-home">
              Home
            </SidebarItem>
            <SidebarItem icon={<Search />} id="ex2-search">
              Search
            </SidebarItem>
            <SidebarItem icon={<Inbox />} id="ex2-inbox">
              Inbox
            </SidebarItem>
            <SidebarItem icon={<Calendar />} id="ex2-cal">
              Calendar
            </SidebarItem>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarItem icon={<User />} id="ex2-profile">
              Profile
            </SidebarItem>
            <SidebarItem icon={<Settings />} id="ex2-settings">
              Settings
            </SidebarItem>
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
            <SidebarItem icon={<Home />} id="ex3-home">
              Home
            </SidebarItem>
            <SidebarItem icon={<Search />} id="ex3-search">
              Search
            </SidebarItem>
            <SidebarItem icon={<Inbox />} id="ex3-inbox">
              Inbox
            </SidebarItem>
            <SidebarItem icon={<Calendar />} id="ex3-cal">
              Calendar
            </SidebarItem>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarItem icon={<User />} id="ex3-profile">
              Profile
            </SidebarItem>
            <SidebarItem icon={<Settings />} id="ex3-settings">
              Settings
            </SidebarItem>
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
              icon={<BarChart3 />}
              id="analytics"
              isActive={activeItem === "analytics"}
              onClick={() => setActiveItem("analytics")}
            >
              Analytics
            </SidebarItem>
            <SidebarItem
              icon={<FileText />}
              id="reports"
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
              icon={<MessageSquare />}
              id="messages"
              isActive={activeItem === "messages"}
              onClick={() => setActiveItem("messages")}
            >
              Messages
            </SidebarItem>
            <SidebarItem
              icon={<Inbox />}
              id="inbox"
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
            <SidebarItem icon={<Home />} id="ex-size-sm-home">
              Home
            </SidebarItem>
            <SidebarItem icon={<Settings />} id="ex-size-sm-settings">
              Settings
            </SidebarItem>
          </SidebarContent>
        </Sidebar>
      </div>

      <div className="flex h-64 w-full rounded border">
        <Sidebar size="base">
          <SidebarHeader>
            <h2 className="font-semibold text-lg">Base</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarItem icon={<Home />} id="ex-size-base-home">
              Home
            </SidebarItem>
            <SidebarItem icon={<Settings />} id="ex-size-base-settings">
              Settings
            </SidebarItem>
          </SidebarContent>
        </Sidebar>
      </div>

      <div className="flex h-64 w-full rounded border">
        <Sidebar size="lg">
          <SidebarHeader>
            <h2 className="font-semibold text-xl">Large</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarItem icon={<Home />} id="ex-size-lg-home">
              Home
            </SidebarItem>
            <SidebarItem icon={<Settings />} id="ex-size-lg-settings">
              Settings
            </SidebarItem>
          </SidebarContent>
        </Sidebar>
      </div>
    </div>
  );
};
