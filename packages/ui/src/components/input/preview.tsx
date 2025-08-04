"use client";

import type { InputProps } from "./component";
import { Lock, Mail, Search, User } from "lucide-react";
import React from "react";
import { Input } from "./component";

export function InputPreview(props: InputProps) {
  return <Input placeholder="Enter text..." {...props} />;
}

// Preview props for prop explorer
export const inputPreviewProps = [
  {
    name: "placeholder",
    type: "string",
    description: "Placeholder text shown when input is empty.",
    defaultValue: "Enter text...",
  },
  {
    name: "type",
    type: "select",
    description: "HTML input type for different input behaviors.",
    options: ["text", "email", "password", "search", "number", "tel", "url"],
    defaultValue: "text",
  },
  {
    name: "size",
    type: "select",
    description: "Size variant affecting padding and text size.",
    options: ["sm", "base", "lg"],
    defaultValue: "base",
  },
  {
    name: "prefixIcon",
    type: "select",
    description: "Icon component to display before the input.",
    options: [
      { label: "None", value: null },
      { label: "Search", value: Search },
      { label: "User", value: User },
      { label: "Mail", value: Mail },
      { label: "Lock", value: Lock },
    ],
    defaultValue: null,
  },
  {
    name: "suffixIcon",
    type: "select",
    description: "Icon component to display after the input.",
    options: [
      { label: "None", value: null },
      { label: "Search", value: Search },
      { label: "User", value: User },
      { label: "Mail", value: Mail },
      { label: "Lock", value: Lock },
    ],
    defaultValue: null,
  },
  {
    name: "prefixText",
    type: "string",
    description: "Text content to display before the input.",
    defaultValue: "",
  },
  {
    name: "suffixText",
    type: "string",
    description: "Text content to display after the input.",
    defaultValue: "",
  },
  {
    name: "prefixStyling",
    type: "boolean",
    description: "Whether to apply styling to prefix content.",
    defaultValue: false,
  },
  {
    name: "suffixStyling",
    type: "boolean",
    description: "Whether to apply styling to suffix content.",
    defaultValue: false,
  },
  {
    name: "hasError",
    type: "boolean",
    description: "Whether to display error styling.",
    defaultValue: false,
  },
  {
    name: "disabled",
    type: "boolean",
    description: "Whether the input is disabled.",
    defaultValue: false,
  },
  {
    name: "minimal",
    type: "boolean",
    description: "Minimal variant removing border and shadow.",
    defaultValue: false,
  },
  {
    name: "enableStepper",
    type: "boolean",
    description: "Whether to show steppers on number inputs.",
    defaultValue: true,
  },
];
