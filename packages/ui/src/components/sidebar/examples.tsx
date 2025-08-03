"use client";

import {
  BarChart3,
  Bell,
  Calendar,
  FolderOpen,
  HelpCircle,
  Home,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarDivider,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
} from "./component";

export const DefaultExample = () => {
  return (
    <div className="h-96 border rounded-lg overflow-hidden">
      <Sidebar className="bg-white dark:bg-zinc-950">
        <SidebarHeader className="p-4">
          <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">My App</div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">Team Workspace</div>
        </SidebarHeader>
        <SidebarBody>
          <SidebarGroup>
            <SidebarItem href="#dashboard" current leftIcon={Home}>
              Dashboard
            </SidebarItem>
            <SidebarItem href="#analytics" leftIcon={BarChart3}>
              Analytics
            </SidebarItem>
            <SidebarItem href="#team" leftIcon={Users}>
              Team
            </SidebarItem>
          </SidebarGroup>
          <SidebarGroup title="Management">
            <SidebarItem href="#projects" leftIcon={FolderOpen}>
              Projects
            </SidebarItem>
            <SidebarItem href="#calendar" leftIcon={Calendar}>
              Calendar
            </SidebarItem>
          </SidebarGroup>
        </SidebarBody>
        <SidebarFooter>
          <SidebarGroup>
            <SidebarItem href="#settings" leftIcon={Settings}>
              Settings
            </SidebarItem>
            <SidebarItem href="#help" leftIcon={HelpCircle}>
              Help
            </SidebarItem>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};

export const CollapsibleExample = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="h-96 border rounded-lg overflow-hidden">
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        showToggle
        className="bg-white dark:bg-zinc-950"
        style={{
          width: isCollapsed ? "4rem" : "16rem",
          transition: "width 200ms ease-in-out",
        }}
      >
        <SidebarHeader className="p-4">
          {!isCollapsed && (
            <>
              <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Dashboard</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Project Alpha</div>
            </>
          )}
        </SidebarHeader>
        <SidebarBody isCollapsed={isCollapsed}>
          <SidebarGroup isCollapsed={isCollapsed}>
            <SidebarItem
              href="#home"
              current
              leftIcon={Home}
              isCollapsed={isCollapsed}
            >
              Home
            </SidebarItem>
            <SidebarItem
              href="#analytics"
              leftIcon={BarChart3}
              isCollapsed={isCollapsed}
            >
              Analytics
            </SidebarItem>
            <SidebarItem
              href="#users"
              leftIcon={Users}
              isCollapsed={isCollapsed}
            >
              Users
            </SidebarItem>
          </SidebarGroup>

          <SidebarDivider isCollapsed={isCollapsed} />

          <SidebarGroup title="Tools" isCollapsed={isCollapsed}>
            <SidebarItem
              href="#search"
              leftIcon={Search}
              isCollapsed={isCollapsed}
            >
              Search
            </SidebarItem>
            <SidebarItem
              href="#notifications"
              leftIcon={Bell}
              isCollapsed={isCollapsed}
            >
              Notifications
            </SidebarItem>
          </SidebarGroup>
        </SidebarBody>
        <SidebarFooter>
          <SidebarGroup isCollapsed={isCollapsed}>
            <SidebarItem
              href="#settings"
              leftIcon={Settings}
              isCollapsed={isCollapsed}
            >
              Settings
            </SidebarItem>
            <SidebarItem
              href="#profile"
              leftIcon={User}
              isCollapsed={isCollapsed}
            >
              John Doe
            </SidebarItem>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};

export const WithGroupsExample = () => {
  return (
    <div className="h-96 border rounded-lg overflow-hidden">
      <Sidebar className="bg-white dark:bg-zinc-950">
        <SidebarHeader className="p-4">
          <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Workspace</div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">Team Alpha</div>
        </SidebarHeader>
        <SidebarBody>
          <SidebarGroup title="Main">
            <SidebarItem href="#dashboard" current leftIcon={Home}>
              Dashboard
            </SidebarItem>
            <SidebarItem href="#analytics" leftIcon={BarChart3}>
              Analytics
            </SidebarItem>
          </SidebarGroup>

          <SidebarGroup title="Project Management">
            <SidebarItem href="#projects" leftIcon={FolderOpen}>
              Projects
            </SidebarItem>
            <SidebarItem href="#calendar" leftIcon={Calendar}>
              Calendar
            </SidebarItem>
            <SidebarItem href="#team" leftIcon={Users}>
              Team Members
            </SidebarItem>
          </SidebarGroup>

          <SidebarGroup title="Communication">
            <SidebarItem href="#notifications" leftIcon={Bell}>
              Notifications
            </SidebarItem>
            <SidebarItem href="#messages">
              Messages
            </SidebarItem>
          </SidebarGroup>
        </SidebarBody>
        <SidebarFooter>
          <SidebarGroup>
            <SidebarItem href="#settings" leftIcon={Settings}>
              Settings
            </SidebarItem>
            <SidebarItem href="#help" leftIcon={HelpCircle}>
              Help & Support
            </SidebarItem>
            <SidebarItem href="#profile" leftIcon={User}>
              John Doe
            </SidebarItem>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};

export const NavigationExample = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-96 border rounded-lg overflow-hidden">
      <Sidebar className="bg-white dark:bg-zinc-950">
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-sm">A</span>
            </div>
            <div>
              <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Acme Corp</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">admin@acme.com</div>
            </div>
          </div>
        </SidebarHeader>
        <SidebarBody>
          <SidebarGroup title="Overview">
            <SidebarItem
              onClick={() => handleNavigation("dashboard")}
              current={currentPage === "dashboard"}
              leftIcon={Home}
            >
              Dashboard
            </SidebarItem>
            <SidebarItem
              onClick={() => handleNavigation("analytics")}
              current={currentPage === "analytics"}
              leftIcon={BarChart3}
            >
              Analytics
            </SidebarItem>
          </SidebarGroup>

          <SidebarGroup title="Management">
            <SidebarItem
              onClick={() => handleNavigation("projects")}
              current={currentPage === "projects"}
              leftIcon={FolderOpen}
            >
              Projects
            </SidebarItem>
            <SidebarItem
              onClick={() => handleNavigation("team")}
              current={currentPage === "team"}
              leftIcon={Users}
            >
              Team
            </SidebarItem>
            <SidebarItem
              onClick={() => handleNavigation("calendar")}
              current={currentPage === "calendar"}
              leftIcon={Calendar}
            >
              Calendar
            </SidebarItem>
          </SidebarGroup>
        </SidebarBody>
        <SidebarFooter>
          <SidebarGroup>
            <SidebarItem
              onClick={() => handleNavigation("settings")}
              current={currentPage === "settings"}
              leftIcon={Settings}
            >
              Settings
            </SidebarItem>
            <SidebarItem
              onClick={() => handleNavigation("help")}
              current={currentPage === "help"}
              leftIcon={HelpCircle}
            >
              Help
            </SidebarItem>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};
