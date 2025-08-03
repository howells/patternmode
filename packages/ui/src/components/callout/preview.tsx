"use client";

import type { CalloutProps } from "./component";
import { Info } from "lucide-react";

import React from "react";

import { Callout } from "./component";

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
