"use client";

import type { PreviewCardProps } from "./component";
import React from "react";
import { PreviewCard } from "./component";

export function PreviewCardExample(props: PreviewCardProps) {
  return (
    <PreviewCard {...props}>
      <div>Sample Card</div>
    </PreviewCard>
  );
}
