"use client";

import {
  Checkbox,
  type CheckboxProps,
} from "@patternmode/ui/components/checkbox";
import { useDocumentListContext } from "./document-list-context";
import { useDocumentListItemContext } from "./document-list-item";

export interface DocumentListCheckboxProps
  extends Omit<CheckboxProps, "checked" | "onCheckedChange"> {
  /** Override the value from item context */
  value?: string;
}

/**
 * Checkbox that automatically connects to DocumentList selection.
 * Must be placed inside a DocumentListItem with a value prop,
 * or provide a value prop directly.
 */
export function DocumentListCheckbox({
  value: valueProp,
  ...props
}: DocumentListCheckboxProps) {
  const { selectable, isSelected, toggleItem } = useDocumentListContext();
  const itemContext = useDocumentListItemContext();

  const value = valueProp ?? itemContext?.value;

  if (!(selectable && value)) {
    return null;
  }

  return (
    <Checkbox
      checked={isSelected(value)}
      data-component="document-list-checkbox"
      data-slot="document-list-checkbox"
      onCheckedChange={() => toggleItem(value)}
      size="sm"
      {...props}
    />
  );
}
