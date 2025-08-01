"use client";

import { Fieldset } from "@patternmode/ui";

import React from "react";

type FieldsetExampleProps = React.ComponentProps<typeof Fieldset>;

export function FieldsetExample(props: React.ComponentProps<typeof Fieldset>) {
  return <Fieldset {...props} />;
}
