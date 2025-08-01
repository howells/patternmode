"use client";

import type { CalloutProps } from "./callout";
import { Callout } from "@patternmode/ui";

import { Info } from "lucide-react";
import React from "react";

type CalloutExampleProps = {
  [key: string]: unknown;
};

export function CalloutExample(props: CalloutProps) {
  return (
    <Callout
      title="Important Information"
      icon={Info}
      {...props}
    >
      This callout contains important information that requires your attention.
    </Callout>
  );
}
