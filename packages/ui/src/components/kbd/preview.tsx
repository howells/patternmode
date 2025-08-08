"use client";

import type { KbdProps } from "./types";
import React from "react";
import { Kbd } from "./component";
import { SIZES } from "../../constants/sizes";

export function KbdPreview(props: KbdProps) {
  return (
    <div className="flex items-center gap-4 p-4">
      <span className="text-sm text-zinc-600 dark:text-zinc-400">
        Keyboard shortcut:
      </span>
      <Kbd {...props} />
    </div>
  );
}

// Preview props for prop explorer
export const kbdPreviewProps = [
  {
    name: "children",
    type: "string",
    description: "Single key or text content to display.",
    defaultValue: "⌘K",
  },
  {
    name: "keys",
    type: "array",
    description: "Array of keys to display for complex key combinations.",
    defaultValue: ["cmd", "shift", "k"],
  },
  {
    name: "platform",
    type: "select",
    description: "Platform for modifier key display.",
    options: ["auto", "mac", "pc"],
    defaultValue: "auto",
  },
  {
    name: "variant",
    type: "select",
    description: "Visual variant for different contexts.",
    options: ["default", "onDarkButton", "onLightButton"],
    defaultValue: "default",
  },
  {
    name: "size",
    type: "select",
    description: "Size variant affecting padding and text size.",
    options: SIZES,
    defaultValue: "sm",
  },
];
