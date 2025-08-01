"use client";

import { Table } from "@patternmode/ui";

import React from "react";

type TableExampleProps = React.ComponentProps<typeof Table>;

export function TableExample(props: React.ComponentProps<typeof Table>) {
  return <Table {...props} />;
}
