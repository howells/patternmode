"use client";

import { PreviewCard } from "@patternmode/ui";

import React from "react";

type PreviewCardExampleProps = React.ComponentProps<typeof PreviewCard>;

export function PreviewCardExample(props: React.ComponentProps<typeof PreviewCard>) {
  return <PreviewCard {...props} />;
}
