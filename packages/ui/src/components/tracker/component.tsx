"use client";

// Tremor Tracker [v1.0.0] - Base UI

import React from "react";

import { cx } from "../../lib/utils";
import {
  PreviewCard,
  PreviewCardContent,
  PreviewCardTrigger,
} from "../preview-card/component";

/**
 * Configuration for individual tracker blocks.
 */
type TrackerBlockProps = {
  /**
   * Unique identifier for the block.
   */
  key?: string | number;
  /**
   * Tailwind CSS color class for the block background.
   * Example: "bg-green-500", "bg-red-400", etc.
   */
  color?: string;
  /**
   * Tooltip text to display when the block is hovered or clicked.
   */
  tooltip?: string;
  /**
   * Whether to show hover effect (opacity change) on the block.
   */
  hoverEffect?: boolean;
  /**
   * Default background color when no color is specified for this block.
   */
  defaultBackgroundColor?: string;
};

const Block = ({
  color,
  tooltip,
  defaultBackgroundColor,
  hoverEffect,
}: TrackerBlockProps) => {
  const [open, setOpen] = React.useState(false);
  return (
    <PreviewCard open={open} onOpenChange={setOpen}>
      <PreviewCardTrigger
        onClick={() => setOpen(true)}
        className="size-full overflow-hidden px-[0.5px] transition first:rounded-l-[4px] first:pl-0 last:rounded-r-[4px] last:pr-0 sm:px-px"
      >
        <div
          className={cx(
            "size-full rounded-[1px]",
            color || defaultBackgroundColor,
            hoverEffect ? "hover:opacity-50" : "",
          )}
        />
      </PreviewCardTrigger>
      <PreviewCardContent
        side="top"
        align="center"
        sideOffset={10}
        className={cx(
          // base
          "w-auto rounded-md px-2 py-1 text-sm shadow-md",
          // text color
          "text-white dark:text-zinc-900",
          // background color
          "bg-zinc-900 dark:bg-zinc-50",
        )}
      >
        {tooltip}
      </PreviewCardContent>
    </PreviewCard>
  );
};

Block.displayName = "Block";

type TrackerProps = {
  /**
   * Array of block configurations for the tracker. Each block represents a segment with color, tooltip, and behavior settings.
   */
  data: TrackerBlockProps[] | string;
  /**
   * Default background color for blocks that don't have a specific color defined.
   * @default "bg-zinc-400 dark:bg-zinc-400"
   */
  defaultBackgroundColor?: string;
  /**
   * Enable hover effects (opacity change) on all blocks in the tracker.
   * @default false
   */
  hoverEffect?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Visual progress tracker component for displaying steps, stages, or progress through a process using colored blocks.
 */
const Tracker = (
  { ref: forwardedRef, data = [], defaultBackgroundColor = "bg-zinc-400 dark:bg-zinc-400", className, hoverEffect, ...props }: TrackerProps & { ref?: React.RefObject<HTMLDivElement | null> },
) => {
  // Handle prop transformation - convert string to array if needed
  let trackerData: TrackerBlockProps[];

  if (typeof data === "string") {
    try {
      trackerData = JSON.parse(data);
    }
    catch {
      trackerData = [];
    }
  }
  else if (Array.isArray(data)) {
    trackerData = data;
  }
  else {
    trackerData = [];
  }

  return (
    <div
      ref={forwardedRef}
      className={cx("group flex h-8 w-full items-center", className)}
      {...props}
    >
      {trackerData.map((blockProps, index) => (
        <Block
          key={blockProps.key ?? index}
          defaultBackgroundColor={defaultBackgroundColor}
          hoverEffect={hoverEffect}
          {...blockProps}
        />
      ))}
    </div>
  );
};

Tracker.displayName = "Tracker";

export { Tracker };

export type { TrackerBlockProps, TrackerProps };
