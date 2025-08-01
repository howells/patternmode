"use client";

import { Inspector } from "@patternmode/ui";

import React from "react";

type InspectorExampleProps = React.ComponentProps<typeof Inspector>;

export function InspectorExample(props: React.ComponentProps<typeof Inspector>) {
  return <Inspector {...props} />;
}
