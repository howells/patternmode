"use client";

import React from "react";
import { MenuBar } from "./component";

type MenuBarExampleProps = React.ComponentProps<typeof MenuBar>;

export function MenuBarExample(props: MenuBarExampleProps) {
  return <MenuBar {...props} />;
}
