"use client";

import React from "react";
import { Progress } from "@patternmode/ui";

export function ProgressExample() {
  return (
    <div className="space-y-2">
      <Progress value={25} />
      <Progress value={50} />
      <Progress value={75} />
      <Progress value={100} />
    </div>
  );
}