"use client";

import type { BadgeProps } from "./component";
import { AlertCircle, Check, Star, X } from "lucide-react";
import React from "react";
import { Badge } from "./component";

export function BadgePreview(props: BadgeProps) {
  // Convert boolean to actual dismiss handler for preview
  const handleDismiss = props.dismissible
    ? () => console.warn("Badge dismissed")
    : undefined;

  const { ref: _ref, ...badgeProps } = props;

  return (
    <Badge
      onDismiss={handleDismiss}
      {...badgeProps}
    >
      {props.children || "Badge"}
    </Badge>
  );
}

// Preview props for prop explorer
export const badgePreviewProps = [
  {
    name: "children",
    type: "string",
    description: "Badge text content.",
    defaultValue: "Badge",
  },
  {
    name: "variant",
    type: "select",
    description: "Visual style variant affecting color scheme.",
    options: [
      "default",
      "neutral",
      "success",
      "info",
      "warning",
      "error",
      "critical",
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose",
    ],
    defaultValue: "default",
  },
  {
    name: "size",
    type: "select",
    description: "Size variant affecting padding and text size.",
    options: ["xs", "sm", "base", "lg"],
    defaultValue: "base",
  },
  {
    name: "leftIcon",
    type: "select",
    description: "Icon component to display on the left side.",
    options: [
      { label: "None", value: null },
      { label: "Star", value: Star },
      { label: "Check", value: Check },
      { label: "Alert", value: AlertCircle },
      { label: "X", value: X },
    ],
    defaultValue: null,
  },
  {
    name: "rightIcon",
    type: "select",
    description: "Icon component to display on the right side.",
    options: [
      { label: "None", value: null },
      { label: "Star", value: Star },
      { label: "Check", value: Check },
      { label: "Alert", value: AlertCircle },
      { label: "X", value: X },
    ],
    defaultValue: null,
  },
  {
    name: "border",
    type: "boolean",
    description: "Whether to show a border around the badge.",
    defaultValue: false,
  },
  {
    name: "rounded",
    type: "boolean",
    description: "Whether to use full border radius for a pill shape.",
    defaultValue: false,
  },
  {
    name: "statusDot",
    type: "boolean",
    description: "Whether to show a status dot instead of icons.",
    defaultValue: false,
  },
  {
    name: "statusAnimated",
    type: "boolean",
    description: "Whether to animate the status dot for active statuses.",
    defaultValue: false,
  },
  {
    name: "dismissible",
    type: "boolean",
    description: "Whether the badge can be dismissed.",
    defaultValue: false,
  },
];
