"use client";

import type { Size } from "@patternmode/config/sizes";
import { sizes } from "@patternmode/config/sizes";
import { IconSelect, useIconSelect } from ".";

type IconSelectPreviewProps = { size?: Size };

export function IconSelectPreview({ size = "base" }: IconSelectPreviewProps) {
  const { value, setValue } = useIconSelect("Camera");
  return (
    <IconSelect
      className="w-64"
      onValueChange={setValue}
      placeholder="Choose an icon..."
      size={size}
      value={value}
    />
  );
}

export const iconSelectPreviewProps = [
  {
    name: "size",
    type: "select",
    description: "Size variant",
    options: Object.keys(sizes),
    defaultValue: "base",
  },
];
