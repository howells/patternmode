"use client";

import type React from "react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/table";
import { ToggleGroup, ToggleGroupItem } from "../../components/toggle-group";
import { cn } from "../../utils/cn";

type VariantGridKey = string | number;

export interface VariantGridColumn<
  TKey extends VariantGridKey = VariantGridKey,
> {
  key: TKey;
  label: React.ReactNode;
}

export interface VariantGridRow<TKey extends VariantGridKey = VariantGridKey> {
  key: TKey;
  label: React.ReactNode;
  /** Additional labels for multi-column row headers */
  labels?: React.ReactNode[];
}

type BackgroundOption = "card" | "background";

interface VariantGridProps<
  TRowKey extends VariantGridKey = VariantGridKey,
  TColumnKey extends VariantGridKey = VariantGridKey,
> {
  /** Initial background style */
  background?: BackgroundOption;
  className?: string;
  columns: VariantGridColumn<TColumnKey>[];
  renderCell: (rowKey: TRowKey, columnKey: TColumnKey) => React.ReactNode;
  /** Label(s) for row header column(s). String for single, array for multiple. */
  rowLabels?: string | string[];
  rows: VariantGridRow<TRowKey>[];
}

const BACKGROUND_CLASSES: Record<BackgroundOption, string> = {
  card: "bg-card",
  background: "bg-background",
};

export function VariantGrid<
  TRowKey extends VariantGridKey = VariantGridKey,
  TColumnKey extends VariantGridKey = VariantGridKey,
>({
  rows,
  columns,
  renderCell,
  rowLabels = "Variant",
  background: initialBackground = "card",
  className,
}: VariantGridProps<TRowKey, TColumnKey>) {
  const [background, setBackground] =
    useState<BackgroundOption>(initialBackground);
  const headerLabels = Array.isArray(rowLabels) ? rowLabels : [rowLabels];

  return (
    <div className="flex flex-col gap-3">
      <ToggleGroup
        onValueChange={(value) =>
          value && setBackground(value as BackgroundOption)
        }
        size="xs"
        type="single"
        value={background}
        variant="pill"
      >
        <ToggleGroupItem value="card">Card</ToggleGroupItem>
        <ToggleGroupItem value="background">Background</ToggleGroupItem>
      </ToggleGroup>

      <div
        className={cn(
          "w-full overflow-x-auto rounded-lg border",
          BACKGROUND_CLASSES[background],
          className,
        )}
      >
        <Table>
          <TableHeader>
            <TableRow>
              {headerLabels.map((label) => (
                <TableHead key={label} scope="col">
                  {label}
                </TableHead>
              ))}
              {columns.map((column) => (
                <TableHead key={String(column.key)} scope="col">
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((row) => {
              const rowLabelValues = row.labels
                ? [row.label, ...row.labels]
                : [row.label];

              return (
                <TableRow
                  className="[&:has(td):hover]:bg-gray-50/5"
                  key={String(row.key)}
                >
                  {rowLabelValues.map((label, labelIndex) => (
                    <TableHead
                      key={`${String(row.key)}-label-${String(labelIndex)}`}
                      scope="row"
                    >
                      {label}
                    </TableHead>
                  ))}
                  {columns.map((column) => (
                    <TableCell key={String(column.key)}>
                      {renderCell(row.key, column.key)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
