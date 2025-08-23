"use client";

import { Separator } from "./component";

export function SeparatorPreview() {
  return (
    <div className="space-y-3">
      <div className="text-sm text-zinc-600">Above</div>
      <Separator />
      <div className="text-sm text-zinc-600">Below</div>
    </div>
  );
}

export const separatorPreviewProps = [];

