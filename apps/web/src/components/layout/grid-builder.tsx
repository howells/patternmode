"use client";

import { Grid as GridIcon, List } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@patternmode/ui/components/button";
import { Grid, GridCell } from "@patternmode/ui/components/grid";
import { getComponentConfig } from "@patternmode/ui/components/registry";
import { Stack } from "@patternmode/ui/components/stack";
import { Subheading } from "@patternmode/ui/components/subheading";
import { ToggleGroup, ToggleGroupItem } from "@patternmode/ui/components/toggle-group";

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
  gap: number;
  showColumnGuides: boolean;
  showRowGuides: boolean;
  minHeight: "none" | "sm" | "md" | "lg" | "xl";
  cells: Record<string, CellData>;
};

type StackState = {
  direction: "vertical" | "horizontal";
  gap: number;
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
    null,
  );

  const addComponentToCell = (cellIndex: number, componentId: string) => {
    // Get component config and extract default props
    const config = getComponentConfig(componentId);
    const defaultProps: Record<string, unknown> = {};

    if (config) {
      config.props.forEach((prop) => {
        if (prop.defaultValue !== undefined) {
          defaultProps[prop.name] = prop.defaultValue;
        }
      });
    }

    const newComponent: CellData = {
      componentId,
      props: defaultProps,
    };

    if (layoutMode === "grid") {
      const cellKey = `cell-${cellIndex}`;
      setGridState(prev => ({
        ...prev,
        cells: {
          ...prev.cells,
          [cellKey]: newComponent,
        },
      }));
    }
    else {
      // For stack mode, insert at the specified index
      setStackState(prev => ({
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
    props: Record<string, unknown>,
  ) => {
    if (layoutMode === "grid") {
      const cellKey = `cell-${cellIndex}`;
      setGridState(prev => ({
        ...prev,
        cells: {
          ...prev.cells,
          [cellKey]: {
            ...prev.cells[cellKey],
            props,
          },
        },
      }));
    }
    else {
      setStackState(prev => ({
        ...prev,
        items: prev.items.map((item, index) =>
          index === cellIndex ? { ...item, props } : item,
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
    }
    else {
      setStackState(prev => ({
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
          cellIndex={index}
          cellData={cellData}
          onAddComponent={() => handleCellClick(index)}
          onUpdateProps={props => updateCellProps(index, props)}
          onRemoveComponent={() => removeCellComponent(index)}
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
          value={[layoutMode]}
          size="lg"
          onValueChange={(value) => {
            if (value.length > 0) {
              setLayoutMode(value[0] as LayoutMode);
            }
          }}
        >
          <ToggleGroupItem value="grid" leftIcon={GridIcon}>
            Grid
          </ToggleGroupItem>
          <ToggleGroupItem value="stack" leftIcon={List}>
            Stack
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Layout Preview */}
      {layoutMode === "grid"
        ? (
            <Grid
              columns={gridState.columns}
              gap={gridState.gap}
              minHeight={gridState.minHeight}
            >
              {cells}
            </Grid>
          )
        : (
            <Stack
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
              align={stackState.align}
              justify={stackState.justify}
              className="min-h-[200px] border-2 border-dashed  dark:border-zinc-600 rounded-lg p-4"
            >
              {stackState.items.map((item, index) => (
                <Stack key={index}>
                  <EditableCell
                    cellIndex={index}
                    cellData={item}
                    onAddComponent={() => handleCellClick(index)}
                    onUpdateProps={props => updateCellProps(index, props)}
                    onRemoveComponent={() => removeCellComponent(index)}
                  />
                </Stack>
              ))}

              {/* Add item button for stack */}
              <Button
                variant="outline-dashed"
                className="min-h-[80px]"
                onClick={() => handleCellClick(stackState.items.length)}
              >
                Add Component
              </Button>
            </Stack>
          )}

      {/* Component Search */}
      <ComponentSearch
        placeholder="Search components..."
        open={showComponentSearch}
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
      />
    </div>
  );
}
