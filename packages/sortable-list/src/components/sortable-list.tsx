"use client";

import type { DragEndEvent } from "@dnd-kit/core";
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { cx } from "@patternmode/utils/cx";
import { useCallback, useEffect, useState } from "react";
import type { SortableListItem, SortableListProps } from "../types";
import { SortableItem } from "./sortable-item";

export const SortableList = ({
  items: initialItems,
  onChange,
  showDragHandle = true,
  allowReorder = true,
  showCheckbox = true,
  className,
  size = "base",
}: SortableListProps) => {
  const [items, setItems] = useState<SortableListItem[]>(initialItems);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      onChange?.(newItems);
    },
    [items, onChange]
  );

  const handleToggle = useCallback(
    (itemId: string, checked: boolean) => {
      const newItems = items.map((item) => (item.id === itemId ? { ...item, active: checked } : item));
      setItems(newItems);
      onChange?.(newItems);
    },
    [items, onChange]
  );

  if (!allowReorder) {
    return (
      <div className={cx("w-full", className)} data-testid="sortable-list">
        {items.map((item) => (
          <div
            className={cx(
              "flex items-center gap-2 border-zinc-200 border-b transition-all dark:border-zinc-800",
              size === "sm" ? "px-2 py-1.5 text-sm" : size === "lg" ? "px-4 py-3 text-base" : "px-3 py-2 text-sm",
              "hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
              item.disabled && "cursor-not-allowed opacity-50"
            )}
            key={item.id}
          >
            {showCheckbox && (
              <input
                checked={!!item.active}
                className="h-4 w-4 accent-blue-600"
                disabled={item.disabled}
                onChange={(e) => handleToggle(item.id, e.target.checked)}
                type="checkbox"
              />
            )}
            <span className={cx("flex-1 select-none", item.disabled && "text-zinc-400 dark:text-zinc-600")}>{item.label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cx("w-full", className)} data-testid="sortable-list">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
        <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <SortableItem
              item={item}
              key={item.id}
              onToggle={handleToggle}
              showCheckbox={showCheckbox}
              showDragHandle={showDragHandle && allowReorder}
              size={size}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

SortableList.displayName = "SortableList";

