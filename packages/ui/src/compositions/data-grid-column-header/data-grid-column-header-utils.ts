interface HeaderControlsStateOptions {
  canPin: boolean;
  canSort: boolean;
  columnsMovable: boolean;
  columnsPinnable: boolean;
  columnsVisibility: boolean;
  hasFilter: boolean;
  visibility: boolean;
}

interface HeaderControlsState {
  canShowPinMenu: boolean;
  canShowVisibilityMenu: boolean;
  showControlsSeparator: boolean;
  showFilterSeparator: boolean;
  showHeaderButton: boolean;
  showHeaderControls: boolean;
  showMoveMenu: boolean;
  showVisibilitySeparator: boolean;
}

interface VisibilityColumnOption {
  id: string;
  isVisible: boolean;
  label: string;
  toggleVisibility: (visible: boolean) => void;
}

interface VisibilityColumnDefinition {
  accessorFn?: unknown;
  columnDef: {
    meta?: {
      headerTitle?: string;
    };
  };
  getCanHide: () => boolean;
  getIsVisible: () => boolean;
  id: string;
  toggleVisibility: (visible: boolean) => void;
}

function canMoveColumn(
  columnId: string,
  columnOrder: string[],
  direction: "left" | "right",
): boolean {
  const currentIndex = columnOrder.indexOf(columnId);

  if (direction === "left") {
    return currentIndex > 0;
  }

  return currentIndex > -1 && currentIndex < columnOrder.length - 1;
}

function moveColumnOrder(
  columnId: string,
  columnOrder: string[],
  direction: "left" | "right",
): string[] {
  const currentIndex = columnOrder.indexOf(columnId);
  const targetIndex =
    direction === "left" ? currentIndex - 1 : currentIndex + 1;

  if (
    currentIndex < 0 ||
    targetIndex < 0 ||
    targetIndex >= columnOrder.length
  ) {
    return columnOrder;
  }

  const nextOrder = [...columnOrder];
  const [movedColumn] = nextOrder.splice(currentIndex, 1);
  if (!movedColumn) {
    return columnOrder;
  }

  nextOrder.splice(targetIndex, 0, movedColumn);
  return nextOrder;
}

function getHeaderControlsState(
  options: HeaderControlsStateOptions,
): HeaderControlsState {
  const {
    canPin,
    canSort,
    columnsMovable,
    columnsPinnable,
    columnsVisibility,
    hasFilter,
    visibility,
  } = options;
  const canShowPinMenu = columnsPinnable && canPin;
  const canShowVisibilityMenu = columnsVisibility && visibility;
  const showMoveMenu = columnsMovable;
  const hasInteractiveControls =
    canSort || canShowPinMenu || canShowVisibilityMenu;

  return {
    canShowPinMenu,
    canShowVisibilityMenu,
    showControlsSeparator: (hasFilter || canSort) && hasInteractiveControls,
    showFilterSeparator: hasFilter && hasInteractiveControls,
    showHeaderButton:
      canSort ||
      (canShowPinMenu && !columnsMovable) ||
      hasFilter ||
      canShowVisibilityMenu,
    showHeaderControls:
      columnsMovable || canShowVisibilityMenu || canShowPinMenu || hasFilter,
    showMoveMenu,
    showVisibilitySeparator:
      canShowVisibilityMenu && (canSort || canPin || hasFilter),
  };
}

function getVisibilityColumnOptions(
  columns: VisibilityColumnDefinition[],
): VisibilityColumnOption[] {
  return columns
    .filter(
      (column) =>
        typeof column.accessorFn !== "undefined" && column.getCanHide(),
    )
    .map((column) => ({
      id: column.id,
      isVisible: column.getIsVisible(),
      label: String(column.columnDef.meta?.headerTitle ?? column.id),
      toggleVisibility: (visible: boolean) => {
        column.toggleVisibility(visible);
      },
    }));
}

export {
  canMoveColumn,
  getHeaderControlsState,
  getVisibilityColumnOptions,
  type HeaderControlsState,
  type HeaderControlsStateOptions,
  moveColumnOrder,
  type VisibilityColumnDefinition,
  type VisibilityColumnOption,
};
