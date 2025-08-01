"use client";

import { Radio } from "@patternmode/ui";

import React from "react";

type RadioExampleProps = React.ComponentProps<typeof Radio>;

export function RadioExample(props: React.ComponentProps<typeof Radio>) {
  return <Radio {...props} />;
}
