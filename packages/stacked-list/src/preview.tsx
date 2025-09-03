"use client";

import { cx } from "@patternmode/utils/cx";
import type { StackedListProps } from "./component";
import { StackedList, StackedListItem } from "./component";

export function StackedListPreview(props: StackedListProps) {
  return (
    <StackedList {...props} className={cx("w-full")}>
      <StackedListItem>
        <div>John Doe</div>
        <div className="text-zinc-500">john@example.com</div>
      </StackedListItem>
      <StackedListItem>
        <div>Jane Smith</div>
        <div className="text-zinc-500">jane@example.com</div>
      </StackedListItem>
      <StackedListItem>
        <div>Bob Johnson</div>
        <div className="text-zinc-500">bob@example.com</div>
      </StackedListItem>
    </StackedList>
  );
}

// Preview props for prop explorer
export const stackedListPreviewProps = [
  {
    name: "showDividers",
    type: "boolean",
    description:
      "Whether to show dividers between items for visual separation.",
    defaultValue: true,
  },
  {
    name: "gap",
    type: "select",
    description: "Gap between items using 4px grid scale.",
    defaultValue: 0,
    options: [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "8",
      "10",
      "12",
      "16",
      "20",
      "24",
    ],
  },
  {
    name: "padding",
    type: "select",
    description: "Padding for each item using 4px grid scale.",
    defaultValue: 4,
    options: [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "8",
      "10",
      "12",
      "16",
      "20",
      "24",
    ],
  },
];
