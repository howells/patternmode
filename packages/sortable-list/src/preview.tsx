"use client";

import { useState } from "react";
import { SortableList } from ".";
import type { SortableListItem, SortableListProps } from "./types";

export function SortableListPreview(props: Partial<SortableListProps>) {
  const [items, setItems] = useState<SortableListItem[]>(
    props.items || [
      { id: "1", label: "ID", active: true },
      { id: "2", label: "URI", active: true },
      { id: "3", label: "Navigation Label", active: true },
      { id: "4", label: "Link", active: true },
      { id: "5", label: "Ancestors", active: false },
      { id: "6", label: "Authors", active: false },
      { id: "7", label: "Date Created", active: false },
      { id: "8", label: "Date Updated", active: false },
    ]
  );

  return (
    <div className="mx-auto w-full max-w-md">
      <SortableList
        allowReorder={props.allowReorder ?? true}
        className={props.className}
        items={items}
        onChange={setItems}
        showCheckbox={props.showCheckbox ?? true}
        showDragHandle={props.showDragHandle ?? true}
        size={props.size ?? "base"}
      />

      <div className="mt-6 rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900">
        <h4 className="mb-2 font-medium text-sm">Active Items (in order):</h4>
        <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
          {items
            .filter((item) => item.active)
            .map((item, index) => (
              <li key={item.id}>
                {index + 1}. {item.label}
              </li>
            ))}
        </ul>
        {items.filter((item) => item.active).length === 0 && (
          <p className="text-sm text-zinc-500 italic">No items selected</p>
        )}
      </div>
    </div>
  );
}

export const sortableListPreviewProps = [
  {
    name: "showDragHandle",
    type: "boolean",
    description: "Whether to show the drag handle for reordering.",
    defaultValue: true,
  },
  {
    name: "showCheckbox",
    type: "boolean",
    description: "Whether to show checkboxes for selection.",
    defaultValue: true,
  },
  {
    name: "allowReorder",
    type: "boolean",
    description: "Whether to allow drag-and-drop reordering.",
    defaultValue: true,
  },
  {
    name: "size",
    type: '"sm" | "base" | "lg"',
    description: "Size variant of the list items.",
    defaultValue: "base",
  },
];
