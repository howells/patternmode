"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@patternmode/ui/utils/cn";
import { Check, Ellipsis, GripVertical, Pencil, Trash2 } from "lucide-react";
import type * as React from "react";
import { useEffect, useRef } from "react";
import { Dot } from "../../components/dot";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/dropdown-menu";
import { Icon } from "../../components/icon";
import {
  type TagColor,
  type TagData,
  useTagSelectorContext,
} from "./tag-selector-context";

interface TagSelectorItemProps {
  /** Whether this tag is selected */
  isSelected: boolean;
  /** The tag data */
  tag: TagData;
}

/**
 * TagSelectorItem - A draggable tag item with grip handle and action menu.
 * Supports inline editing, selection, and drag-to-reorder.
 */
/**
 * ColorSwatches - A row of color dots for picking a tag color.
 */
function ColorSwatches({
  palette,
  selected,
  onSelect,
}: {
  palette: TagColor[];
  selected: TagColor | undefined;
  onSelect: (color: TagColor | undefined) => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {palette.map((color) => (
        <button
          className={cn(
            "rounded-full p-0.5 transition-colors",
            selected === color
              ? "ring-2 ring-foreground ring-offset-1"
              : "hover:ring-2 hover:ring-muted-foreground hover:ring-offset-1",
          )}
          key={color}
          onClick={() => onSelect(selected === color ? undefined : color)}
          type="button"
        >
          <Dot size="xs" variant={color} />
        </button>
      ))}
    </div>
  );
}

export function TagSelectorItem({ tag, isSelected }: TagSelectorItemProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    editingId,
    editValue,
    allowReorder,
    allowManage,
    showColorPicker,
    colorPalette,
    pendingColor,
    setPendingColor,
    toggleTag,
    startEditing,
    setEditValue,
    confirmEdit,
    cancelEdit,
    deleteTag,
  } = useTagSelectorContext();

  const isEditing = editingId === tag.id;

  // dnd-kit sortable hook
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: tag.id,
    disabled: !allowReorder || isEditing,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      confirmEdit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
  };

  const handleItemClick = () => {
    if (!isEditing) {
      toggleTag(tag);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full px-4 py-2.5 transition-colors",
        "hover:bg-muted/50",
        isDragging && "opacity-50",
      )}
      data-component="tag-selector-item"
      data-slot="tag-selector-item"
      ref={setNodeRef}
      style={style}
    >
      {/* Drag handle */}
      {allowReorder && (
        <button
          className={cn(
            "shrink-0 cursor-grab touch-none text-muted-foreground",
            "hover:text-foreground",
            isDragging && "cursor-grabbing",
          )}
          type="button"
          {...attributes}
          {...listeners}
        >
          <Icon icon={GripVertical} size="xs" />
        </button>
      )}

      {/* Color dot (when tag has color and not editing) */}
      {!isEditing && tag.color && <Dot size="xs" variant={tag.color} />}

      {/* Label or edit input */}
      {isEditing ? (
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <input
            className="min-w-0 bg-transparent text-sm outline-none"
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            type="text"
            value={editValue}
          />
          {showColorPicker && colorPalette.length > 0 && (
            <ColorSwatches
              onSelect={setPendingColor}
              palette={colorPalette}
              selected={pendingColor}
            />
          )}
        </div>
      ) : (
        <button
          className="min-w-0 flex-1 truncate text-left text-sm"
          onClick={handleItemClick}
          type="button"
        >
          {tag.label}
        </button>
      )}

      {/* Selection indicator or confirm button */}
      {isEditing && (
        <button
          className="shrink-0 text-muted-foreground hover:text-foreground"
          onClick={confirmEdit}
          type="button"
        >
          <Icon icon={Check} size="xs" />
        </button>
      )}
      {!isEditing && isSelected && (
        <Icon className="shrink-0 text-foreground" icon={Check} size="xs" />
      )}

      {/* Actions menu (only when not editing and allowManage) */}
      {!isEditing && allowManage && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="shrink-0 text-muted-foreground hover:text-foreground"
              onClick={(e) => e.stopPropagation()}
              type="button"
            >
              <Icon icon={Ellipsis} size="xs" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={4}>
            <DropdownMenuItem
              icon={Pencil}
              onSelect={() => startEditing(tag.id)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              icon={Trash2}
              onSelect={() => deleteTag(tag.id)}
              variant="destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Ellipsis placeholder when not managing (for visual consistency) */}
      {!(isEditing || allowManage || isSelected) && (
        <span className="w-4 shrink-0" />
      )}
    </div>
  );
}
