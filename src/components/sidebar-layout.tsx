// Sidebar Layout Component for Documentation

"use client";

import { useSidebarView } from "@/hooks/use-sidebar-view";
import type { ComponentConfig } from "@/lib/component-config-types";
import {
  COMPONENT_LIST,
  getComponentsByCategory,
} from "@/lib/component-registry";
import { useWindowSize } from "@uidotdev/usehooks";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { List, Pilcrow, Rows3 } from "lucide-react";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import React, { createContext, useContext, useState, useMemo } from "react";
import { getDynamicIconByName } from "@/components/ui/icon-select/icon-select";

// Create a stable icon component cache to prevent re-renders
const iconComponentCache = new Map<string, React.ComponentType<any> | null>();

function getStableIconComponent(iconName: string | undefined) {
  if (!iconName) return null;
  
  if (!iconComponentCache.has(iconName)) {
    const IconComponent = getDynamicIconByName(iconName);
    iconComponentCache.set(iconName, IconComponent);
  }
  
  return iconComponentCache.get(iconName) || null;
}
import { ComponentSearch } from "./component-search";
import { Badge } from "./ui/badge/badge";
import {
  Sidebar,
  SidebarBody,
  SidebarDivider,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from "./ui/sidebar";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group/toggle-group";

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
  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();
  const { isCollapsed, toggleCollapsed } = useSidebar();
  const {
    viewMode,
    toggleViewMode,
    isGrouped,
    isAlphabetical,
    setGroupedView,
    setAlphabeticalView,
  } = useSidebarView();

  // Category display names and order
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

  // Check if current path matches a component using segments
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

  // Helper function to render a category section
  const renderCategorySection = (
    categoryName: string,
    categoryPath: string,
    components: ComponentConfig[],
    showDivider: boolean = true
  ) => {
    if (components.length === 0) return null;

    return (
      <>
        <SidebarSection
          title={categoryName}
          href={`/${categoryPath}`}
          defaultOpen={true}
          isCollapsed={isCollapsed}
        >
          {components.map((config) => {
            const IconComponent = getStableIconComponent(config.icon);
            return (
              <SidebarItem
                key={config.id}
                href={`/${categoryPath}/${config.id}`}
                current={isCurrentComponent(categoryPath, config.id)}
                isCollapsed={isCollapsed}
                leftIcon={IconComponent}
              >
                <SidebarLabel isCollapsed={isCollapsed}>
                  {config.name}
                </SidebarLabel>
              </SidebarItem>
            );
          })}
        </SidebarSection>
        {showDivider && components.length > 0 && (
          <SidebarDivider isCollapsed={isCollapsed} />
        )}
      </>
    );
  };

  return (
    <>
      <SidebarHeader isCollapsed={isCollapsed}>
        <div className="relative w-full h-full flex items-center">
          {/* Logo */}
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
        <SidebarSection
          title="Getting Started"
          defaultOpen={true}
          isCollapsed={isCollapsed}
        >
          <SidebarItem href="/" isCollapsed={isCollapsed}>
            <SidebarLabel isCollapsed={isCollapsed}>Overview</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/installation" isCollapsed={isCollapsed}>
            <SidebarLabel isCollapsed={isCollapsed}>Installation</SidebarLabel>
          </SidebarItem>
        </SidebarSection>

        <SidebarDivider isCollapsed={isCollapsed} />

        {/* View Toggle Button */}
        {!isCollapsed && (
          <div className="px-3 py-2">
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
              className="w-full"
            >
              <ToggleGroupItem
                value="grouped"
                aria-label="Grouped view"
                className="flex-1"
              >
                <Rows3 className="size-4 mr-2" />
                Grouped
              </ToggleGroupItem>
              <ToggleGroupItem
                value="alphabetical"
                aria-label="Alphabetical view"
                className="flex-1"
              >
                <List className="size-4 mr-2" />
                Alphabetical
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        )}

        {isCollapsed && (
          <div className="px-2 py-2">
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
              <ToggleGroupItem value="grouped" aria-label="Grouped view">
                <Rows3 className="size-3" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="alphabetical"
                aria-label="Alphabetical view"
              >
                <List className="size-3" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        )}

        <SidebarDivider isCollapsed={isCollapsed} />

        {isGrouped ? (
          // Grouped view (original)
          categoryConfig.map((category, index) => {
            const components = getComponentsByCategory(
              category.key as keyof typeof COMPONENT_LIST
            ).sort((a, b) => a.name.localeCompare(b.name));
            const isLastCategory = index === categoryConfig.length - 1;
            return (
              <React.Fragment key={category.key}>
                {renderCategorySection(
                  category.name,
                  category.key,
                  components,
                  !isLastCategory
                )}
              </React.Fragment>
            );
          })
        ) : (
          // Alphabetical view
          <SidebarSection
            title="All Components"
            defaultOpen={true}
            isCollapsed={isCollapsed}
          >
            {getAllComponents().map((component) => (
              <SidebarItem
                key={component.id}
                href={`/${component.category}/${component.id}`}
                current={isCurrentComponent(component.category, component.id)}
                isCollapsed={isCollapsed}
              >
                <SidebarLabel isCollapsed={isCollapsed}>
                  {component.name}
                  {!isCollapsed && (
                    <Badge
                      variant="neutral"
                      className="ml-auto text-xs opacity-60"
                    >
                      {component.categoryName}
                    </Badge>
                  )}
                </SidebarLabel>
              </SidebarItem>
            ))}
          </SidebarSection>
        )}
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
        ease: [0.32, 0.72, 0, 1], // Custom easing for smoother animation
      }}
      style={{
        marginLeft: isMobile ? "0" : "var(--sidebar-width)",
      }}
    >
      <div className="flex flex-col min-h-0 flex-1">
        {/* Header matching sidebar header height */}
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
        {/* Sidebar */}
        <div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:bg-zinc-100 lg:dark:border-zinc-800 lg:dark:bg-zinc-900 transition-all duration-200">
          <Sidebar
            isCollapsed={isCollapsed}
            onToggle={toggleCollapsed}
            showToggle={true}
          >
            <SidebarContent />
          </Sidebar>
        </div>

        {/* Main Content */}
        <MainContent>{children}</MainContent>
      </motion.div>
    </SidebarContext.Provider>
  );
}
