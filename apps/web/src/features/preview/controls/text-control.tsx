import { FieldControl } from "@patternmode/field";
import { Input } from "@patternmode/input";
import { Textarea } from "@patternmode/textarea";

import type { PropControlProps } from "./types";

export function TextControl({ prop, currentValue, onValueChange }: PropControlProps) {
  const stringValue = currentValue != null ? String(currentValue) : "";

  return (
    <FieldControl
      render={(controlProps) => {
        const { children: _children, ref: _ref, ...inputProps } = controlProps;
        return (
          <Input
            {...(inputProps as Omit<React.ComponentProps<typeof Input>, "size">)}
            size="xs"
            value={stringValue}
            onChange={e => onValueChange(e.target.value)}
            placeholder={prop.defaultValue != null ? String(prop.defaultValue) : ""}
          />
        );
      }}
    />
  );
}

export function TextareaControl({ prop, currentValue, onValueChange }: PropControlProps) {
  return (
    <FieldControl
      render={(controlProps) => {
        const { children: _children, ref: _ref, ...inputProps } = controlProps;
        return (
          <Textarea
            {...(inputProps as Omit<React.ComponentProps<typeof Textarea>, "size">)}
            size="xs"
            value={currentValue != null ? String(currentValue) : ""}
            onChange={e => onValueChange(e.target.value)}
            placeholder={prop.defaultValue != null ? String(prop.defaultValue) : ""}
          />
        );
      }}
    />
  );
}
