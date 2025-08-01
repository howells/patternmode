"use client";

import { DatePicker } from "@patternmode/ui";

import React from "react";

type DatePickerExampleProps = React.ComponentProps<typeof DatePicker>;

export function DatePickerExample(props: React.ComponentProps<typeof DatePicker>) {
  return <DatePicker {...props} />;
}
