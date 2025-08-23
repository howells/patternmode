"use client";

import { SIZES } from "@patternmode/config/sizes";
import { AlertCircle, Check, Star, X } from "lucide-react";
import type { BadgeProps } from "./component";
import { Badge } from "./component";

export function BadgePreview(props: BadgeProps) {
  const handleDismiss = props.dismissible ? () => console.warn("Badge dismissed") : undefined;
  const { ref: _ref, ...badgeProps } = props as any;
  return (
    <Badge onDismiss={handleDismiss} {...(badgeProps as any)}>
      {props.children || "Badge"}
    </Badge>
  );
}

export const badgePreviewProps = [
  { name: "children", type: "string", description: "Badge text content.", defaultValue: "Badge" },
  {
    name: "variant",
    type: "select",
    description: "Visual style variant affecting color scheme.",
    options: [
      "default","neutral","success","info","warning","error","critical","red","orange","amber","yellow","lime","green","emerald","teal","cyan","sky","blue","indigo","violet","purple","fuchsia","pink","rose"
    ],
    defaultValue: "default",
  },
  { name: "size", type: "select", description: "Size variant affecting padding and text size.", options: SIZES, defaultValue: "base" },
  {
    name: "leftIcon", type: "select", description: "Left icon.",
    options: [{ label: "None", value: null }, { label: "Star", value: Star }, { label: "Check", value: Check }, { label: "Alert", value: AlertCircle }, { label: "X", value: X }],
    defaultValue: null,
  },
  {
    name: "rightIcon", type: "select", description: "Right icon.",
    options: [{ label: "None", value: null }, { label: "Star", value: Star }, { label: "Check", value: Check }, { label: "Alert", value: AlertCircle }, { label: "X", value: X }],
    defaultValue: null,
  },
  { name: "border", type: "boolean", description: "Show a border.", defaultValue: false },
  { name: "rounded", type: "boolean", description: "Pill shape.", defaultValue: false },
  { name: "statusDot", type: "boolean", description: "Show a status dot.", defaultValue: false },
  { name: "statusAnimated", type: "boolean", description: "Animate status dot.", defaultValue: false },
  { name: "dismissible", type: "boolean", description: "Can be dismissed.", defaultValue: false },
];

