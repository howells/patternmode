"use client";

import type { Size } from "@patternmode/config/sizes";
import { sizes } from "@patternmode/config/sizes";
import { IconSelect, useIconSelect } from "./component";

type IconSelectPreviewProps = { size?: Size };

export function IconSelectPreview({ size = "base" }: IconSelectPreviewProps) {
  const { value, setValue } = useIconSelect("Camera");
  return (
    <div className="p-4 space-y-3">
      <div className="space-y-2">
        <IconSelect value={value} onValueChange={setValue} placeholder="Choose an icon..." size={size} className="w-64" />
      </div>
    </div>
  );
}

export const iconSelectPreviewProps = [
  { name: "size", type: "select", description: "Size variant", options: Object.keys(sizes), defaultValue: "base" },
];
