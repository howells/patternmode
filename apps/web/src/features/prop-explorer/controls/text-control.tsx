import React from "react";

import { FieldControl, Input, Textarea } from "@patternmode/ui";

import type { PropControlProps } from "./types";

export function TextControl({ prop, currentValue, onValueChange }: PropControlProps) {
  const stringValue = currentValue != null ? String(currentValue) : "";

  return (
    <FieldControl
      render={(controlProps) => {
        const { children, ref, ...inputProps } = controlProps;
        return (
          <Input
            {...inputProps}
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
        const { children, ref, ...inputProps } = controlProps;
        return (
          <Textarea
            {...inputProps}
            value={currentValue != null ? String(currentValue) : ""}
            onChange={e => onValueChange(e.target.value)}
            placeholder={prop.defaultValue != null ? String(prop.defaultValue) : ""}
          />
        );
      }}
    />
  );
}
