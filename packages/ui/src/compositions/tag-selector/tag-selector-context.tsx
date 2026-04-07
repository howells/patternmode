"use client";

import { createContext, useContext } from "react";
import type { TagSize } from "../../components/tag/tag-root";

/**
 * Semantic color for tags — aligned with Dot and Tag variant systems.
 */
export type TagColor =
  | "default"
  | "secondary"
  | "affirmative"
  | "warning"
  | "info"
  | "destructive"
  | "brand";

/**
 * Tag data structure.
 */
export interface TagData {
  /** Optional semantic color for colored tags (e.g., status tags). */
  color?: TagColor;
  id: string;
  label: string;
}

/**
 * TagSelector context value.
 */
interface TagSelectorContextValue {
  /** Whether new tags can be created */
  allowCreate: boolean;
  /** Whether tags can be edited/deleted */
  allowManage: boolean;
  /** Whether tags can be reordered */
  allowReorder: boolean;
  /** Cancel edit */
  cancelEdit: () => void;
  /** Available colors for the color picker */
  colorPalette: TagColor[];
  /** Confirm edit */
  confirmEdit: () => void;
  /** Whether the popover covers the trigger */
  coverTrigger: boolean;
  /** Create a new tag */
  createTag: (label: string) => void;
  /** Delete a tag */
  deleteTag: (id: string) => void;
  /** ID of tag being edited (null if none) */
  editingId: string | null;
  /** Temporary edit value */
  editValue: string;
  /** Generated ID for the listbox element (ARIA) */
  listboxId: string;
  /** Whether the popover is open */
  open: boolean;
  /** Pending color for the create flow */
  pendingColor: TagColor | undefined;
  /** Remove a tag from selection */
  removeTag: (id: string) => void;
  /** Reorder tags */
  reorderTags: (tags: TagData[]) => void;
  /** Search query */
  searchQuery: string;
  /** Update edit value */
  setEditValue: (value: string) => void;
  /** Set open state */
  setOpen: (open: boolean) => void;
  /** Set pending color */
  setPendingColor: (color: TagColor | undefined) => void;
  /** Set search query */
  setSearchQuery: (query: string) => void;
  /** Show color picker swatches in create/edit flows */
  showColorPicker: boolean;
  /** Single-select mode: only one tag can be selected at a time */
  singleSelect: boolean;
  /** Component size */
  size: TagSize;
  /** Start editing a tag */
  startEditing: (id: string) => void;
  /** All available tags */
  tags: TagData[];
  /** Select/deselect a tag */
  toggleTag: (tag: TagData) => void;
  /** Currently selected tags */
  value: TagData[];
  /** Whether tags wrap (true) or scroll horizontally (false) */
  wrapTags: boolean;
}

const TagSelectorContext = createContext<TagSelectorContextValue | null>(null);

/**
 * Hook to access TagSelector context.
 * Throws if used outside of TagSelector.
 */
export function useTagSelectorContext() {
  const context = useContext(TagSelectorContext);
  if (!context) {
    throw new Error(
      "useTagSelectorContext must be used within a TagSelectorProvider",
    );
  }
  return context;
}

export type { TagSelectorContextValue };
export { TagSelectorContext };
