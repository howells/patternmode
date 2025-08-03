"use client";

import type { SplitButtonProps } from "./component";
import React from "react";
import { SplitButton } from "./component";

export function SplitButtonExample(props: SplitButtonProps) {
  return (
    <SplitButton
      buttonContent="Save"
      onButtonClick={() => console.log("Primary action")}
      {...props}
    >
      Save
    </SplitButton>
  );
}
