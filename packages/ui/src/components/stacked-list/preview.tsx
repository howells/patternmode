"use client";

import type { StackedListProps } from "./component";
import React from "react";
import { StackedList, StackedListItem } from "./component";

export function StackedListExample(props: StackedListProps) {
  return (
    <StackedList {...props}>
      <StackedListItem>
        <div className="font-medium">John Doe</div>
        <div className="text-sm text-gray-500">john@example.com</div>
      </StackedListItem>
      <StackedListItem>
        <div className="font-medium">Jane Smith</div>
        <div className="text-sm text-gray-500">jane@example.com</div>
      </StackedListItem>
      <StackedListItem>
        <div className="font-medium">Bob Johnson</div>
        <div className="text-sm text-gray-500">bob@example.com</div>
      </StackedListItem>
    </StackedList>
  );
}
