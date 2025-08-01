"use client";

import type { ListProps } from "./list";
import { List } from "@patternmode/ui";

import React from "react";

type ListExampleProps = ListProps;

export function ListExample(props: ListProps) {
  return <List {...props} />;
}
