"use client";

import type { PaginationProps } from "./component";
import React from "react";
import {
  Pagination,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from "./component";

export function PaginationPreview(props: PaginationProps) {
  return (
    <Pagination {...props}>
      <PaginationPrevious href="#page1" />
      <PaginationList>
        <PaginationPage href="#page1">1</PaginationPage>
        <PaginationPage href="#page2" current>2</PaginationPage>
        <PaginationPage href="#page3">3</PaginationPage>
        <PaginationPage href="#page4">4</PaginationPage>
        <PaginationPage href="#page5">5</PaginationPage>
      </PaginationList>
      <PaginationNext href="#page3" />
    </Pagination>
  );
}

// Preview props for prop explorer
export const paginationPreviewProps = [
  {
    name: "aria-label",
    type: "string",
    description: "Accessible label for screen readers describing the pagination navigation.",
    defaultValue: "Page navigation",
  },
];
