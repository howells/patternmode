"use client";

import { RadioGroup } from "@patternmode/ui";

import React from "react";

type RadioGroupExampleProps = React.ComponentProps<typeof RadioGroup>;

export function RadioGroupExample(props: React.ComponentProps<typeof RadioGroup>) {
  return <RadioGroup {...props} />;
}
