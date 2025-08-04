// Sidebar Layout Component for Documentation

"use client";

import { useWindowSize } from "@uidotdev/usehooks";
import { List, Rows3 } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

import Logo from "@/components/logo";
import { Badge } from "@patternmode/ui/components/badge";
import {
  CATEGORY_CONFIG,
  getAllComponents,
  getComponentsByCategory,
  getTotalComponentsCount,
} from "@patternmode/ui/components/registry";
import {
  Sidebar,
  SidebarBody,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,

} from "@patternmode/ui/components/sidebar";
import { Stack } from "@patternmode/ui/components/stack";
import { ToggleGroup, ToggleGroupItem } from "@patternmode/ui/components/toggle-group";

import { useSidebarView } from "../hooks/use-sidebar-view";
import { cx } from "../lib/utils";
import { ComponentSearch } from "./component-search";

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
  const isCurrentComponent = (componentId: string) => {
    return (
      segments.length >= 2
      && segments[0] === "components"
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
            className={cx("absolute top-4.5 left-3 max-lg:hidden", {
              "opacity-100": !isCollapsed,
              "opacity-0": isCollapsed,
            })}
          >
            <Logo />
          </Link>
        </div>
      </SidebarHeader>

      <SidebarBody isCollapsed={isCollapsed}>
        {/* Level 1: Components with view toggle */}
        <SidebarGroup
          title={(
            <>
              Components
              {" "}
              <Badge variant="neutral" size="sm">{totalComponentsCount}</Badge>
            </>
          )}
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
          {isGrouped
            ? (
                <>
                  {CATEGORY_CONFIG.map((category) => {
                    const components = getComponentsByCategory(
                      category.key,
                    ).sort((a, b) => a.name.localeCompare(b.name));

                    if (components.length === 0) {
                      return null;
                    }

                    return (
                      <SidebarGroup
                        key={category.key}
                        title={(
                          <>
                            {category.name}
                            {" "}
                            <Badge variant="neutral" size="sm">{components.length}</Badge>
                          </>
                        )}
                        href={`/ui/${category.key}`}
                        isCollapsed={isCollapsed}
                        level={2}
                      >
                        {components.map((component) => {
                          return (
                            <SidebarItem
                              key={component.id}
                              href={`/ui/components/${component.id}`}
                              current={isCurrentComponent(component.id)}
                              isCollapsed={isCollapsed}
                              leftIcon={component.icon}
                            >
                              {component.name}
                            </SidebarItem>
                          );
                        })}
                      </SidebarGroup>
                    );
                  })}
                </>
              )
            : (
          // Alphabetical view: Flat Level 3 items
                <>
                  {allComponents.map((component) => {
                    return (
                      <SidebarItem
                        key={component.id}
                        href={`/ui/components/${component.id}`}
                        current={isCurrentComponent(component.id)}
                        isCollapsed={isCollapsed}
                        leftIcon={component.icon}
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
      <Stack direction="vertical" gap={0} className="min-h-0 flex-1">
        <header className="h-16 px-6 bg-white dark:bg-zinc-900 border-b  dark:border-zinc-800 flex items-center justify-between">
          <Link
            href="/"
            className={cx("lg:hidden opacity-0", {
              "opacity-100": !isCollapsed,
              "opacity-0": isCollapsed,
            })}
          >
            <Logo />
          </Link>
          <ComponentSearch />
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </Stack>
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
