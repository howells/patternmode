import { IconSelect } from "@patternmode/ui";
import React from "react";

export function IconSelectExample() {
  return <IconSelect onValueChange={icon => console.log(icon)} />;
}
