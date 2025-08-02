"use client";

import { RadioCardGroup } from "@patternmode/ui";

import React from "react";

type RadioCardGroupExampleProps = React.ComponentProps<typeof RadioCardGroup>;

export function RadioCardGroupExample(props: React.ComponentProps<typeof RadioCardGroup>) {
  return <RadioCardGroup {...props} />;
}
