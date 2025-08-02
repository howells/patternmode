"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
import {
  Pagination,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from "@patternmode/ui";

import React from "react";

// Basic pagination example - matches config "default" id
export function DefaultExample() {
  return (
    <Pagination>
      <PaginationPrevious href="#prev" />
      <PaginationList>
        <PaginationPage href="#1" current>
          1
        </PaginationPage>
        <PaginationPage href="#2">2</PaginationPage>
        <PaginationPage href="#3">3</PaginationPage>
      </PaginationList>
      <PaginationNext href="#next" />
    </Pagination>
  );
}

// Pagination with ellipsis example - matches config "with-ellipsis" id
export function WithEllipsisExample() {
  return (
    <Pagination>
      <PaginationPrevious href="#prev" />
      <PaginationList>
        <PaginationPage href="#1">1</PaginationPage>
        <PaginationPage href="#2">2</PaginationPage>
        <PaginationPage href="#3" current>
          3
        </PaginationPage>
        <span>...</span>
        <PaginationPage href="#10">10</PaginationPage>
      </PaginationList>
      <PaginationNext href="#next" />
    </Pagination>
  );
}

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "DefaultExample",
    title: "Default",
    description: "Basic usage example",
    component: DefaultExample,
  },
  {
    id: "WithEllipsisExample",
    title: "With Ellipsis",
    description: "With Ellipsis example",
    component: WithEllipsisExample,
  },
];
