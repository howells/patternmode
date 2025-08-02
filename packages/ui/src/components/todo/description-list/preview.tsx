"use client";

import { DescriptionList } from "@patternmode/ui";

import React from "react";

type DescriptionListExampleProps = React.ComponentProps<typeof DescriptionList>;

export function DescriptionListExample(props: React.ComponentProps<typeof DescriptionList>) {
  return <DescriptionList {...props} />;
}
