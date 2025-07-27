"use client";

import React from "react";
import {
  Pagination,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from "./pagination";

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
