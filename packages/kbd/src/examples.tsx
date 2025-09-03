"use client";

import { Kbd } from "./component";

export const DefaultExample = () => <Kbd>K</Kbd>;

export const CombinationExample = () => (
  <div className="flex items-center gap-4">
    <Kbd keys={["mod", "k"]}>Search</Kbd>
    <Kbd keys={["mod", "shift", "p"]}>Command palette</Kbd>
    <Kbd keys={["ctrl", "c"]}>Copy</Kbd>
  </div>
);

export const SizesExample = () => (
  <div className="flex items-center gap-4">
    <Kbd size="xs">Esc</Kbd>
    <Kbd size="sm">Esc</Kbd>
    <Kbd size="base">Esc</Kbd>
    <Kbd size="lg">Esc</Kbd>
  </div>
);

export const VariantExample = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-4">
      <span className="min-w-16 text-sm text-zinc-600 dark:text-zinc-400">
        Default:
      </span>
      <Kbd variant="default">⌘K</Kbd>
    </div>
    <div className="flex items-center gap-4 rounded bg-zinc-900 p-3">
      <span className="min-w-16 text-sm text-white">Dark button:</span>
      <Kbd variant="onDarkButton">⌘K</Kbd>
    </div>
    <div className="flex items-center gap-4 rounded bg-zinc-100 p-3">
      <span className="min-w-16 text-sm text-zinc-900">Light button:</span>
      <Kbd variant="onLightButton">⌘K</Kbd>
    </div>
  </div>
);
