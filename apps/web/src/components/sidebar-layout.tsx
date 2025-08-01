// Sidebar Layout Component for Documentation

"use client";

import { useWindowSize } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { List, Pilcrow, Rows3 } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

import {
  getDynamicIconByName,
  Sidebar,
  SidebarBody,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  ToggleGroup,
  ToggleGroupItem,
} from "@patternmode/ui";

import type {
  COMPONENT_LIST,
} from "@patternmode/ui/component-registry";
import type { ComponentConfig } from "../../../../packages/ui/src/lib/component-config-types";

import {
  CATEGORY_CONFIG,
  getAllComponents,
  getComponentsByCategory,
  getTotalComponentsCount,
} from "@patternmode/ui/component-registry";
import type { CategoryKey } from "@patternmode/ui/component-registry";
import { useSidebarView } from "../hooks/use-sidebar-view";
import { cx } from "../lib/utils";
import { ComponentSearch } from "./component-search";

// Create a stable icon component cache to prevent re-renders
const iconComponentCache = new Map<
  string,
  React.ComponentType<{ className?: string; strokeWidth?: number }> | null
>();

function getStableIconComponent(iconName: string | undefined) {
  if (!iconName || typeof iconName !== "string" || iconName.trim() === "") {
    return null;
  }

  if (!iconComponentCache.has(iconName)) {
    try {
      const IconComponent = getDynamicIconByName(iconName);
      iconComponentCache.set(iconName, IconComponent);
    }
    catch (error) {
      // If icon loading fails, cache null to prevent repeated attempts
      console.warn(`Failed to load icon "${iconName}":`, error);
      iconComponentCache.set(iconName, null);
    }
  }

  return iconComponentCache.get(iconName) || null;
}

type SidebarLayoutProps = {
  children: React.ReactNode;
};

type SidebarContextType = {
  isCollapsed: boolean;
  toggleCollapsed: () => void;
};

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
  const { viewMode, isGrouped, setGroupedView, setAlphabeticalView }
    = useSidebarView();

  // Check if current path matches a component
  const isCurrentComponent = (category: string, componentId: string) => {
    return (
      segments.length >= 2
      && segments[0] === category
      && segments[1] === componentId
    );
  };

  // Get data from shared registry
  const allComponents = getAllComponents();
  const totalComponentsCount = getTotalComponentsCount();

  return (
    <>
      <SidebarHeader isCollapsed={isCollapsed}>
        <div className="relative w-full h-full flex items-center">
          <Link
            href="/"
            className={cx("absolute top-4.5 left-3", {
              "opacity-100": !isCollapsed,
              "opacity-0": isCollapsed,
            })}
          >
            <Pilcrow
              className="size-7 text-zinc-600 dark:text-zinc-400 scale-x-[-1]"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </SidebarHeader>

      <SidebarBody isCollapsed={isCollapsed}>
        {/* Level 1: Components with view toggle */}
        <SidebarGroup
          title={`Components (${totalComponentsCount})`}
          isCollapsed={isCollapsed}
          level={1}
          actions={(
            <ToggleGroup
              value={[viewMode]}
              onValueChange={(value) => {
                if (value.length > 0) {
                  const newMode = value[0] as "grouped" | "alphabetical";
                  if (newMode === "grouped") {
                    setGroupedView();
                  }
                  else {
                    setAlphabeticalView();
                  }
                }
              }}
              size="sm"
              className={isCollapsed ? "opacity-0" : ""}
            >
              <ToggleGroupItem value="grouped" leftIcon={Rows3}>
                <span className="sr-only">Grouped view</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="alphabetical" leftIcon={List}>
                <span className="sr-only">Alphabetical view</span>
              </ToggleGroupItem>
            </ToggleGroup>
          )}
        >
          {isGrouped ? (
            // Grouped view: Level 2 categories with Level 3 items
            <>
              {CATEGORY_CONFIG.map((category) => {
                const components = getComponentsByCategory(
                  category.key,
                ).sort((a, b) => a.name.localeCompare(b.name));

                if (components.length === 0) { return null; }

                return (
                  <SidebarGroup
                    key={category.key}
                    title={`${category.name} (${components.length})`}
                    href={`/ui/${category.key}`}
                    isCollapsed={isCollapsed}
                    level={2}
                  >
                    {components.map((component) => {
                      const IconComponent = getStableIconComponent(
                        component.icon,
                      );
                      return (
                        <SidebarItem
                          key={component.id}
                          href={`/ui/${category.key}/${component.id}`}
                          current={isCurrentComponent(
                            category.key,
                            component.id,
                          )}
                          isCollapsed={isCollapsed}
                          leftIcon={IconComponent || undefined}
                        >
                          {component.name}
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
              {allComponents.map((component) => {
                const IconComponent = getStableIconComponent(component.icon);
                return (
                  <SidebarItem
                    key={component.id}
                    href={`/ui/${component.category}/${component.id}`}
                    current={isCurrentComponent(
                      component.category,
                      component.id,
                    )}
                    isCollapsed={isCollapsed}
                    leftIcon={IconComponent || undefined}
                  >
                    {component.name}
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
