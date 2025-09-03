/**
 * Type definitions for the SortableList component
 */

/**
 * Represents an item in the sortable list
 */
export type SortableListItem = {
  /**
   * Unique identifier for the item
   */
  id: string;
  /**
   * Display label for the item
   */
  label: string;
  /**
   * Whether the item is active/selected
   */
  active?: boolean;
  /**
   * Whether the item is disabled (can't be toggled or reordered)
   */
  disabled?: boolean;
};

/**
 * Props for the SortableList component
 */
export type SortableListProps = {
  /**
   * The list of items to display
   */
  items: SortableListItem[];
  /**
   * Callback when the list is reordered or items are toggled
   */
  onChange?: (items: SortableListItem[]) => void;
  /**
   * Whether to show the drag handle
   */
  showDragHandle?: boolean;
  /**
   * Whether to allow reordering
   */
  allowReorder?: boolean;
  /**
   * Whether to show checkboxes
   */
  showCheckbox?: boolean;
  /**
   * Custom class name for the container
   */
  className?: string;
  /**
   * Size variant for the list items
   */
  size?: "sm" | "base" | "lg";
};
