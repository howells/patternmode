"use client";

import { Popover } from "@base-ui/react/popover";
import { cn } from "cn";
import type { ReactNode } from "react";
import { useCallback, useState } from "react";

const CLAMP = {
  1: "patternmode-datagrid-clamp-1",
  2: "patternmode-datagrid-clamp-2",
  3: "patternmode-datagrid-clamp-3",
} as const;

type CutListener = (cut: boolean) => void;

const observedElements = new WeakMap<Element, CutListener>();
const pendingTargets = new Set<Element>();
let sharedObserver: ResizeObserver | null = null;
let flushFrame: number | null = null;

const flushMeasurements = () => {
  flushFrame = null;

  for (const target of pendingTargets) {
    const listener = observedElements.get(target);

    if (listener !== undefined) {
      listener(target.scrollHeight > target.clientHeight + 1);
    }
  }

  pendingTargets.clear();
};

const getSharedObserver = (): ResizeObserver | null => {
  if (typeof ResizeObserver === "undefined") {
    return null;
  }

  sharedObserver ??= new ResizeObserver((entries) => {
    for (const entry of entries) {
      pendingTargets.add(entry.target);
    }

    flushFrame ??= requestAnimationFrame(flushMeasurements);
  });

  return sharedObserver;
};

export interface DataGridCellTextProps {
  children: string;
  className?: string;
  /** What the popover shows instead of the whole text. */
  detail?: ReactNode;
  lines?: keyof typeof CLAMP;
}

/**
 * A cell's text, cut to one, two or three lines. Only when it is cut does it become
 * a button that opens the whole text, or `detail` in its place, so a short
 * value stays plain text. Uses a single shared `ResizeObserver` across all cells.
 */
export const DataGridCellText = ({
  children,
  className,
  detail,
  lines = 3,
}: DataGridCellTextProps) => {
  const [cut, setCut] = useState(false);

  // oxlint-disable-next-line react-doctor/react-compiler-no-manual-memoization -- consumers without React Compiler require stable ref callback identity to avoid ResizeObserver churn
  const measure = useCallback((element: HTMLSpanElement) => {
    const observer = getSharedObserver();
    observedElements.set(element, setCut);
    setCut(element.scrollHeight > element.clientHeight + 1);
    observer?.observe(element);

    return () => {
      observer?.unobserve(element);
      observedElements.delete(element);
      pendingTargets.delete(element);
    };
  }, []);

  const text = (
    <span className={cn(CLAMP[lines], "patternmode-datagrid-cell-text", className)} ref={measure}>
      {children}
    </span>
  );

  if (!cut) {
    return text;
  }

  return (
    <Popover.Root>
      <Popover.Trigger className="patternmode-datagrid-cell-text__trigger">{text}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner
          align="start"
          className="patternmode-datagrid-positioner"
          sideOffset={6}
        >
          <Popover.Popup className="patternmode-datagrid-popover patternmode-datagrid-cell-text__popup">
            {detail ?? <p className="patternmode-datagrid-cell-text__full">{children}</p>}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
};
