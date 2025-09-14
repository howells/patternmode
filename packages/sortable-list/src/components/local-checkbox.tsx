"use client";

import React from "react";

export const LocalCheckbox = ({
  checked,
  onCheckedChange,
  disabled,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}) => (
  <input
    checked={checked}
    className="h-4 w-4 accent-blue-600"
    disabled={disabled}
    onChange={(e) => onCheckedChange(e.target.checked)}
    type="checkbox"
  />
);

