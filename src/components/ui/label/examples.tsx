import React from "react";
import { Label } from "@patternmode/ui";

export function LabelExample() {
  return <Label htmlFor="email">Email Address</Label>;
}

export function RequiredExample() {
  return (
    <Label htmlFor="name">
      Full Name <span className="text-red-500">*</span>
    </Label>
  );
}