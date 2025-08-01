"use client";

import { Field } from "@patternmode/ui";

import React from "react";

type FieldExampleProps = React.ComponentProps<typeof Field>;

export function FieldExample(props: React.ComponentProps<typeof Field>) {
  return <Field {...props} />;
}
