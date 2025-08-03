"use client";

import type { ButtonProps } from "./component";
import { Save, Download, Plus, Settings } from "lucide-react";
import React from "react";
import { Button } from "./component";

export function ButtonExample(props: ButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // Simulate an async operation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Button
      leftIcon={Save}
      isLoading={isLoading}
      loadingText="Saving..."
      onClick={handleClick}
      {...props}
    >
      {props.children || "Save Changes"}
    </Button>
  );
}

// Preview props for prop explorer
export const ButtonPreviewProps = [
  {
    name: "children",
    type: "string",
    description: "Button text content.",
    defaultValue: "Save Changes",
  },
  {
    name: "variant",
    type: "select",
    description: "Visual style variant of the button.",
    options: ["default", "primary", "secondary", "ghost", "outline", "destructive"],
    defaultValue: "default",
  },
  {
    name: "size",
    type: "select",
    description: "Size variant affecting padding and text size.",
    options: ["xs", "sm", "default", "lg", "icon-xs", "icon-sm", "icon", "icon-lg"],
    defaultValue: "default",
  },
  {
    name: "leftIcon",
    type: "select",
    description: "Icon component to display on the left side.",
    options: [
      { label: "None", value: null },
      { label: "Save", value: Save },
      { label: "Download", value: Download },
      { label: "Plus", value: Plus },
      { label: "Settings", value: Settings },
    ],
    defaultValue: Save,
  },
  {
    name: "rightIcon",
    type: "select",
    description: "Icon component to display on the right side.",
    options: [
      { label: "None", value: null },
      { label: "Save", value: Save },
      { label: "Download", value: Download },
      { label: "Plus", value: Plus },
      { label: "Settings", value: Settings },
    ],
    defaultValue: null,
  },
  {
    name: "isLoading",
    type: "boolean",
    description: "Whether the button is in a loading state.",
    defaultValue: false,
  },
  {
    name: "loadingText",
    type: "string",
    description: "Text to display when loading.",
    defaultValue: "Saving...",
  },
  {
    name: "disabled",
    type: "boolean",
    description: "Whether the button is disabled.",
    defaultValue: false,
  },
  {
    name: "fullWidth",
    type: "boolean",
    description: "Whether the button should take full width.",
    defaultValue: false,
  },
  {
    name: "rounded",
    type: "boolean",
    description: "Whether the button should have rounded corners.",
    defaultValue: false,
  },
  {
    name: "shadow",
    type: "boolean",
    description: "Whether the button should have a shadow.",
    defaultValue: false,
  },
  {
    name: "textAlign",
    type: "select",
    description: "Text alignment within the button.",
    options: ["left", "center", "right"],
    defaultValue: "center",
  },
  {
    name: "kbd",
    type: "string",
    description: "Keyboard shortcut to display (e.g., 'cmd+s').",
    defaultValue: "",
  },
];
