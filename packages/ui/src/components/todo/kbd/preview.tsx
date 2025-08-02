"use client";

import type { KbdProps } from "./kbd";
import { Kbd } from "@patternmode/ui";

import React from "react";

type KbdExampleProps = KbdProps;

export function KbdExample(props: KbdProps) {
  return <Kbd {...props} />;
}
