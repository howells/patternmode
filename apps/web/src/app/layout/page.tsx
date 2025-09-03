"use client";

export const dynamic = "force-dynamic";

import { Button } from "@patternmode/button";
import { Card } from "@patternmode/card";
import type { Size } from "@patternmode/constants/sizes";
import { sizes } from "@patternmode/constants/sizes";
import { Input } from "@patternmode/input";
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "@patternmode/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@patternmode/select";
import type { SortableListItem } from "@patternmode/sortable-list";
import { SortableList } from "@patternmode/sortable-list";
import { Stack } from "@patternmode/stack";
import { ToggleGroup, ToggleGroupItem } from "@patternmode/toggle-group";
import { Toolbar, ToolbarGroup, ToolbarSeparator } from "@patternmode/toolbar";
import { MoreHorizontal, Plus, Rows3, Settings2, Trash2 } from "lucide-react";
import { parseAsJson, useQueryState } from "nuqs";
import type React from "react";
import { Suspense, useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import type { GapValue } from "@/lib/spacing-utils";
import type { ComponentId } from "@/registry/components";
import { COMPONENT_REGISTRY, PREVIEW_REGISTRY } from "@/registry/components";

// Layout configuration type
type LayoutConfig = {
  id: string;
  direction: "vertical" | "horizontal";
  size: Size;
  gap: GapValue;
  components: string[]; // Array of component IDs
};

// Create component items for SortableList
function createComponentItems(
  selectedComponents: string[],
  allComponents: ComponentId[]
): SortableListItem[] {
  // Create a map of selected components for quick lookup
  const selectedSet = new Set(selectedComponents);

  // Create items for all components
  return allComponents.map((id) => {
    const config = COMPONENT_REGISTRY[id];
    return {
      id,
      label: config.name,
      active: selectedSet.has(id),
    };
  });
}

// Gap options for the Stack component
const gapOptions: GapValue[] = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24];

// Component that renders a single layout
function LayoutSection({
  layout,
  onUpdate,
  onDelete,
}: {
  layout: LayoutConfig;
  onUpdate: (layout: LayoutConfig) => void;
  onDelete: () => void;
}) {
  const [componentsPopoverOpen, setComponentsPopoverOpen] = useState(false);
  const [componentSearch, setComponentSearch] = useState("");

  // Get all available component IDs
  const allComponentIds = useMemo(
    () => Object.keys(COMPONENT_REGISTRY) as ComponentId[],
    []
  );

  // Filter components based on search
  const filteredComponentIds = useMemo(() => {
    if (!componentSearch) {
      return allComponentIds;
    }
    const searchLower = componentSearch.toLowerCase();
    return allComponentIds.filter((id) => {
      const config = COMPONENT_REGISTRY[id];
      return config.name.toLowerCase().includes(searchLower);
    });
  }, [allComponentIds, componentSearch]);

  // Create sortable items for component selection
  const componentItems = useMemo(
    () => createComponentItems(layout.components, filteredComponentIds),
    [layout.components, filteredComponentIds]
  );

  // Handle component selection changes
  const handleComponentsChange = (items: SortableListItem[]) => {
    const activeComponents = items
      .filter((item) => item.active)
      .map((item) => item.id);
    onUpdate({ ...layout, components: activeComponents });
  };

  // Render selected components
  const renderedComponents = useMemo(() => {
    return layout.components.map((componentId) => {
      const PreviewComponent = PREVIEW_REGISTRY[componentId as ComponentId];
      if (!PreviewComponent) {
        return null;
      }

      // List of void elements that cannot have children
      const voidElements = new Set([
        "input",
        "img",
        "br",
        "hr",
        "area",
        "base",
        "col",
        "embed",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr",
      ]);

      // Check if the component is a void element
      const isVoidElement = voidElements.has(componentId.toLowerCase());

      // Pass size prop if the component supports it
      // Note: Not all components support size, so we pass it unconditionally
      // Components that don't support it will ignore it
      // We use Record<string, unknown> to bypass TypeScript's strict prop checking since
      // preview components handle their own defaults
      const props: Record<string, unknown> = {
        size: layout.size,
      };

      // Do not inject generic children into previews; each preview sets its own content.

      // Cast to a more flexible component type to handle different prop shapes
      const Component = PreviewComponent as React.ComponentType<
        Record<string, unknown>
      >;
      return (
        <div className="min-w-0" key={componentId}>
          <Component {...props} />
        </div>
      );
    });
  }, [layout.components, layout.size]);

  return (
    <Card className="p-6">
      {/* Layout Controls Toolbar */}
      <Toolbar className="mb-4" size="sm">
        <ToolbarGroup>
          {/* Direction Toggle */}
          <ToggleGroup
            onValueChange={(value) => {
              if (value.length > 0) {
                onUpdate({
                  ...layout,
                  direction: value[0] as "vertical" | "horizontal",
                });
              }
            }}
            size="sm"
            value={[layout.direction]}
          >
            <ToggleGroupItem leftIcon={MoreHorizontal} value="horizontal">
              Horizontal
            </ToggleGroupItem>
            <ToggleGroupItem leftIcon={Rows3} value="vertical">
              Vertical
            </ToggleGroupItem>
          </ToggleGroup>
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          {/* Size Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Size:
            </span>
            <Select
              onValueChange={(value) => {
                if (typeof value === "string") {
                  onUpdate({ ...layout, size: value as Size });
                }
              }}
              value={layout.size}
            >
              <SelectTrigger className="w-24" size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(sizes).map((size) => (
                  <SelectItem key={size} value={size}>
                    {size.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          {/* Gap Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Gap:
            </span>
            <Select
              onValueChange={(value) => {
                if (typeof value === "string") {
                  onUpdate({
                    ...layout,
                    gap: Number.parseInt(value) as GapValue,
                  });
                }
              }}
              value={layout.gap.toString()}
            >
              <SelectTrigger className="w-20" size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {gapOptions.map((gap) => (
                  <SelectItem key={gap} value={gap.toString()}>
                    {gap}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          {/* Component Selector */}
          <Popover
            onOpenChange={setComponentsPopoverOpen}
            open={componentsPopoverOpen}
          >
            <PopoverTrigger className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 px-2.5 py-1.5 text-sm transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
              <Settings2 className="h-4 w-4" />
              Components ({layout.components.length})
            </PopoverTrigger>
            <PopoverPortal>
              <PopoverContent className="w-96 p-4">
                <div className="mb-3">
                  <h3 className="font-medium text-sm">Select Components</h3>
                  <p className="mt-1 text-xs text-zinc-500">
                    Choose and order components for this layout
                  </p>
                  <Input
                    className="mt-2"
                    onChange={(e) => setComponentSearch(e.target.value)}
                    placeholder="Search components..."
                    value={componentSearch}
                  />
                </div>
                <div className="max-h-96 overflow-y-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
                  <SortableList
                    items={componentItems}
                    onChange={handleComponentsChange}
                    size="sm"
                  />
                </div>
                <div className="mt-3 flex justify-end">
                  <Button
                    onClick={() => setComponentsPopoverOpen(false)}
                    size="sm"
                  >
                    Done
                  </Button>
                </div>
              </PopoverContent>
            </PopoverPortal>
          </Popover>
        </ToolbarGroup>

        <div className="ml-auto">
          {/* Delete Button */}
          <Button
            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            leftIcon={Trash2}
            onClick={onDelete}
            size="sm"
            variant="ghost"
          >
            Delete
          </Button>
        </div>
      </Toolbar>

      {/* Component Stack */}
      <div className="min-h-[200px] rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
        {renderedComponents.length > 0 ? (
          <Stack
            align={layout.direction === "horizontal" ? "center" : "start"}
            direction={layout.direction}
            gap={layout.gap}
            wrap
          >
            {renderedComponents}
          </Stack>
        ) : (
          <div className="flex h-[200px] items-center justify-center text-zinc-400">
            <p className="text-sm">
              No components selected. Click "Components" to add some.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

// Main Layout Builder Page
export default function LayoutBuilderPage() {
  // Store layouts array in URL
  const [layouts, setLayouts] = useQueryState(
    "layouts",
    parseAsJson<LayoutConfig[]>((value) => value as LayoutConfig[]).withDefault(
      [
        {
          id: "1",
          direction: "horizontal",
          size: "base",
          gap: 4,
          components: ["button", "input", "select"],
        },
      ]
    )
  );

  // Add a new layout
  const addLayout = () => {
    const newLayout: LayoutConfig = {
      id: Date.now().toString(),
      direction: "horizontal",
      size: "base",
      gap: 4,
      components: [],
    };
    setLayouts([...layouts, newLayout]);
  };

  // Update a specific layout
  const updateLayout = (updatedLayout: LayoutConfig) => {
    setLayouts(
      layouts.map((layout) =>
        layout.id === updatedLayout.id ? updatedLayout : layout
      )
    );
  };

  // Delete a layout
  const deleteLayout = (layoutId: string) => {
    setLayouts(layouts.filter((layout) => layout.id !== layoutId));
  };

  return (
    <Suspense fallback={null}>
      <div className="bg-zinc-50">
        <PageHeader
          description="Create and configure multiple component layouts with Stack. Experiment with direction, spacing, and component selection."
          title="Layout Builder"
        />

        <div className="p-8">
          {/* Add Layout Button */}
          <div className="mb-6">
            <Button leftIcon={Plus} onClick={addLayout} variant="primary">
              Add Layout
            </Button>
          </div>

          {/* Layout Sections */}
          <Stack gap={6}>
            {layouts.map((layout) => (
              <LayoutSection
                key={layout.id}
                layout={layout}
                onDelete={() => deleteLayout(layout.id)}
                onUpdate={updateLayout}
              />
            ))}
          </Stack>

          {/* Empty State */}
          {layouts.length === 0 && (
            <Card className="p-12 text-center">
              <p className="mb-4 text-zinc-500">
                No layouts yet. Click "Add Layout" to get started.
              </p>
            </Card>
          )}
        </div>
      </div>
    </Suspense>
  );
}
