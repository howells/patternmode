"use client";

import React from "react";
import { Input } from "./component";

export type InputPreviewProps = {
  placeholder?: string;
  size?: "xs" | "sm" | "base" | "lg";
  type?: React.HTMLInputTypeAttribute;
  hasError?: boolean;
  disabled?: boolean;
};

export function InputPreview({ placeholder = "Enter text...", size = "base", type = "text", hasError = false, disabled = false }: InputPreviewProps) {
  return (
    <div className="p-6">
      <Input placeholder={placeholder} size={size} type={type} hasError={hasError} disabled={disabled} />
    </div>
  );
}

export const inputPreviewProps = [
  { name: "placeholder", type: "string", defaultValue: "Enter text..." },
  { name: "size", type: "select", options: ["xs", "sm", "base", "lg"], defaultValue: "base" },
  { name: "type", type: "select", options: ["text", "email", "password", "search", "number"], defaultValue: "text" },
  { name: "hasError", type: "boolean", defaultValue: false },
  { name: "disabled", type: "boolean", defaultValue: false },
];

