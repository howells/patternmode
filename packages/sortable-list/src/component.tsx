"use client";

import type { DragEndEvent } from "@dnd-kit/core";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cx } from "@patternmode/utils/cx";
import { GripVertical } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const LocalCheckbox = ({
  checked,
  onCheckedChange,
  disabled,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}) => (
  <input
    checked={checked}
    className="h-4 w-4 accent-blue-600"
    disabled={disabled}
    onChange={(e) => onCheckedChange(e.target.checked)}
    type="checkbox"
  />
);

import type { SortableListItem, SortableListProps } from "./types";

/**
 * Individual sortable item component
 */
const SortableItem = ({
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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    disabled: item.disabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  } as React.CSSProperties;

  const getSizeClasses = () => {
    // biome-ignore lint/nursery/noUnnecessaryConditions: explicit mapping by size
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
        // Dragging state
        isDragging && "z-50 opacity-50 shadow-xl",
        // Disabled state
        item.disabled && "cursor-not-allowed opacity-50"
      )}
      ref={setNodeRef}
      style={style}
    >
      {/* Drag Handle */}
      {showDragHandle && (
        <div
          className={cx(
            "flex-shrink-0 touch-none text-zinc-400 dark:text-zinc-600",
            item.disabled
              ? "cursor-not-allowed"
              : "cursor-grab active:cursor-grabbing"
          )}
          {...attributes}
          {...listeners}
        >
          <GripVertical
            className={
              size === "sm"
                ? "h-3.5 w-3.5"
                : size === "lg"
                  ? "h-5 w-5"
                  : "h-4 w-4"
            }
          />
        </div>
      )}

      {/* Checkbox */}
      {showCheckbox && (
        <LocalCheckbox
          checked={!!item.active}
          disabled={item.disabled}
          onCheckedChange={(checked: boolean) => onToggle(item.id, checked)}
        />
      )}

      {/* Label */}
      <span
        className={cx(
          "flex-1 select-none",
          item.disabled && "text-zinc-400 dark:text-zinc-600"
        )}
      >
        {item.label}
      </span>
    </div>
  );
};

/**
 * A sortable list component with checkboxes and drag-and-drop reordering
 */
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

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Update internal state when props change
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over || active.id === over.id) {
        return;
      }

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
      const newItems = items.map((item) =>
        item.id === itemId ? { ...item, active: checked } : item
      );
      setItems(newItems);
      onChange?.(newItems);
    },
    [items, onChange]
  );

  if (!allowReorder) {
    // Render without DnD context if reordering is disabled
    return (
      <div className={cx("w-full", className)} data-testid="sortable-list">
        {items.map((item) => (
          <div
            className={cx(
              "flex items-center gap-2 border-zinc-200 border-b transition-all dark:border-zinc-800",
              size === "sm"
                ? "px-2 py-1.5 text-sm"
                : size === "lg"
                  ? "px-4 py-3 text-base"
                  : "px-3 py-2 text-sm",
              "hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
              item.disabled && "cursor-not-allowed opacity-50"
            )}
            key={item.id}
          >
            {showCheckbox && (
              <LocalCheckbox
                checked={!!item.active}
                disabled={item.disabled}
                onCheckedChange={(checked: boolean) =>
                  handleToggle(item.id, checked)
                }
              />
            )}
            <span
              className={cx(
                "flex-1 select-none",
                item.disabled && "text-zinc-400 dark:text-zinc-600"
              )}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cx("w-full", className)} data-testid="sortable-list">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
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
