"use client";

import { Breadcrumbs } from "@patternmode/ui";

import React from "react";

type BreadcrumbsExampleProps = React.ComponentProps<typeof Breadcrumbs>;

export function BreadcrumbsExample(props: React.ComponentProps<typeof Breadcrumbs>) {
  return <Breadcrumbs {...props} />;
}
