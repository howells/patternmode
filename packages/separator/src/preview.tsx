"use client";

import { Separator } from ".";

export function SeparatorPreview() {
  return (
    <div className="w-full space-y-3">
      <div className="text-sm text-zinc-600">Above</div>
      <Separator className="w-full" />
      <div className="text-sm text-zinc-600">Below</div>
    </div>
  );
}

export const separatorPreviewProps: readonly unknown[] = [];
