"use client";

import { BarChart3, FileText, HelpCircle, Home, Settings, Users } from "lucide-react";
import React from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
} from "./component";

export type SidebarPreviewProps = {
  /**
   * Whether to show icons next to navigation items.
   * Displays relevant icons for better visual recognition.
   */
  showIcons?: boolean;
  /**
   * Whether to show the footer section.
   * Displays copyright or additional information at the bottom.
   */
  showFooter?: boolean;
  /**
   * Number of navigation items to display.
   * Controls how many navigation options are shown.
   */
  itemCount?: 3 | 4 | 5 | 6;
  /**
   * Whether to include a group separator.
   * Shows visual dividers between navigation groups.
   */
  showGroups?: boolean;
  /**
   * Sidebar width variant.
   * Controls the overall width of the sidebar.
   */
  width?: "narrow" | "default" | "wide";
  /**
   * Whether to show a secondary navigation group.
   * Demonstrates multiple navigation sections.
   */
  showSecondaryGroup?: boolean;
};

const navigationItems = [
  { id: "home", label: "Home", icon: Home, href: "#home" },
  { id: "dashboard", label: "Dashboard", icon: BarChart3, href: "#dashboard" },
  { id: "users", label: "Users", icon: Users, href: "#users" },
  { id: "documents", label: "Documents", icon: FileText, href: "#documents" },
  { id: "settings", label: "Settings", icon: Settings, href: "#settings" },
  { id: "help", label: "Help", icon: HelpCircle, href: "#help" },
];

const secondaryItems = [
  { id: "support", label: "Support", icon: HelpCircle, href: "#support" },
  { id: "settings", label: "Settings", icon: Settings, href: "#settings" },
];

export function SidebarPreview({
  showIcons = true,
  showFooter = true,
  itemCount = 4,
  showGroups = true,
  width = "default",
  showSecondaryGroup = false,
}: SidebarPreviewProps = {}) {
  const displayedItems = navigationItems.slice(0, itemCount);

  const widthClass = {
    narrow: "w-48",
    default: "w-64",
    wide: "w-80",
  }[width];

  return (
    <div className="h-96 border  dark:border-zinc-800 rounded-lg overflow-hidden">
      <Sidebar className={widthClass}>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            {showIcons && <BarChart3 className="h-6 w-6 text-blue-600" />}
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Dashboard
            </h2>
          </div>
        </SidebarHeader>

        <SidebarBody>
          {showGroups
            ? (
                <>
                  <SidebarGroup>
                    <div className="px-3 mb-2">
                      <h3 className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                        Main Navigation
                      </h3>
                    </div>
                    {displayedItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <SidebarItem key={item.id} href={item.href}>
                          <div className="flex items-center gap-3">
                            {showIcons && <Icon className="h-4 w-4" />}
                            {item.label}
                          </div>
                        </SidebarItem>
                      );
                    })}
                  </SidebarGroup>

                  {showSecondaryGroup && (
                    <SidebarGroup>
                      <div className="px-3 mb-2 mt-6">
                        <h3 className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                          Account
                        </h3>
                      </div>
                      {secondaryItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <SidebarItem key={item.id} href={item.href}>
                            <div className="flex items-center gap-3">
                              {showIcons && <Icon className="h-4 w-4" />}
                              {item.label}
                            </div>
                          </SidebarItem>
                        );
                      })}
                    </SidebarGroup>
                  )}
                </>
              )
            : (
                <SidebarGroup>
                  {displayedItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <SidebarItem key={item.id} href={item.href}>
                        <div className="flex items-center gap-3">
                          {showIcons && <Icon className="h-4 w-4" />}
                          {item.label}
                        </div>
                      </SidebarItem>
                    );
                  })}
                </SidebarGroup>
              )}
        </SidebarBody>

        {showFooter && (
          <SidebarFooter>
            <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <span>© 2024 Company</span>
              <span>v2.1.0</span>
            </div>
          </SidebarFooter>
        )}
      </Sidebar>
    </div>
  );
}

// Preview props for prop explorer
export const sidebarPreviewProps = [
  {
    name: "variant",
    type: "select",
    description: "Sidebar display variant - controls the visual style and behavior of the sidebar.",
    options: ["default", "overlay", "collapsible"],
    defaultValue: "default",
  },
  {
    name: "side",
    type: "select",
    description: "Sidebar position - controls which side of the screen the sidebar appears on.",
    options: ["left", "right"],
    defaultValue: "left",
  },
  {
    name: "showHeader",
    type: "boolean",
    description: "Whether to show the sidebar header - displays title and close button when enabled.",
    defaultValue: true,
  },
  {
    name: "showFooter",
    type: "boolean",
    description: "Whether to show the sidebar footer - displays additional actions at the bottom when enabled.",
    defaultValue: false,
  },
  {
    name: "contentType",
    type: "select",
    description: "Type of content to display - controls the structure and examples shown in the sidebar.",
    options: ["navigation", "settings", "information"],
    defaultValue: "navigation",
  },
];
