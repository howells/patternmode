"use client";

import type { Size } from "@patternmode/config/sizes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./component";

type SelectPreviewProps = {
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  size?: Size;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
};

export function SelectPreview(props: SelectPreviewProps) {
  return (
    <Select defaultValue={props.defaultValue} value={props.value} onValueChange={props.onValueChange} disabled={props.disabled}>
      <SelectTrigger className="w-[180px]" hasError={props.hasError} size={props.size}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
        <SelectItem value="strawberry">Strawberry</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectContent>
    </Select>
  );
}

export const selectPreviewProps = [
  { name: "placeholder", type: "string", defaultValue: "Select a fruit..." },
  { name: "disabled", type: "boolean", defaultValue: false },
  { name: "hasError", type: "boolean", defaultValue: false },
  { name: "size", type: "select", options: ["xs", "sm", "base", "lg"], defaultValue: "base" },
  { name: "defaultValue", type: "string", defaultValue: "" },
];

