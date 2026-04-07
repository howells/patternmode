"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { cn } from "@patternmode/ui/utils/cn";
import { Plus } from "lucide-react";
import { Dot } from "../../components/dot";
import { Icon } from "../../components/icon";
import { useTagSelectorContext } from "./tag-selector-context";
import { TagSelectorItem } from "./tag-selector-item";

interface TagSelectorListProps {
  className?: string;
  /** Custom empty state message */
  emptyMessage?: string;
}

/**
 * TagSelectorList - Scrollable list of tag items with drag-to-reorder support.
 * Shows filtered tags based on search query, with "Create" option when no match.
 */
export function TagSelectorList({
  emptyMessage = "No tags found.",
  className,
}: TagSelectorListProps) {
  const {
    tags,
    value,
    searchQuery,
    allowCreate,
    allowReorder,
    showColorPicker,
    colorPalette,
    pendingColor,
    listboxId,
    setPendingColor,
    createTag,
    reorderTags,
  } = useTagSelectorContext();

  // Filter tags based on search query
  const filteredTags = searchQuery
    ? tags.filter((tag) =>
        tag.label.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : tags;

  // Check if search query matches any existing tag
  const exactMatch = tags.some(
    (tag) => tag.label.toLowerCase() === searchQuery.toLowerCase(),
  );
  const showCreateOption = allowCreate && searchQuery && !exactMatch;

  // dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = tags.findIndex((tag) => tag.id === active.id);
      const newIndex = tags.findIndex((tag) => tag.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newTags = [...tags];
        const [removed] = newTags.splice(oldIndex, 1);
        if (removed) {
          newTags.splice(newIndex, 0, removed);
          reorderTags(newTags);
        }
      }
    }
  };

  const selectedIds = new Set(value.map((t) => t.id));

  const handleCreateTag = () => {
    if (searchQuery.trim()) {
      createTag(searchQuery.trim());
    }
  };

  // Render content based on state
  const renderContent = () => {
    if (filteredTags.length === 0 && !showCreateOption) {
      return (
        <div className="py-6 text-center text-muted-foreground text-sm">
          {emptyMessage}
        </div>
      );
    }

    return (
      <>
        {/* Create option */}
        {showCreateOption && (
          <div className="flex flex-col gap-1.5 rounded-xl bg-muted/50 px-4 py-2.5">
            <button
              className="flex w-full items-center gap-2 text-left transition-colors hover:opacity-80"
              onClick={handleCreateTag}
              type="button"
            >
              <span className="flex-1 truncate text-sm">
                Create &ldquo;{searchQuery}&rdquo;
              </span>
              <Icon
                className="shrink-0 text-muted-foreground"
                icon={Plus}
                size="xs"
              />
            </button>
            {showColorPicker && colorPalette.length > 0 && (
              <div className="flex items-center gap-1.5">
                {colorPalette.map((color) => (
                  <button
                    className={cn(
                      "rounded-full p-0.5 transition-colors",
                      pendingColor === color
                        ? "ring-2 ring-foreground ring-offset-1"
                        : "hover:ring-2 hover:ring-muted-foreground hover:ring-offset-1",
                    )}
                    key={color}
                    onClick={() =>
                      setPendingColor(
                        pendingColor === color ? undefined : color,
                      )
                    }
                    type="button"
                  >
                    <Dot size="xs" variant={color} />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tag items */}
        {allowReorder ? (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            <SortableContext
              items={filteredTags.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              {filteredTags.map((tag) => (
                <TagSelectorItem
                  isSelected={selectedIds.has(tag.id)}
                  key={tag.id}
                  tag={tag}
                />
              ))}
            </SortableContext>
          </DndContext>
        ) : (
          filteredTags.map((tag) => (
            <TagSelectorItem
              isSelected={selectedIds.has(tag.id)}
              key={tag.id}
              tag={tag}
            />
          ))
        )}
      </>
    );
  };

  return (
    <div
      className={cn(
        "flex max-h-[300px] flex-col overflow-y-auto p-1",
        className,
      )}
      data-component="tag-selector-list"
      data-slot="tag-selector-list"
      id={listboxId}
      role="listbox"
    >
      {renderContent()}
    </div>
  );
}
