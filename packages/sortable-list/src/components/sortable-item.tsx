"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cx } from "@patternmode/utils/cx";
import { GripVertical } from "lucide-react";
import React from "react";
import type { SortableListItem } from "../types";
import { LocalCheckbox } from "./local-checkbox";

export const SortableItem = ({
  item,
  showDragHandle,
  showCheckbox,
  size,
  onToggle,
}: {
  item: SortableListItem;
  showDragHandle: boolean;
  showCheckbox: boolean;
  size: "sm" | "base" | "lg";
  onToggle: (itemId: string, checked: boolean) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    disabled: item.disabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  } as React.CSSProperties;

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-sm py-1.5 px-2";
      case "lg":
        return "text-base py-3 px-4";
      default:
        return "text-sm py-2 px-3";
    }
  };

  return (
    <div
      className={cx(
        "flex items-center gap-2 border-zinc-200 border-b bg-white transition-all dark:border-zinc-800 dark:bg-zinc-950",
        getSizeClasses(),
        "hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
        isDragging && "z-50 opacity-50 shadow-xl",
        item.disabled && "cursor-not-allowed opacity-50"
      )}
      ref={setNodeRef}
      style={style}
    >
      {showDragHandle && (
        <div
          className={cx(
            "flex-shrink-0 touch-none text-zinc-400 dark:text-zinc-600",
            item.disabled ? "cursor-not-allowed" : "cursor-grab active:cursor-grabbing"
          )}
          {...attributes}
          {...listeners}
        >
          <GripVertical className={size === "sm" ? "h-3.5 w-3.5" : size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
        </div>
      )}
      {showCheckbox && (
        <LocalCheckbox
          checked={!!item.active}
          disabled={item.disabled}
          onCheckedChange={(checked: boolean) => onToggle(item.id, checked)}
        />
      )}
      <span className={cx("flex-1 select-none", item.disabled && "text-zinc-400 dark:text-zinc-600")}>{item.label}</span>
    </div>
  );
};

