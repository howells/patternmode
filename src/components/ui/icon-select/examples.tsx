import React from "react";
import { IconSelect } from "./icon-select";

export function IconSelectExample() {
  return <IconSelect onValueChange={(icon) => console.log(icon)} />;
}
