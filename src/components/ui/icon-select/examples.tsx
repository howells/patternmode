import React from "react";
import { IconSelect } from "@patternmode/ui";

export function IconSelectExample() {
  return <IconSelect onValueChange={(icon) => console.log(icon)} />;
}
