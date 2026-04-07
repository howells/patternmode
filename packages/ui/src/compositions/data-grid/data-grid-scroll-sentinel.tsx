"use client";

import { useEffect, useRef } from "react";

interface DataGridScrollSentinelProps {
  /** Called when the sentinel element becomes visible (scroll reaches bottom). */
  onEndReached: () => void;
  /** Distance from bottom (px) at which to trigger onEndReached. Default 200. */
  threshold?: number;
}

/**
 * Invisible sentinel element that uses IntersectionObserver to detect
 * when the user has scrolled near the bottom of the DataGrid.
 * Used internally by DataGridTable for infinite scroll support.
 *
 * @example
 * ```tsx
 * <DataGridScrollSentinel
 *   onEndReached={() => fetchNextPage()}
 *   threshold={300}
 * />
 * ```
 */
function DataGridScrollSentinel({
  onEndReached,
  threshold = 200,
}: DataGridScrollSentinelProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          onEndReached();
        }
      },
      { rootMargin: `${threshold}px` },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [onEndReached, threshold]);

  return <div ref={ref} data-slot="scroll-sentinel" className="h-px" />;
}

export type { DataGridScrollSentinelProps };
export { DataGridScrollSentinel };
