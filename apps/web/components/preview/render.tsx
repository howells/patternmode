import type { ComponentType } from "react";

interface PreviewRenderProps {
  Component: ComponentType;
}

export function PreviewRender({ Component }: PreviewRenderProps) {
  return (
    <div className="flex min-h-[120px] items-center justify-center rounded-lg border bg-fd-background p-6">
      <Component />
    </div>
  );
}
