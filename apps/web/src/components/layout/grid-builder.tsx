"use client";

import { Button } from "@patternmode/button";
import { Grid, GridCell } from "@patternmode/grid";
import { Stack } from "@patternmode/stack";
import { Subheading } from "@patternmode/subheading";
import { ToggleGroup, ToggleGroupItem } from "@patternmode/toggle-group";
import { Grid as GridIcon, List } from "lucide-react";
import React, { useState } from "react";
import type { SpacingValue } from "@/lib/spacing-utils";
import {
  getComponentConfig,
  getPreviewProps as getPreviewPropsForId,
} from "@/registry/components";

import { ComponentSearch } from "../component-search";
import { EditableCell } from "./editable-cell";

type CellData = {
  componentId: string;
  props: Record<string, unknown>;
  position?: {
    colSpan?: number;
    rowSpan?: number;
    colStart?: number;
    rowStart?: number;
  };
};

type LayoutMode = "grid" | "stack";

type GridState = {
  columns: number;
  rows?: number;
  gap: SpacingValue;
  showColumnGuides: boolean;
  showRowGuides: boolean;
  minHeight: "none" | "sm" | "md" | "lg" | "xl";
  cells: Record<string, CellData>;
};

type StackState = {
  direction: "vertical" | "horizontal";
  gap: SpacingValue;
  align: "start" | "center" | "end" | "stretch" | "baseline";
  justify: "start" | "center" | "end" | "between" | "around" | "evenly";
  items: CellData[];
};

export function GridBuilder() {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("grid");

  const [gridState, setGridState] = useState<GridState>({
    columns: 3,
    gap: 4,
    showColumnGuides: true,
    showRowGuides: true,
    minHeight: "md",
    cells: {},
  });

  const [stackState, setStackState] = useState<StackState>({
    direction: "vertical",
    gap: 4,
    align: "stretch",
    justify: "start",
    items: [],
  });

  const [gridRows, _setGridRows] = useState(1);
  const [showComponentSearch, setShowComponentSearch] = useState(false);
  const [selectedCellIndex, setSelectedCellIndex] = useState<number | null>(
    null
  );

  const addComponentToCell = (cellIndex: number, componentId: string) => {
    // Get component config and extract default props
    const _config = getComponentConfig(componentId);
    const defaultProps: Record<string, unknown> = {};
    const previewProps = getPreviewPropsForId(componentId);
    previewProps.forEach((prop) => {
      if (prop.defaultValue !== undefined) {
        defaultProps[prop.name] = prop.defaultValue;
      }
    });

    const newComponent: CellData = {
      componentId,
      props: defaultProps,
    };

    if (layoutMode === "grid") {
      const cellKey = `cell-${cellIndex}`;
      setGridState((prev) => ({
        ...prev,
        cells: {
          ...prev.cells,
          [cellKey]: newComponent,
        },
      }));
    } else {
      // For stack mode, insert at the specified index
      setStackState((prev) => ({
        ...prev,
        items: [
          ...prev.items.slice(0, cellIndex),
          newComponent,
          ...prev.items.slice(cellIndex),
        ],
      }));
    }

    setShowComponentSearch(false);
    setSelectedCellIndex(null);
  };

  const updateCellProps = (
    cellIndex: number,
    props: Record<string, unknown>
  ) => {
    if (layoutMode === "grid") {
      const cellKey = `cell-${cellIndex}`;
      setGridState((prev) => ({
        ...prev,
        cells: {
          ...prev.cells,
          [cellKey]: {
            ...prev.cells[cellKey],
            props,
          },
        },
      }));
    } else {
      setStackState((prev) => ({
        ...prev,
        items: prev.items.map((item, index) =>
          index === cellIndex ? { ...item, props } : item
        ),
      }));
    }
  };

  const removeCellComponent = (cellIndex: number) => {
    if (layoutMode === "grid") {
      const cellKey = `cell-${cellIndex}`;
      setGridState((prev) => {
        const newCells = { ...prev.cells };
        delete newCells[cellKey];
        return { ...prev, cells: newCells };
      });
    } else {
      setStackState((prev) => ({
        ...prev,
        items: prev.items.filter((_, index) => index !== cellIndex),
      }));
    }
  };

  const handleCellClick = (cellIndex: number) => {
    setSelectedCellIndex(cellIndex);
    setShowComponentSearch(true);
  };

  // Generate cells based on columns and rows
  const totalCells = gridState.columns * gridRows;
  const cells = Array.from({ length: totalCells }, (_, index) => {
    const cellKey = `cell-${index}`;
    const cellData = gridState.cells[cellKey];

    return (
      <GridCell key={index}>
        <EditableCell
          cellData={cellData}
          cellIndex={index}
          onAddComponent={() => handleCellClick(index)}
          onRemoveComponent={() => removeCellComponent(index)}
          onUpdateProps={(props) => updateCellProps(index, props)}
        />
      </GridCell>
    );
  });

  return (
    <div className="space-y-6">
      {/* Layout Mode Selector */}
      <div className="flex items-center justify-between">
        <Subheading level={2}>Layout Builder</Subheading>
        <ToggleGroup
          onValueChange={(value) => {
            if (value.length > 0) {
              setLayoutMode(value[0] as LayoutMode);
            }
          }}
          size="lg"
          value={[layoutMode]}
        >
          <ToggleGroupItem leftIcon={GridIcon} value="grid">
            Grid
          </ToggleGroupItem>
          <ToggleGroupItem leftIcon={List} value="stack">
            Stack
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Layout Preview */}
      {layoutMode === "grid" ? (
        <Grid
          columns={gridState.columns}
          gap={gridState.gap}
          minHeight={gridState.minHeight}
        >
          {cells}
        </Grid>
      ) : (
        <Stack
          align={stackState.align}
          className="min-h-[200px] rounded-lg border-2 border-dashed p-4 dark:border-zinc-600"
          direction={stackState.direction}
          gap={
            stackState.gap as
              | 0
              | 1
              | 2
              | 3
              | 4
              | 5
              | 6
              | 8
              | 10
              | 12
              | 16
              | 20
              | 24
          }
          justify={stackState.justify}
        >
          {stackState.items.map((item, index) => (
            <Stack key={index}>
              <EditableCell
                cellData={item}
                cellIndex={index}
                onAddComponent={() => handleCellClick(index)}
                onRemoveComponent={() => removeCellComponent(index)}
                onUpdateProps={(props) => updateCellProps(index, props)}
              />
            </Stack>
          ))}

          {/* Add item button for stack */}
          <Button
            className="min-h-[80px]"
            onClick={() => handleCellClick(stackState.items.length)}
            variant="outline-dashed"
          >
            Add Component
          </Button>
        </Stack>
      )}

      {/* Component Search */}
      <ComponentSearch
        onOpenChange={(open) => {
          setShowComponentSearch(open);
          if (!open) {
            setSelectedCellIndex(null);
          }
        }}
        onSelectComponent={(component) => {
          if (selectedCellIndex !== null) {
            addComponentToCell(selectedCellIndex, component.id);
          }
        }}
        open={showComponentSearch}
        placeholder="Search components..."
      />
    </div>
  );
}
