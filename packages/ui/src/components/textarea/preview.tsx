"use client";

import React from "react";
import { Textarea } from "./component";

// Props that users can configure in the prop explorer
export type TextareaPreviewProps = {
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  className?: string;
  hasError?: boolean;
  autoResize?: boolean;
  /**
   * Size variant determining minimum height and padding.
   * Controls the base size to align with other form controls.
   */
  size?: "xs" | "sm" | "base" | "lg";
  /**
   * Whether the textarea should take full width of its container.
   * When false, applies max-w-sm constraint for better UX in wide layouts.
   */
  fullWidth?: boolean;
};

// Preview props for prop explorer
export const TextareaPreviewProps = [
  {
    name: "placeholder",
    type: "string",
    description: "Placeholder text for the textarea.",
    defaultValue: "Enter your text here...",
  },
  {
    name: "disabled",
    type: "boolean",
    description: "Whether the textarea is disabled.",
    defaultValue: false,
  },
  {
    name: "readOnly",
    type: "boolean",
    description: "Whether the textarea is read-only.",
    defaultValue: false,
  },
  {
    name: "rows",
    type: "number",
    description: "Number of visible text lines.",
    defaultValue: 3,
  },
  {
    name: "hasError",
    type: "boolean",
    description: "Whether to display error styling.",
    defaultValue: false,
  },
  {
    name: "autoResize",
    type: "boolean",
    description: "Whether the textarea should automatically resize.",
    defaultValue: true,
  },
  {
    name: "fullWidth",
    type: "boolean",
    description: "Whether to take full width of container.",
    defaultValue: false,
  },
];

export function TextareaExample(props: TextareaPreviewProps) {
  const {
    placeholder = "Enter your text here...",
    disabled = false,
    readOnly = false,
    rows = 3,
    className = "",
    hasError = false,
    autoResize = true,
    fullWidth = false,
  } = props;

  // Define allowed props for security
  const allowedProps = [
    "placeholder",
    "disabled",
    "readOnly",
    "rows",
    "className",
    "hasError",
    "autoResize",
    "fullWidth",
  ];

  // Safe props filtering - only pass known safe props
  const safeProps = {
    placeholder,
    disabled,
    readOnly,
    rows,
    className,
    hasError,
    autoResize,
    fullWidth,
  };

  return <Textarea {...safeProps} />;
}
