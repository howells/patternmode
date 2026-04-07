"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";
import { useCallback, useId, useMemo, useRef, useState } from "react";
import { Popover, PopoverTrigger } from "../../components/popover";
import type { TagSize } from "../../components/tag/tag-root";
import { TagSelectorContent } from "./tag-selector-content";
import {
  type TagColor,
  type TagData,
  TagSelectorContext,
  type TagSelectorContextValue,
} from "./tag-selector-context";
import { TagSelectorList } from "./tag-selector-list";
import { TagSelectorSearch } from "./tag-selector-search";
import { TagSelectorTrigger } from "./tag-selector-trigger";

export type { TagColor, TagData } from "./tag-selector-context";

const EMPTY_TAGS: TagData[] = [];
const EMPTY_COLOR_PALETTE: TagColor[] = [];

/** Props passed to custom trigger render function */
export interface TagSelectorTriggerRenderProps {
  /** Whether the popover is open */
  open: boolean;
  /** Placeholder text */
  placeholder: string;
  /** Currently selected tags */
  value: TagData[];
}

export interface TagSelectorProps {
  /** Allow creating new tags */
  allowCreate?: boolean;
  /** Allow editing/deleting tags */
  allowManage?: boolean;
  /** Allow reordering tags */
  allowReorder?: boolean;
  className?: string;
  /** Available colors for the color picker */
  colorPalette?: TagColor[];
  /** Whether the popover overlaps the trigger instead of appearing below it */
  coverTrigger?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Max visible tags in trigger before "+N more" (wrap mode only) */
  maxVisibleTags?: number;
  /** Called when selection changes */
  onChange: (tags: TagData[]) => void;
  /** Called when a new tag is created */
  onCreateTag?: (label: string, color?: TagColor) => Promise<TagData>;
  /** Called when a tag is deleted */
  onDeleteTag?: (id: string) => Promise<void>;
  /** Called when a tag is edited */
  onEditTag?: (id: string, newLabel: string, color?: TagColor) => Promise<void>;
  /** Called when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Called when tags are reordered */
  onReorder?: (tags: TagData[]) => void;
  /** Called when tags list should be refetched (e.g., on search) */
  onSearch?: (query: string) => Promise<TagData[]>;
  /** Controlled open state */
  open?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Search input placeholder */
  searchPlaceholder?: string;
  /** Show color picker swatches when creating/editing tags */
  showColorPicker?: boolean;
  /** Single-select mode: only one tag can be selected at a time */
  singleSelect?: boolean;
  /** Component size */
  size?: TagSize;
  /** All available tags */
  tags?: TagData[];
  /** Custom trigger render function. When provided, replaces the default trigger. */
  trigger?: (props: TagSelectorTriggerRenderProps) => React.ReactNode;
  /** Max height for trigger in wrap mode (e.g., "80px") */
  triggerMaxHeight?: string;
  /** Currently selected tags */
  value: TagData[];
  /** Whether tags wrap (true) or scroll horizontally (false) */
  wrapTags?: boolean;
}

/**
 * TagSelector - A multi-select tag component with search, create, edit, delete, and reorder capabilities.
 *
 * @example
 * ```tsx
 * // Basic usage with static tags
 * <TagSelector
 *   value={selectedTags}
 *   onChange={setSelectedTags}
 *   tags={allTags}
 * />
 *
 * // Horizontal scroll mode (no wrapping)
 * <TagSelector
 *   value={selectedTags}
 *   onChange={setSelectedTags}
 *   tags={allTags}
 *   wrapTags={false}
 * />
 *
 * // Custom trigger
 * <TagSelector
 *   value={selectedTags}
 *   onChange={setSelectedTags}
 *   tags={allTags}
 *   trigger={({ value, open }) => (
 *     <Button variant="outline">
 *       {value.length > 0 ? `${value.length} selected` : "Select tags"}
 *     </Button>
 *   )}
 * />
 *
 * // Full-featured with CRUD
 * <TagSelector
 *   value={selectedTags}
 *   onChange={setSelectedTags}
 *   tags={allTags}
 *   onCreateTag={async (label) => api.createTag({ label })}
 *   onEditTag={async (id, label) => api.updateTag(id, { label })}
 *   onDeleteTag={async (id) => api.deleteTag(id)}
 *   onReorder={async (tags) => api.reorderTags(tags.map(t => t.id))}
 *   allowCreate
 *   allowReorder
 *   allowManage
 * />
 * ```
 */
export function TagSelector({
  value,
  onChange,
  tags: tagsProp = EMPTY_TAGS,
  onSearch: _onSearch,
  onCreateTag,
  onEditTag,
  onDeleteTag,
  onReorder,
  size = "lg",
  placeholder = "Add tags…",
  searchPlaceholder = "Search tags…",
  maxVisibleTags: _maxVisibleTags = 3,
  emptyMessage = "No tags found.",
  allowCreate = false,
  allowReorder = false,
  allowManage = false,
  singleSelect = false,
  showColorPicker = false,
  colorPalette = EMPTY_COLOR_PALETTE,
  wrapTags = true,
  coverTrigger = false,
  triggerMaxHeight: _triggerMaxHeight,
  trigger,
  open: openProp,
  onOpenChange,
  disabled: _disabled = false,
  className,
}: TagSelectorProps) {
  const listboxId = useId();

  // Internal state
  const [internalOpen, setInternalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [tags, setTags] = useState<TagData[]>(tagsProp);
  const [pendingColor, setPendingColor] = useState<TagColor | undefined>(
    undefined,
  );

  // Ref to access current value in async callbacks (avoids stale closures)
  const valueRef = useRef(value);
  valueRef.current = value;

  // Sync tags from prop
  useMemo(() => {
    setTags(tagsProp);
  }, [tagsProp]);

  // Controlled/uncontrolled open state
  const open = openProp ?? internalOpen;
  const setOpen = useCallback(
    (newOpen: boolean) => {
      setInternalOpen(newOpen);
      onOpenChange?.(newOpen);
      if (!newOpen) {
        setSearchQuery("");
        setEditingId(null);
        setEditValue("");
      }
    },
    [onOpenChange],
  );

  // Toggle tag selection
  const toggleTag = useCallback(
    (tag: TagData) => {
      const isSelected = value.some((t) => t.id === tag.id);
      if (singleSelect) {
        if (isSelected) {
          onChange([]);
        } else {
          onChange([tag]);
        }
        // Close popover after selection in single-select mode
        setOpen(false);
      } else if (isSelected) {
        onChange(value.filter((t) => t.id !== tag.id));
      } else {
        onChange([...value, tag]);
      }
    },
    [value, onChange, singleSelect, setOpen],
  );

  // Remove tag from selection
  const removeTag = useCallback(
    (id: string) => {
      onChange(value.filter((t) => t.id !== id));
    },
    [value, onChange],
  );

  // Start editing a tag
  const startEditing = useCallback(
    (id: string) => {
      const tag = tags.find((t) => t.id === id);
      if (tag) {
        setEditingId(id);
        setEditValue(tag.label);
        setPendingColor(tag.color);
      }
    },
    [tags],
  );

  // Confirm edit
  const confirmEdit = useCallback(async () => {
    if (!(editingId && editValue.trim())) {
      setEditingId(null);
      setEditValue("");
      return;
    }

    const newLabel = editValue.trim();
    const tag = tags.find((t) => t.id === editingId);

    if (tag && (tag.label !== newLabel || tag.color !== pendingColor)) {
      // Call external handler if provided
      if (onEditTag) {
        await onEditTag(editingId, newLabel, pendingColor);
      }

      // Update local state
      setTags((prev) =>
        prev.map((t) =>
          t.id === editingId
            ? { ...t, label: newLabel, color: pendingColor }
            : t,
        ),
      );

      // Update selection if this tag was selected
      if (value.some((t) => t.id === editingId)) {
        onChange(
          value.map((t) =>
            t.id === editingId
              ? { ...t, label: newLabel, color: pendingColor }
              : t,
          ),
        );
      }
    }

    setEditingId(null);
    setEditValue("");
  }, [editingId, editValue, pendingColor, tags, value, onChange, onEditTag]);

  // Cancel edit
  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setEditValue("");
    setPendingColor(undefined);
  }, []);

  // Create a new tag (instant optimistic UI, async server call in background)
  const createTag = useCallback(
    (label: string) => {
      if (!label.trim()) {
        return;
      }
      const trimmed = label.trim();
      const color = pendingColor;

      // Instant: show a pending tag in the UI immediately
      const pendingId = `_pending-${Date.now()}`;
      const pendingTag: TagData = { id: pendingId, label: trimmed, color };

      setTags((prev) => [...prev, pendingTag]);
      if (singleSelect) {
        onChange([pendingTag]);
        setOpen(false);
      } else {
        onChange([...value, pendingTag]);
      }
      setSearchQuery("");
      setPendingColor(undefined);

      if (onCreateTag) {
        // Fire server create in background, then swap pending → real
        onCreateTag(trimmed, color).then(
          (realTag) => {
            setTags((prev) =>
              prev.map((t) => (t.id === pendingId ? realTag : t)),
            );
            // Swap pending → real in selection
            const current = valueRef.current;
            onChange(current.map((t) => (t.id === pendingId ? realTag : t)));
          },
          () => {
            // On failure: remove pending tag
            setTags((prev) => prev.filter((t) => t.id !== pendingId));
            const current = valueRef.current;
            onChange(current.filter((t) => t.id !== pendingId));
          },
        );
      }
    },
    [onCreateTag, value, onChange, pendingColor, singleSelect, setOpen],
  );

  // Delete a tag
  const deleteTag = useCallback(
    async (id: string) => {
      // Call external handler if provided
      if (onDeleteTag) {
        await onDeleteTag(id);
      }

      // Remove from tags list
      setTags((prev) => prev.filter((t) => t.id !== id));

      // Remove from selection if selected
      if (value.some((t) => t.id === id)) {
        onChange(value.filter((t) => t.id !== id));
      }
    },
    [onDeleteTag, value, onChange],
  );

  // Reorder tags
  const reorderTags = useCallback(
    (newTags: TagData[]) => {
      setTags(newTags);
      onReorder?.(newTags);
    },
    [onReorder],
  );

  // Context value
  const contextValue: TagSelectorContextValue = useMemo(
    () => ({
      size,
      value,
      tags,
      searchQuery,
      open,
      listboxId,
      editingId,
      editValue,
      allowCreate,
      allowReorder,
      allowManage,
      wrapTags,
      coverTrigger,
      singleSelect,
      showColorPicker,
      colorPalette,
      pendingColor,
      setPendingColor,
      toggleTag,
      removeTag,
      setSearchQuery,
      setOpen,
      startEditing,
      setEditValue,
      confirmEdit,
      cancelEdit,
      createTag,
      deleteTag,
      reorderTags,
    }),
    [
      size,
      value,
      tags,
      searchQuery,
      open,
      listboxId,
      editingId,
      editValue,
      allowCreate,
      allowReorder,
      allowManage,
      wrapTags,
      coverTrigger,
      singleSelect,
      showColorPicker,
      colorPalette,
      pendingColor,
      toggleTag,
      removeTag,
      setOpen,
      startEditing,
      confirmEdit,
      cancelEdit,
      createTag,
      deleteTag,
      reorderTags,
    ],
  );

  // Render custom or default trigger
  const renderTrigger = () => {
    if (trigger) {
      return (
        <PopoverTrigger asChild>
          {trigger({ value, open, placeholder })}
        </PopoverTrigger>
      );
    }

    return <TagSelectorTrigger placeholder={placeholder} />;
  };

  return (
    <TagSelectorContext.Provider value={contextValue}>
      <Popover onOpenChange={setOpen} open={open}>
        <div
          className={cn("relative", className)}
          data-component="tag-selector"
          data-slot="tag-selector"
        >
          {renderTrigger()}
          <TagSelectorContent>
            <TagSelectorSearch placeholder={searchPlaceholder} />
            <TagSelectorList emptyMessage={emptyMessage} />
          </TagSelectorContent>
        </div>
      </Popover>
    </TagSelectorContext.Provider>
  );
}
