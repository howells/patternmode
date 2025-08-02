"use client";

import { GripVertical, Plus } from "lucide-react";
import React from "react";
import { cx } from "../../lib/utils";
import { Textarea } from "../textarea/component";
import { Button } from "../todo/button/button";
import { Checkbox } from "../todo/checkbox/checkbox";
import { DismissButton } from "../todo/dismiss-button/dismiss-button";
import { Input } from "../todo/input/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../todo/select/select";

// Generic field schema definition
export type FieldSchema = {
  key: string;
  type: "input" | "textarea" | "select" | "checkbox" | "number" | string; // extensible for any component
  defaultValue: unknown;
  label?: string;
  placeholder?: string;
  required?: boolean;
  options?: Array<{ label: string; value: string }>; // for select fields
  props?: Record<string, unknown>; // additional props to pass to the field component
};

export type FieldArrayItem = Record<string, unknown>;

export type FieldArrayProps<T extends FieldArrayItem = FieldArrayItem> = {
  /**
   * Array of items to display.
   */
  items: T[];

  /**
   * Callback when items array changes.
   */
  onItemsChange: (items: T[]) => void;

  /**
   * Schema definition for each item in the array.
   */
  schema: FieldSchema[];

  /**
   * Minimum number of items (default: 0).
   */
  minItems?: number;

  /**
   * Maximum number of items (default: unlimited).
   */
  maxItems?: number;

  /**
   * Text for the add button (default: "Add Item").
   */
  addButtonText?: string;

  /**
   * Whether to show drag handles for reordering (default: false).
   */
  sortable?: boolean;

  /**
   * Custom component map for rendering different field types.
   */
  componentMap?: Record<string, React.ComponentType<any>>;

  /**
   * Custom render function for each item.
   */
  renderItem?: (item: T, index: number, actions: {
    updateItem: (updates: Partial<T>) => void;
    removeItem: () => void;
    moveItem: (fromIndex: number, toIndex: number) => void;
  }) => React.ReactNode;

  /**
   * Additional CSS classes for the container.
   */
  className?: string;

  /**
   * Whether to show item numbers/labels (default: false).
   */
  showItemLabels?: boolean;

  /**
   * Custom label for each item (e.g., "Item", "Question", "Section").
   */
  itemLabel?: string;
};

/**
 * FieldArray component.
 */
function FieldArray<T extends FieldArrayItem = FieldArrayItem>({
  items,
  onItemsChange,
  schema,
  minItems = 0,
  maxItems,
  addButtonText = "Add Item",
  sortable = false,
  componentMap = {},
  renderItem,
  className,
  showItemLabels = false,
  itemLabel = "Item",
}: FieldArrayProps<T>) {
  // Default component map for built-in field types using proper UI components
  const defaultComponentMap = {
    input: ({ value, onChange, ...props }: any) => (
      <Input
        value={value || ""}
        onChange={e => onChange(e.target.value)}
        {...props}
      />
    ),
    textarea: ({ value, onChange, ...props }: any) => (
      <Textarea
        value={value || ""}
        onChange={e => onChange(e.target.value)}
        {...props}
      />
    ),
    select: ({ value, onChange, options = [], placeholder, ...props }: any) => (
      <Select value={value || ""} onValueChange={onChange} placeholder={placeholder} {...props}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option: any) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
    checkbox: ({ value, onChange, ...props }: any) => (
      <Checkbox
        checked={!!value}
        onCheckedChange={onChange}
        {...props}
      />
    ),
    number: ({ value, onChange, ...props }: any) => (
      <Input
        type="number"
        value={value || ""}
        onChange={e => onChange(Number(e.target.value) || 0)}
        {...props}
      />
    ),
  };

  const effectiveComponentMap = { ...defaultComponentMap, ...componentMap };

  const addItem = () => {
    if (maxItems && items.length >= maxItems) {
      return;
    }

    const newItem = schema.reduce((acc, field) => {
      acc[field.key] = field.defaultValue;
      return acc;
    }, {} as Record<string, unknown>) as T;

    onItemsChange([...items, newItem]);
  };

  const removeItem = (index: number) => {
    if (items.length <= minItems) {
      return;
    }
    const newItems = items.filter((_, i) => i !== index);
    onItemsChange(newItems);
  };

  const updateItem = (index: number, updates: Partial<T>) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, ...updates } : item,
    );
    onItemsChange(newItems);
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...items];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);
    onItemsChange(newItems);
  };

  const renderField = (field: FieldSchema, value: unknown, onChange: (value: unknown) => void) => {
    const Component = effectiveComponentMap[field.type];

    if (!Component) {
      console.warn(`FieldArray: No component found for field type "${field.type}"`);
      return null;
    }

    return (
      <div className="space-y-1">
        {field.label && (
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <Component
          value={value}
          onChange={onChange}
          placeholder={field.placeholder}
          required={field.required}
          options={field.options}
          {...(field.props || {})}
        />
      </div>
    );
  };

  return (
    <div className={cx("space-y-4", className)}>
      {items.map((item, index) => {
        const itemActions = {
          updateItem: (updates: Partial<T>) => updateItem(index, updates),
          removeItem: () => removeItem(index),
          moveItem,
        };

        // Use custom render function if provided
        if (renderItem) {
          return (
            <div
              key={index}
              className="group relative border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 bg-white dark:bg-zinc-950"
            >
              {showItemLabels && (
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    {itemLabel} {index + 1}
                  </span>
                </div>
              )}
              {renderItem(item, index, itemActions)}
            </div>
          );
        }

        // Default rendering
        return (
          <div
            key={index}
            className="group relative border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 bg-white dark:bg-zinc-950"
          >
            {/* Header with controls */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {sortable && (
                  <button
                    type="button"
                    className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 cursor-grab active:cursor-grabbing"
                    aria-label="Drag to reorder"
                  >
                    <GripVertical className="h-4 w-4" />
                  </button>
                )}
                {showItemLabels && (
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    {itemLabel} {index + 1}
                  </span>
                )}
              </div>

              {items.length > minItems && (
                <DismissButton
                  onClick={() => removeItem(index)}
                  className={cx(
                    "opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity",
                  )}
                  aria-label={`Remove ${itemLabel.toLowerCase()} ${index + 1}`}
                />
              )}
            </div>

            {/* Fields */}
            <div className="grid gap-4">
              {schema.map(field => (
                <div key={field.key}>
                  {renderField(
                    field,
                    item[field.key],
                    value => updateItem(index, { [field.key]: value } as Partial<T>),
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Add button */}
      {(!maxItems || items.length < maxItems) && (
        <Button
          variant="outline"
          onClick={addItem}
          leftIcon={Plus}
        >
          {addButtonText}
        </Button>
      )}
    </div>
  );
}

FieldArray.displayName = "FieldArray";

export { FieldArray };
