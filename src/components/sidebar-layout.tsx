// Sidebar Layout Component for Documentation

"use client";

import { getDynamicIconByName } from "@/components/ui/icon-select/icon-select";
import { useSidebarView } from "@/hooks/use-sidebar-view";
import type { ComponentConfig } from "@/lib/component-config-types";
import {
  COMPONENT_LIST,
  getComponentsByCategory,
} from "@/lib/component-registry";
import { cx } from "@/lib/utils";
import { useWindowSize } from "@uidotdev/usehooks";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { List, Pilcrow, Rows3 } from "lucide-react";
import { useSelectedLayoutSegments } from "next/navigation";
import React, { createContext, useContext, useState } from "react";
import { ComponentSearch } from "./component-search";
import { Badge } from "./ui/badge/badge";
import {
  Sidebar,
  SidebarBody,
  SidebarDivider,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from "./ui/sidebar";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group/toggle-group";

// Create a stable icon component cache to prevent re-renders
const iconComponentCache = new Map<
  string,
  React.ComponentType<{ className?: string; strokeWidth?: number }> | null
>();

function getStableIconComponent(iconName: string | undefined) {
  if (!iconName) return null;

  if (!iconComponentCache.has(iconName)) {
    const IconComponent = getDynamicIconByName(iconName);
    iconComponentCache.set(iconName, IconComponent);
  }

  return iconComponentCache.get(iconName) || null;
}

interface SidebarLayoutProps {
  children: React.ReactNode;
}

interface SidebarContextType {
  isCollapsed: boolean;
  toggleCollapsed: () => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

function SidebarContent() {
  const segments = useSelectedLayoutSegments();
  const { isCollapsed } = useSidebar();
  const { viewMode, isGrouped, setGroupedView, setAlphabeticalView } =
    useSidebarView();

  // Category configuration
  const categoryConfig = [
    { key: "text", name: "Text" },
    { key: "layout", name: "Layout" },
    { key: "navigation", name: "Navigation" },
    { key: "feedback", name: "Feedback" },
    { key: "overlay", name: "Overlay" },
    { key: "data", name: "Data" },
    { key: "media", name: "Media" },
    { key: "utility", name: "Utility" },
    { key: "inputs", name: "Inputs" },
    { key: "forms", name: "Forms" },
    { key: "charts", name: "Charts" },
  ] as const;

  // Check if current path matches a component
  const isCurrentComponent = (category: string, componentId: string) => {
    return (
      segments.length >= 2 &&
      segments[0] === category &&
      segments[1] === componentId
    );
  };

  // Get all components for alphabetical view
  const getAllComponents = () => {
    const allComponents: Array<
      ComponentConfig & { category: string; categoryName: string }
    > = [];

    categoryConfig.forEach((category) => {
      const components = getComponentsByCategory(
        category.key as keyof typeof COMPONENT_LIST
      );
      components.forEach((component) => {
        allComponents.push({
          ...component,
          category: category.key,
          categoryName: category.name,
        });
      });
    });

    return allComponents.sort((a, b) => a.name.localeCompare(b.name));
  };

  return (
    <>
      <SidebarHeader isCollapsed={isCollapsed}>
        <div className="relative w-full h-full flex items-center">
          <div
            className={clsx(
              "absolute top-4.5",
              isCollapsed ? "left-2" : "left-3"
            )}
          >
            <Pilcrow
              className="size-7 text-zinc-600 dark:text-zinc-400 scale-x-[-1]"
              strokeWidth={1.5}
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarBody isCollapsed={isCollapsed}>
        {/* Level 1: Getting Started */}
        <SidebarGroup
          title="Getting Started"
          isCollapsed={isCollapsed}
          level={1}
        >
          <SidebarItem href="/" isCollapsed={isCollapsed}>
            <SidebarLabel isCollapsed={isCollapsed}>Overview</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/installation" isCollapsed={isCollapsed}>
            <SidebarLabel isCollapsed={isCollapsed}>Installation</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/layout" isCollapsed={isCollapsed}>
            <SidebarLabel isCollapsed={isCollapsed}>
              Layout Builder
            </SidebarLabel>
          </SidebarItem>
        </SidebarGroup>

        <SidebarDivider isCollapsed={isCollapsed} />

        {/* Level 1: Components with view toggle */}
        <SidebarGroup
          title="Components"
          isCollapsed={isCollapsed}
          level={1}
          actions={
            <ToggleGroup
              value={[viewMode]}
              onValueChange={(value) => {
                if (value.length > 0) {
                  const newMode = value[0] as "grouped" | "alphabetical";
                  if (newMode === "grouped") {
                    setGroupedView();
                  } else {
                    setAlphabeticalView();
                  }
                }
              }}
              size="sm"
            >
              <ToggleGroupItem value="grouped" leftIcon={Rows3}>
                <span className="sr-only">Grouped view</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="alphabetical" leftIcon={List}>
                <span className="sr-only">Alphabetical view</span>
              </ToggleGroupItem>
            </ToggleGroup>
          }
        >
          {isGrouped ? (
            // Grouped view: Level 2 categories with Level 3 items
            <>
              {categoryConfig.map((category) => {
                const components = getComponentsByCategory(
                  category.key as keyof typeof COMPONENT_LIST
                ).sort((a, b) => a.name.localeCompare(b.name));

                if (components.length === 0) return null;

                return (
                  <SidebarGroup
                    key={category.key}
                    title={category.name}
                    href={`/ui/${category.key}`}
                    isCollapsed={isCollapsed}
                    level={2}
                  >
                    {components.map((component) => {
                      const IconComponent = getStableIconComponent(
                        component.icon
                      );
                      return (
                        <SidebarItem
                          key={component.id}
                          href={`/ui/${category.key}/${component.id}`}
                          current={isCurrentComponent(
                            category.key,
                            component.id
                          )}
                          isCollapsed={isCollapsed}
                          leftIcon={IconComponent || undefined}
                        >
                          <SidebarLabel isCollapsed={isCollapsed}>
                            {component.name}
                          </SidebarLabel>
                        </SidebarItem>
                      );
                    })}
                  </SidebarGroup>
                );
              })}
            </>
          ) : (
            // Alphabetical view: Flat Level 3 items
            <>
              {getAllComponents().map((component) => {
                const IconComponent = getStableIconComponent(component.icon);
                return (
                  <SidebarItem
                    key={component.id}
                    href={`/ui/${component.category}/${component.id}`}
                    current={isCurrentComponent(
                      component.category,
                      component.id
                    )}
                    isCollapsed={isCollapsed}
                    leftIcon={IconComponent || undefined}
                  >
                    <SidebarLabel isCollapsed={isCollapsed}>
                      {component.name}
                    </SidebarLabel>
                  </SidebarItem>
                );
              })}
            </>
          )}
        </SidebarGroup>
      </SidebarBody>
    </>
  );
}

function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();
  const { width } = useWindowSize();
  const isMobile = width !== null && width < 1024;

  return (
    <motion.div
      className="flex-1 flex flex-col"
      initial={false}
      animate={{
        "--sidebar-width": isCollapsed ? "3rem" : "16rem",
      }}
      transition={{
        duration: 0.3,
        ease: [0.32, 0.72, 0, 1],
      }}
      style={{
        marginLeft: isMobile ? "0" : "var(--sidebar-width)",
      }}
    >
      <div className="flex flex-col min-h-0 flex-1">
        <header className="h-16 px-6 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-end">
          <ComponentSearch />
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </motion.div>
  );
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleCollapsed }}>
      <motion.div
        className="flex h-screen bg-white dark:bg-zinc-900"
        initial={false}
        animate={{
          "--sidebar-width": isCollapsed ? "3rem" : "16rem",
        }}
        transition={{
          duration: 0.3,
          ease: [0.32, 0.72, 0, 1],
        }}
      >
        <div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:bg-zinc-100 lg:dark:border-zinc-800 lg:dark:bg-zinc-900 transition-all duration-200">
          <Sidebar
            isCollapsed={isCollapsed}
            onToggle={toggleCollapsed}
            showToggle={true}
          >
            <SidebarContent />
          </Sidebar>
        </div>

        <MainContent>{children}</MainContent>
      </motion.div>
    </SidebarContext.Provider>
  );
}
