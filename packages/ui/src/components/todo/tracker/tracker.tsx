"use client";

// Tremor Tracker [v1.0.0] - Base UI

/**
 * Tracker Components.
 *
 * Visual progress tracker components for displaying steps, stages, or progress through
 * a process using colored blocks. Each block can have custom colors, tooltips, and
 * hover effects to provide detailed information about different stages.
 *
 * Features:
 * - Customizable color blocks for different states
 * - Interactive tooltips with hover/click activation
 * - Hover effects for enhanced interactivity
 * - Flexible data input (array or JSON string)
 * - Responsive design with proper spacing
 * - Dark mode support
 * - Smooth transitions and animations.
 *
 * @category data
 * @icon Target
 * @example
 * ```tsx
 * // Basic progress tracker
 * const progressData = [
 *   { color: "bg-green-500", tooltip: "Completed: Step 1" },
 *   { color: "bg-green-500", tooltip: "Completed: Step 2" },
 *   { color: "bg-yellow-500", tooltip: "In Progress: Step 3" },
 *   { color: "bg-gray-300", tooltip: "Pending: Step 4" },
 * ];
 *
 * <Tracker data={progressData} hoverEffect />
 *
 * // Project milestone tracker
 * const milestones = [
 *   { color: "bg-blue-500", tooltip: "Planning Phase: Complete" },
 *   { color: "bg-blue-500", tooltip: "Design Phase: Complete" },
 *   { color: "bg-orange-500", tooltip: "Development: 75% Complete" },
 *   { color: "bg-gray-300", tooltip: "Testing: Not Started" },
 *   { color: "bg-gray-300", tooltip: "Deployment: Not Started" },
 * ];
 *
 * <Tracker data={milestones} defaultBackgroundColor="bg-gray-200" />
 *
 * // Task completion tracker
 * const taskData = [
 *   { color: "bg-emerald-500", tooltip: "Research: Done" },
 *   { color: "bg-emerald-500", tooltip: "Wireframes: Done" },
 *   { color: "bg-emerald-500", tooltip: "Prototyping: Done" },
 *   { color: "bg-amber-500", tooltip: "Development: In Progress" },
 *   { color: "bg-slate-300", tooltip: "Review: Pending" },
 *   { color: "bg-slate-300", tooltip: "Launch: Pending" },
 * ];
 *
 * <Tracker
 *   data={taskData}
 *   hoverEffect
 *   className="w-96"
 * />
 *
 * // Server status tracker
 * const serverStatus = [
 *   { color: "bg-green-500", tooltip: "Web Server: Online" },
 *   { color: "bg-green-500", tooltip: "Database: Online" },
 *   { color: "bg-red-500", tooltip: "Cache: Offline" },
 *   { color: "bg-green-500", tooltip: "CDN: Online" },
 * ];
 *
 * <Tracker data={serverStatus} />
 * ```
 */

import React from "react";

import { cx } from "../../../lib/utils";
import {
  PreviewCard,
  PreviewCardContent,
  PreviewCardTrigger,
} from "../preview-card/preview-card";

/**
 * Props for individual tracker blocks.
 *
 * Configuration for each block in the tracker including color, tooltip, and behavior.
 */
type TrackerBlockProps = {
  /**
   * Unique identifier for the block.
   */
  key?: string | number;
  /**
   * Tailwind CSS color class for the block background.
   */
  color?: string;
  /**
   * Tooltip text to display on hover/click.
   */
  tooltip?: string;
  /**
   * Whether to show hover effect on the block.
   */
  hoverEffect?: boolean;
  /**
   * Default background color when no color is specified.
   */
  defaultBackgroundColor?: string;
};

/**
 * Progress tracking component with visual indicators for completion status.
 *
 * @id tracker
 * @name Tracker
 * @icon Activity
 * @category charts
 * @component
 * @see {@link https://recharts.org/en-US/api}
 * @param props - Component properties.
 */
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

/**
 * Props for the main Tracker component.
 *
 * Configuration for the entire tracker including data and styling options.
 */
type TrackerProps = {
  /**
   * Array of block configurations or JSON string representation.
   */
  data: TrackerBlockProps[] | string;
  /**
   * Default background color for blocks without specified color.
   */
  defaultBackgroundColor?: string;
  /**
   * Enable hover effects on all blocks.
   */
  hoverEffect?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Main tracker component for displaying progress blocks.
 *
 * Renders a horizontal row of colored blocks representing different stages
 * or progress through a process. Supports flexible data input and interactive
 * tooltips for detailed information about each stage.
 *
 * @param data - Array of block configurations or JSON string.
 * @param defaultBackgroundColor - Default color for blocks without specified color.
 * @param hoverEffect - Enable hover effects on blocks.
 * @param className - Additional CSS classes.
 */
/**
 * Progress tracking component with visual indicators for completion status.
 *
 * @id tracker
 * @name Tracker
 * @icon Activity
 * @category charts
 * @component
 * @see {@link https://recharts.org/en-US/api}
 * @param props - Component properties.
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

export { Tracker, type TrackerBlockProps, type TrackerProps };
