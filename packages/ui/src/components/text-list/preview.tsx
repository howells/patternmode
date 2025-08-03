"use client";

import type { ListProps } from "./component";
import React from "react";
import { List } from "./component";

type ListExampleProps = ListProps;

export function ListExample(props: ListProps) {
  return <List {...props} />;
}
