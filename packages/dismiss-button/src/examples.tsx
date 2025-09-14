"use client";

import { Trash2, X } from "lucide-react";
import { DismissButton } from ".";

export const DefaultExample = () => (
  <DismissButton
    onClick={() => {
      /* noop */
    }}
  />
);

export const SizesExample = () => (
  <div className="flex items-center gap-2">
    <DismissButton size="sm" />
    <DismissButton size="base" />
    <DismissButton size="lg" />
  </div>
);

export const CustomIconExample = () => (
  <div className="flex items-center gap-2">
    <DismissButton icon={Trash2} />
    <DismissButton icon={X} />
  </div>
);

export const PositionedExample = () => (
  <div className="flex items-center gap-2">
    <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-2 py-1 text-sm">
      Item
      <DismissButton size="sm" />
    </span>
  </div>
);

export const InteractiveExample = () => (
  <div className="flex items-center gap-2">
    <DismissButton onClick={() => alert("Removed")} />
  </div>
);
