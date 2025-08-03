"use client";

import React from "react";
import { Inspector } from "./component";

export function InspectorExample(props: React.ComponentProps<typeof Inspector>) {
  return <Inspector {...props} />;
}
