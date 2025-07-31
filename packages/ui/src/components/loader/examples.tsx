import { Loader } from "@patternmode/ui";
import React from "react";

export function DefaultExample() {
  return <Loader aria-label="Loading" />;
}

export function SizesExample() {
  return (
    <div className="flex items-center gap-4">
      <Loader size="xs" aria-label="Loading" />
      <Loader size="sm" aria-label="Loading" />
      <Loader size="base" aria-label="Loading" />
      <Loader size="lg" aria-label="Loading" />
      <Loader size="xl" aria-label="Loading" />
    </div>
  );
}

export function WithTextExample() {
  return (
    <div className="flex items-center gap-2">
      <Loader size="sm" aria-label="Loading content" />
      <span className="text-sm text-zinc-600">Loading...</span>
    </div>
  );
}
export const /**
              *
              */
  LoaderExample = DefaultExample;
