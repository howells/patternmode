"use client";

import { ComboboxPreview } from "@patternmode/combobox/preview";

export default function ComboboxPage() {
  return (
    <div className="min-h-screen bg-white p-8 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-2">
          <h1 className="font-bold text-3xl text-zinc-900 dark:text-zinc-50">
            Combobox
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Searchable select component with single and multi-select support.
          </p>
        </header>

        <div className="mt-6 space-y-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Interactive combobox preview with configurable props.
          </p>
          <ComboboxPreview
            dataType="frameworks"
            placeholder="Test z-index layering..."
            size="base"
          />
          <ComboboxPreview
            dataType="languages"
            placeholder="Multi-select test..."
            size="base"
            variant="multi"
          />
        </div>
      </div>
    </div>
  );
}
