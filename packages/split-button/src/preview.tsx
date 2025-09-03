"use client";

import type { Size } from "@patternmode/config/sizes";
import { sizes } from "@patternmode/config/sizes";
import type { ButtonVariant } from "@patternmode/constants/variants";
import { componentVariants } from "@patternmode/constants/variants";
import { Icon } from "@patternmode/icon";
import { Archive, Copy, Download, Save, Share } from "lucide-react";
import type React from "react";
import { SplitButton } from "./component";

export type SplitButtonPreviewProps = {
  /**
   * Button size variant.
   * Controls the overall size and padding of the split button.
   */
  size?: Size;
  /**
   * Button style variant.
   * Controls the visual styling and color scheme.
   */
  variant?: ButtonVariant;
  /**
   * Whether to show icons in the dropdown menu.
   * Displays relevant icons alongside menu items.
   */
  showIcons?: boolean;
  /**
   * Number of dropdown menu items.
   * Controls how many additional actions are available.
   */
  menuItemCount?: 2 | 3 | 4 | 5;
  /**
   * Primary action type.
   * Determines the main button text and behavior.
   */
  primaryAction?: "save" | "download" | "share" | "copy";
  /**
   * Whether to include separators in the menu.
   * Shows visual dividers between menu groups.
   */
  showSeparators?: boolean;
};

const actionConfigs = {
  save: {
    label: "Save",
    icon: Save,
    items: [
      { label: "Save as Draft", icon: Save },
      { label: "Save & Publish", icon: Share },
      { label: "Save Template", icon: Copy },
      { label: "Save & Archive", icon: Archive },
    ],
  },
  download: {
    label: "Download",
    icon: Download,
    items: [
      { label: "Download PDF", icon: Download },
      { label: "Download CSV", icon: Download },
      { label: "Download JSON", icon: Download },
      { label: "Download Archive", icon: Archive },
    ],
  },
  share: {
    label: "Share",
    icon: Share,
    items: [
      { label: "Share Link", icon: Share },
      { label: "Copy Link", icon: Copy },
      { label: "Share via Email", icon: Share },
      { label: "Download & Share", icon: Download },
    ],
  },
  copy: {
    label: "Copy",
    icon: Copy,
    items: [
      { label: "Copy Text", icon: Copy },
      { label: "Copy Link", icon: Copy },
      { label: "Copy as JSON", icon: Copy },
      { label: "Copy & Archive", icon: Archive },
    ],
  },
};

export function SplitButtonPreview({
  size = "base",
  variant = "primary",
  showIcons = true,
  menuItemCount = 3,
  primaryAction = "save",
  showSeparators = false,
}: SplitButtonPreviewProps = {}) {
  const config = actionConfigs[primaryAction];
  const displayedItems = config.items.slice(0, menuItemCount);
  const PrimaryIcon = config.icon;

  const handlePrimaryAction = () => {
    // Primary action triggered
  };

  const handleMenuAction = (_action: string) => {
    // Menu action triggered
  };

  return (
    <SplitButton
      buttonContent={
        <div className="flex items-center gap-2">
          {showIcons && (
            <Icon
              icon={
                PrimaryIcon as React.ComponentType<{
                  className?: string;
                  strokeWidth?: number;
                }>
              }
              size="sm"
            />
          )}
          {config.label}
        </div>
      }
      onButtonClick={handlePrimaryAction}
      size={size}
      variant={variant}
    >
      {displayedItems.map((item, index) => {
        const ItemIcon = item.icon;
        return (
          <div key={item.label}>
            {showSeparators && index === Math.floor(menuItemCount / 2) && (
              <div className="my-1 border-t dark:border-zinc-700" />
            )}
            <button
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
              onClick={() => handleMenuAction(item.label)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleMenuAction(item.label);
                }
              }}
              type="button"
            >
              {showIcons && (
                <Icon
                  icon={
                    ItemIcon as React.ComponentType<{
                      className?: string;
                      strokeWidth?: number;
                    }>
                  }
                  size="sm"
                />
              )}
              {item.label}
            </button>
          </div>
        );
      })}
    </SplitButton>
  );
}

// Preview props for prop explorer
export const splitButtonPreviewProps = [
  {
    name: "variant",
    type: "select",
    description:
      "Button style variant - controls the visual appearance of both parts of the split button.",
    options: Object.keys(componentVariants.button),
    defaultValue: "primary",
  },
  {
    name: "size",
    type: "select",
    description:
      "Button size variant - affects padding and text size of the split button.",
    options: Object.keys(sizes),
    defaultValue: "base",
  },
  {
    name: "dropdownIcon",
    type: "icon-select",
    description: "Icon to display in the dropdown trigger button.",
    defaultValue: "ChevronDown",
  },
  {
    name: "showDividers",
    type: "boolean",
    description:
      "Whether to show dividers between action groups - adds visual separation when enabled.",
    defaultValue: false,
  },
];
