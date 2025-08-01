"use client";

import type { CategoryBarProps } from "./category-bar";
import { CategoryBar } from "@patternmode/ui";

import React from "react";

type CategoryBarExampleProps = CategoryBarProps;

export function CategoryBarExample(props: CategoryBarProps) {
  return <CategoryBar {...props} />;
}
