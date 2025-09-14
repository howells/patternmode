"use client";

import { Button } from "@patternmode/button";
import { Checkbox } from "@patternmode/checkbox";
import { DismissButton } from "@patternmode/dismiss-button";
import { Input } from "@patternmode/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@patternmode/select";
import { Textarea } from "@patternmode/textarea";
import { cx } from "@patternmode/utils/cx";
import { GripVertical, Plus } from "lucide-react";
import type React from "react";

export type FieldSchema = {
  key: string;
  type: "input" | "textarea" | "select" | "checkbox" | "number" | string;
  defaultValue: unknown;
  label?: string;
  placeholder?: string;
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
  props?: Record<string, unknown>;
};

export type FieldArrayItem = Record<string, unknown>;

export type FieldArrayProps<T extends FieldArrayItem = FieldArrayItem> = {
  items: T[];
  onItemsChange: (items: T[]) => void;
  schema: FieldSchema[];
  minItems?: number;
  maxItems?: number;
  addButtonText?: string;
  sortable?: boolean;
  componentMap?: Record<string, (props: any) => React.ReactElement>;
  renderItem?: (
    item: T,
    index: number,
    actions: {
      updateItem: (updates: Partial<T>) => void;
      removeItem: () => void;
      moveItem: (fromIndex: number, toIndex: number) => void;
    }
  ) => React.ReactNode;
  className?: string;
  showItemLabels?: boolean;
  itemLabel?: string;
} & React.ComponentPropsWithoutRef<"div">;

const EMPTY_COMPONENT_MAP = {};
const EMPTY_OPTIONS_ARRAY: Array<{ label: string; value: string }> = [];

function FieldArray<T extends FieldArrayItem = FieldArrayItem>({
  items,
  onItemsChange,
  schema,
  minItems = 0,
  maxItems,
  addButtonText = "Add Item",
  sortable = false,
  componentMap = EMPTY_COMPONENT_MAP,
  renderItem,
  className,
  showItemLabels = false,
  itemLabel = "Item",
}: FieldArrayProps<T>) {
  const defaultComponentMap: Record<string, (props: any) => React.ReactElement> = {
    input: (props) => <Input {...props} />,
    textarea: (props) => <Textarea {...props} />,
    select: ({ options = EMPTY_OPTIONS_ARRAY, ...props }) => (
      <Select {...props}>
        <SelectTrigger>
          <SelectValue>{String(props.placeholder ?? "")}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option: { label: string; value: string }) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
    checkbox: (props) => <Checkbox {...props} />,
  };

  const components = { ...defaultComponentMap, ...componentMap };

  const addItem = () => {
    if (maxItems !== undefined && items.length >= maxItems) return;
    const newItem = schema.reduce((acc, field) => {
      acc[field.key] = field.defaultValue;
      return acc;
    }, {} as Record<string, unknown>) as T;
    onItemsChange([...items, newItem]);
  };

  const removeItem = (index: number) => {
    if (items.length <= minItems) return;
    onItemsChange(items.filter((_, i) => i !== index));
  };

  const moveItem = (from: number, to: number) => {
    if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length) return;
    const updated = [...items];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    onItemsChange(updated);
  };

  const updateItem = (index: number, updates: Partial<T>) => {
    const updated = items.map((item, i) => (i === index ? { ...item, ...updates } : item));
    onItemsChange(updated);
  };

  return (
    <div className={cx("space-y-4", className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className={cx(
            "rounded-lg border p-4",
            "bg-white dark:bg-zinc-900",
            "border-zinc-200 dark:border-zinc-800"
          )}
        >
          <div className="flex items-start gap-3">
            {sortable ? (
              <div className="mt-2 select-none text-zinc-400 dark:text-zinc-600">
                <GripVertical size={16} />
              </div>
            ) : null}

            <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
              {renderItem ? (
                renderItem(item, index, {
                  updateItem: (updates) => updateItem(index, updates),
                  removeItem: () => removeItem(index),
                  moveItem,
                })
              ) : (
                <>
                  {schema.map((field) => {
                    const Component = components[field.type];
                    if (!Component) return null;
                    const value = item[field.key] as any;
                    const commonProps = {
                      key: field.key,
                      id: `${field.key}-${index}`,
                      name: `${field.key}-${index}`,
                      placeholder: field.placeholder,
                      required: field.required,
                      value,
                      onChange: (e: any) =>
                        updateItem(index, {
                          [field.key]: e?.target?.type === "checkbox" ? e.target.checked : e?.target?.value ?? e,
                        } as Partial<T>),
                      ...(field.props || {}),
                    } as any;

                    return (
                      <div key={field.key} className="space-y-1">
                        {showItemLabels && (
                          <label
                            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                            htmlFor={`${field.key}-${index}`}
                          >
                            {field.label || field.key}
                          </label>
                        )}
                        <Component
                          {...commonProps}
                          {...(field.type === "checkbox" ? { checked: Boolean(value) } : {})}
                          {...(field.type === "select" ? { value: String(value ?? "") } : {})}
                        >
                          {field.type === "select"
                            ? (field.options || EMPTY_OPTIONS_ARRAY).map((option: { label: string; value: string }) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))
                            : null}
                        </Component>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            <div className="ml-auto flex items-start gap-2">
              <DismissButton onClick={() => removeItem(index)} size="xs" />
            </div>
          </div>
        </div>
      ))}

      <div className="pt-2">
        <Button icon={Plus} onClick={addItem} size="sm" variant="outline">
          {addButtonText}
        </Button>
      </div>
    </div>
  );
}

export { FieldArray };
