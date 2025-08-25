"use client";

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./component";

export function TablePreview() {
  return (
    <Table>
      <TableCaption>A list of items.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Quantity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Apples</TableCell>
          <TableCell>5</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total: 5</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export const tablePreviewProps = [];
