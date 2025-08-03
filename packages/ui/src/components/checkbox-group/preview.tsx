"use client";

import React from "react";

import { CheckboxGroup, CheckboxGroupItem } from "./component";

export function CheckboxGroupExample() {
  return (
    <CheckboxGroup label="Select options">
      <CheckboxGroupItem value="option1">Option 1</CheckboxGroupItem>
      <CheckboxGroupItem value="option2">Option 2</CheckboxGroupItem>
      <CheckboxGroupItem value="option3">Option 3</CheckboxGroupItem>
    </CheckboxGroup>
  );
}
