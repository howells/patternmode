"use client";

import { Select } from "@patternmode/ui";

import React from "react";

type SelectExampleProps = React.ComponentProps<typeof Select>;

export function SelectExample(props: React.ComponentProps<typeof Select>) {
  return <Select {...props} />;
}
