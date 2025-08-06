"use client";

import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from "lucide-react";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "./component";

export type ToggleGroupPreviewProps = {
  /**
   * The visual style variant of the toggle group.
   * Controls the overall appearance and styling theme.
   */
  variant?: "default" | "outline";
  /**
   * Size variant for the toggle group items.
   * Controls the dimensions and padding of toggle buttons.
   */
  size?: "xs" | "sm" | "default" | "lg";
  /**
   * Selection type for the toggle group.
   * Single allows one item, multiple allows several items to be selected.
   */
  type?: "single" | "multiple";
  /**
   * Toggle group content type.
   * Determines what type of options are displayed (alignment vs formatting).
   */
  contentType?: "alignment" | "formatting";
  /**
   * Whether to show icons alongside text.
   * Displays relevant icons when enabled for better visual recognition.
   */
  showIcons?: boolean;
  /**
   * Whether items can be deselected.
   * When false, at least one item must remain selected.
   */
  allowDeselect?: boolean;
};

export function ToggleGroupPreview({
  variant = "default",
  size = "default",
  type = "multiple",
  contentType = "alignment",
  showIcons = true,
}: ToggleGroupPreviewProps = {}) {
  const alignmentItems = [
    { value: "left", label: "Left", icon: AlignLeft },
    { value: "center", label: "Center", icon: AlignCenter },
    { value: "right", label: "Right", icon: AlignRight },
  ];

  const formattingItems = [
    { value: "bold", label: "Bold", icon: Bold },
    { value: "italic", label: "Italic", icon: Italic },
    { value: "underline", label: "Underline", icon: Underline },
  ];

  const items = contentType === "alignment" ? alignmentItems : formattingItems;
  const defaultValue = type === "single"
    ? [contentType === "alignment" ? "center" : "bold"]
    : (contentType === "alignment" ? ["center"] : ["bold"]);

  return (
      <ToggleGroup
        defaultValue={defaultValue}
        variant={variant}
        size={size}
        disabled={false}
      >
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <ToggleGroupItem key={item.value} value={item.value}>
              <div className="flex items-center gap-2">
                {showIcons && <Icon className="h-4 w-4" />}
                <span className={showIcons ? "" : ""}>{item.label}</span>
              </div>
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
  );
}

// Preview props for prop explorer
export const toggleGroupPreviewProps = [
  {
    name: "type",
    type: "select",
    description: "Toggle group selection type - controls whether single or multiple items can be selected.",
    options: ["single", "multiple"],
    defaultValue: "single",
  },
  {
    name: "variant",
    type: "select",
    description: "Toggle group style variant - controls the visual appearance of the toggle items.",
    options: ["default", "outline"],
    defaultValue: "default",
  },
  {
    name: "size",
    type: "select",
    description: "Toggle group size variant - affects padding and text size of the toggle items.",
    options: ["sm", "default", "lg"],
    defaultValue: "default",
  },
  {
    name: "orientation",
    type: "select",
    description: "Toggle group orientation - controls whether items are arranged horizontally or vertically.",
    options: ["horizontal", "vertical"],
    defaultValue: "horizontal",
  },
  {
    name: "showIcons",
    type: "boolean",
    description: "Whether to show icons in toggle items - displays icons alongside text when enabled.",
    defaultValue: true,
  },
];
