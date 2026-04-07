import { Button } from "@patternmode/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@patternmode/ui/components/dropdown-menu";
import { useDataGrid } from "@patternmode/ui/compositions/data-grid";
import { cn } from "@patternmode/ui/utils/cn";
import type { Column } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowLeft,
  ArrowLeftToLine,
  ArrowRight,
  ArrowRightToLine,
  ArrowUp,
  Check,
  ChevronsUpDown,
  PinOff,
  Settings2,
} from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import {
  canMoveColumn,
  getHeaderControlsState,
  getVisibilityColumnOptions,
  moveColumnOrder,
} from "./data-grid-column-header-utils";

interface DataGridColumnHeaderProps<TData, TValue>
  extends HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  filter?: ReactNode;
  icon?: ReactNode;
  pinnable?: boolean;
  title?: string;
  visibility?: boolean;
}
/** data grid column header section */

function renderSortIndicator(sortDirection: false | "asc" | "desc") {
  if (sortDirection === "desc") {
    return <ArrowDown className="mt-px size-[0.7rem]!" />;
  }

  if (sortDirection === "asc") {
    return <ArrowUp className="mt-px size-[0.7rem]!" />;
  }

  return <ChevronsUpDown className="mt-px size-[0.7rem]!" />;
}

function DataGridColumnHeader<TData, TValue>({
  column,
  title = "",
  icon,
  className,
  filter,
  visibility = false,
}: DataGridColumnHeaderProps<TData, TValue>) {
  const { isLoading, table, props, recordCount } = useDataGrid();
  const controlsState = getHeaderControlsState({
    canPin: column.getCanPin(),
    canSort: column.getCanSort(),
    columnsMovable: Boolean(props.tableLayout?.columnsMovable),
    columnsPinnable: Boolean(props.tableLayout?.columnsPinnable),
    columnsVisibility: Boolean(props.tableLayout?.columnsVisibility),
    hasFilter: Boolean(filter),
    visibility,
  });
  const visibilityColumns = getVisibilityColumnOptions(table.getAllColumns());

  const moveColumn = (direction: "left" | "right") => {
    table.setColumnOrder(
      moveColumnOrder(column.id, table.getState().columnOrder, direction),
    );
  };

  const canMove = (direction: "left" | "right"): boolean => {
    return canMoveColumn(column.id, table.getState().columnOrder, direction);
  };
  /** header label header section */

  const headerLabel = () => (
    <div
      className={cn(
        "inline-flex h-full items-center gap-1.5 font-normal text-[0.8125rem] text-secondary-foreground/80 leading-[calc(1.125/0.8125)] [&_svg]:size-3.5 [&_svg]:opacity-60",
        className,
      )}
      data-component="data-grid-column-header"
    >
      {icon && icon}
      {title}
    </div>
  );
  /** header button header section */

  const headerButton = () => (
    <Button
      appearance="ghost"
      className={cn(
        "-ms-2 h-7 rounded-md px-2 font-normal text-secondary-foreground/80 hover:bg-secondary hover:text-foreground data-[state=open]:bg-secondary data-[state=open]:text-foreground",
        className,
      )}
      data-component="data-grid-column-header"
      disabled={isLoading || recordCount === 0}
      onClick={() => {
        const isSorted = column.getIsSorted();
        if (isSorted === "asc") {
          column.toggleSorting(true);
        } else if (isSorted === "desc") {
          column.clearSorting();
        } else {
          column.toggleSorting(false);
        }
      }}
      pressed={false}
    >
      {icon && icon}
      {title}

      {column.getCanSort() && renderSortIndicator(column.getIsSorted())}
    </Button>
  );
  /** header pin header section */

  const headerPin = () => (
    <Button
      appearance="ghost"
      aria-label={`Unpin ${title} column`}
      className="-me-1 size-7 rounded-md"
      onClick={() => column.pin(false)}
      pressed={false}
      size="icon-sm"
      title={`Unpin ${title} column`}
    >
      <PinOff aria-hidden="true" className="size-3.5! opacity-50!" />
    </Button>
  );

  const headerControls = () => (
    <div
      className="flex h-full items-center justify-between gap-1.5"
      data-component="data-grid-column-header"
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{headerButton()}</DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-40">
          {filter && <DropdownMenuLabel>{filter}</DropdownMenuLabel>}

          {controlsState.showFilterSeparator && <DropdownMenuSeparator />}

          {column.getCanSort() && (
            <>
              <DropdownMenuItem
                disabled={!column.getCanSort()}
                icon={ArrowUp}
                onClick={() => {
                  if (column.getIsSorted() === "asc") {
                    column.clearSorting();
                  } else {
                    column.toggleSorting(false);
                  }
                }}
                suffix={
                  column.getIsSorted() === "asc" ? (
                    <Check className="size-4 text-primary" />
                  ) : null
                }
              >
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={!column.getCanSort()}
                icon={ArrowDown}
                onClick={() => {
                  if (column.getIsSorted() === "desc") {
                    column.clearSorting();
                  } else {
                    column.toggleSorting(true);
                  }
                }}
                suffix={
                  column.getIsSorted() === "desc" ? (
                    <Check className="size-4 text-primary" />
                  ) : null
                }
              >
                Desc
              </DropdownMenuItem>
            </>
          )}

          {controlsState.showControlsSeparator && <DropdownMenuSeparator />}

          {controlsState.canShowPinMenu && (
            <>
              <DropdownMenuItem
                icon={ArrowLeftToLine}
                onClick={() =>
                  column.pin(column.getIsPinned() === "left" ? false : "left")
                }
                suffix={
                  column.getIsPinned() === "left" ? (
                    <Check className="size-4 text-primary" />
                  ) : null
                }
              >
                Pin to left
              </DropdownMenuItem>
              <DropdownMenuItem
                icon={ArrowRightToLine}
                onClick={() =>
                  column.pin(column.getIsPinned() === "right" ? false : "right")
                }
                suffix={
                  column.getIsPinned() === "right" ? (
                    <Check className="size-4 text-primary" />
                  ) : null
                }
              >
                Pin to right
              </DropdownMenuItem>
            </>
          )}

          {controlsState.showMoveMenu && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                disabled={!canMove("left") || column.getIsPinned() !== false}
                icon={ArrowLeft}
                onClick={() => moveColumn("left")}
              >
                Move to Left
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={!canMove("right") || column.getIsPinned() !== false}
                icon={ArrowRight}
                onClick={() => moveColumn("right")}
              >
                Move to Right
              </DropdownMenuItem>
            </>
          )}

          {controlsState.showVisibilitySeparator && <DropdownMenuSeparator />}

          {controlsState.canShowVisibilityMenu && (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger icon={Settings2}>
                Columns
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {visibilityColumns.map((col) => (
                    <DropdownMenuCheckboxItem
                      checked={col.isVisible}
                      className="capitalize"
                      key={col.id}
                      onCheckedChange={(value) => col.toggleVisibility(!!value)}
                      onSelect={(event) => event.preventDefault()}
                    >
                      {col.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {controlsState.canShowPinMenu && column.getIsPinned() && headerPin()}
    </div>
  );

  if (controlsState.showHeaderControls) {
    return headerControls();
  }

  if (
    controlsState.showHeaderButton ||
    (props.tableLayout?.columnsResizable && column.getCanResize())
  ) {
    return (
      <div
        className="flex h-full items-center"
        data-component="data-grid-column-header"
      >
        {headerButton()}
      </div>
    );
  }

  return headerLabel();
}

export { DataGridColumnHeader, type DataGridColumnHeaderProps };
