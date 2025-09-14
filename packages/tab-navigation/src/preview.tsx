"use client";

import { TabNavigation, TabNavigationLink } from ".";

const TAB_COUNT_3 = 3 as const;
const TAB_COUNT_4 = 4 as const;
const TAB_COUNT_5 = 5 as const;
const TAB_COUNT_6 = 6 as const;
const TAB_COUNT_OPTIONS = [
  TAB_COUNT_3,
  TAB_COUNT_4,
  TAB_COUNT_5,
  TAB_COUNT_6,
] as const;
const DISABLED_TAB_INDEX = 4 as const;
const DISABLED_THRESHOLD = 5 as const;

const tabItems = [
  { href: "#overview", label: "Overview", disabled: false },
  { href: "#analytics", label: "Analytics", disabled: false },
  { href: "#reports", label: "Reports", disabled: false },
  { href: "#settings", label: "Settings", disabled: false },
  { href: "#admin", label: "Admin", disabled: true },
];

export type TabNavigationPreviewProps = {
  /**
   * Number of tabs to display.
   * Controls how many navigation tabs are shown.
   */
  tabCount?: 3 | 4 | 5;
  /**
   * Whether to show a disabled tab.
   * Demonstrates disabled state styling and behavior.
   */
  showDisabledTab?: boolean;
  /**
   * Which tab should be marked as active.
   * Simulates the current page/section selection.
   */
  activeTab?: "overview" | "analytics" | "reports" | "settings" | "admin";
  /**
   * Size variant for the tab navigation.
   * Controls the overall size and spacing of tabs.
   */
  size?: "sm" | "md" | "lg";
};

export function TabNavigationPreview({
  tabCount = 4,
  showDisabledTab = false,
  activeTab = "overview",
  size: _size = "md",
}: TabNavigationPreviewProps = {}) {
  let displayedTabs = tabItems.slice(0, tabCount);

  if (showDisabledTab && tabCount < DISABLED_THRESHOLD) {
    displayedTabs = [...displayedTabs, tabItems[DISABLED_TAB_INDEX]];
  }

  return (
    <div className="p-8">
      <TabNavigation>
        {displayedTabs.map((tab) => (
          <TabNavigationLink
            className={
              tab.href === `#${activeTab}`
                ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                : ""
            }
            disabled={tab.disabled}
            href={tab.href}
            key={tab.href}
          >
            {tab.label}
          </TabNavigationLink>
        ))}
      </TabNavigation>
    </div>
  );
}

// Preview props for prop explorer
export const tabNavigationPreviewProps = [
  {
    name: "variant",
    type: "select",
    description:
      "Tab navigation style variant - controls the visual appearance of the tab navigation.",
    options: ["default", "pills", "underline"],
    defaultValue: "default",
  },
  {
    name: "size",
    type: "select",
    description:
      "Tab navigation size variant - affects padding and text size of the tabs.",
    options: ["sm", "default", "lg"],
    defaultValue: "default",
  },
  {
    name: "tabCount",
    type: "select",
    description:
      "Number of tabs to display - controls how many navigation tabs are shown.",
    options: [...TAB_COUNT_OPTIONS],
    defaultValue: TAB_COUNT_4,
  },
  {
    name: "showIcons",
    type: "boolean",
    description:
      "Whether to show icons in tabs - displays icons alongside tab text when enabled.",
    defaultValue: true,
  },
  {
    name: "showBadges",
    type: "boolean",
    description:
      "Whether to show badges on tabs - displays notification badges when enabled.",
    defaultValue: false,
  },
];
