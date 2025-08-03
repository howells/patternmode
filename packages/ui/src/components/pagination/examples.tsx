"use client";

import React from "react";
import {
  Pagination,
  PaginationGap,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from "./component";

export const DefaultExample = () => {
  return (
    <Pagination>
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
};

export const WithGapsExample = () => {
  return (
    <Pagination>
      <PaginationPrevious href="#page4" />
      <PaginationList>
        <PaginationPage href="#page1">1</PaginationPage>
        <PaginationGap />
        <PaginationPage href="#page4">4</PaginationPage>
        <PaginationPage href="#page5" current>5</PaginationPage>
        <PaginationPage href="#page6">6</PaginationPage>
        <PaginationGap />
        <PaginationPage href="#page20">20</PaginationPage>
      </PaginationList>
      <PaginationNext href="#page6" />
    </Pagination>
  );
};

export const TablePaginationExample = () => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-zinc-600">
        Showing 11 to 20 of 97 results
      </p>
      <Pagination>
        <PaginationPrevious href="#page1" />
        <PaginationList>
          <PaginationPage href="#page1">1</PaginationPage>
          <PaginationPage href="#page2" current>2</PaginationPage>
          <PaginationPage href="#page3">3</PaginationPage>
          <PaginationGap />
          <PaginationPage href="#page10">10</PaginationPage>
        </PaginationList>
        <PaginationNext href="#page3" />
      </Pagination>
    </div>
  );
};
