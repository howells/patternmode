"use client";

import { getIconComponent } from "@patternmode/icons";
import React from "react";

export const SafeDynamicIcon = React.memo(
  ({ name, className, strokeWidth, fallback }: { name: string; className?: string; strokeWidth?: number; fallback?: React.ReactNode }) => {
    const fallbackElement = React.useMemo(
      () =>
        fallback || (
          <div className={`${className} flex shrink-0 items-center justify-center rounded bg-zinc-100 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400`}>
            ?
          </div>
        ),
      [className, fallback]
    );
    const IconComponent = getIconComponent(name);
    if (!IconComponent) return fallbackElement;
    return (
      <div className={`${className} flex shrink-0 items-center justify-center`} key={name}>
        <IconComponent className="h-5 w-5" strokeWidth={strokeWidth} />
      </div>
    );
  }
);

SafeDynamicIcon.displayName = "SafeDynamicIcon";

