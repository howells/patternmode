"use client";

import type { ComponentConfig } from "@patternmode/ui/lib/component-config-types";

import { Button } from "@patternmode/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@patternmode/ui/components/dialog";
import { Input } from "@patternmode/ui/components/input";
import { getAllComponents } from "@patternmode/ui/components/registry";
import { Stack } from "@patternmode/ui/components/stack";
import { Text } from "@patternmode/ui/components/text";
import { cx } from "@patternmode/ui/lib/utils";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

type ComponentSearchProps = {
  placeholder?: string;
  onSelectComponent?: (component: ComponentConfig) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ComponentSearch({
  placeholder = "Search",
  onSelectComponent,
  open,
  onOpenChange,
}: ComponentSearchProps) {
  const router = useRouter();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Use controlled state if provided, otherwise use internal state
  const isOpen = open !== undefined ? open : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;

  // Get all components from all categories
  const allComponents = getAllComponents();

  // Filter and group components
  const { filteredComponents, groupedComponents } = useMemo(() => {
    let filtered = allComponents;

    if (searchTerm.trim()) {
      filtered = allComponents.filter(component =>
        component.name.toLowerCase().includes(searchTerm.toLowerCase())
        || component.description.toLowerCase().includes(searchTerm.toLowerCase())
        || component.category.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Group by category
    const grouped = filtered.reduce((acc, component) => {
      const category = component.category.charAt(0).toUpperCase() + component.category.slice(1);
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(component);
      return acc;
    }, {} as Record<string, ComponentConfig[]>);

    return { filteredComponents: filtered, groupedComponents: grouped };
  }, [allComponents, searchTerm]);

  const handleSelect = useCallback((component: ComponentConfig) => {
    if (onSelectComponent) {
      onSelectComponent(component);
    }
    else {
      const url = `/ui/${component.category}/${component.id}`;
      router.push(url);
    }
    setIsOpen(false);
  }, [onSelectComponent, router, setIsOpen]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredComponents.length - 1));
    }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    }
    else if (e.key === "Enter" && filteredComponents[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredComponents[selectedIndex]);
    }
  }, [filteredComponents, selectedIndex, handleSelect]);

  // Reset selection when search changes
  useMemo(() => {
    setSelectedIndex(0);
  }, [searchTerm]);

  return (
    <>
      {/* Only show trigger button in uncontrolled mode */}
      {open === undefined && (
        <Button
          variant="secondary"
          onClick={() => setIsOpen(true)}
          leftIcon={Search}
          textAlign="left"
          kbd={["mod", "K"]}
        >
          {placeholder}
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl flex flex-col">
          <DialogHeader>
            <DialogTitle className="sr-only">Search Components</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col">
            <Input
              placeholder={placeholder}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              prefixIcon={Search}
              autoFocus
              className="mb-4"
            />

            <div className="h-80 overflow-y-auto">
              {filteredComponents.length === 0
                ? (
                    <div className="py-8 text-center">
                      <Text className="text-zinc-500">No components found</Text>
                    </div>
                  )
                : (
                    <div className="space-y-4">
                      {Object.entries(groupedComponents).map(([category, components]) => (
                        <div key={category}>
                          <Text size="sm" className="font-semibold text-zinc-500 mb-2 px-1">
                            {category}
                          </Text>
                          <div className="space-y-1">
                            {components.map((component, _index) => {
                              const globalIndex = filteredComponents.indexOf(component);
                              const isSelected = globalIndex === selectedIndex;

                              return (
                                <button
                                  key={component.id}
                                  className={cx(
                                    "w-full text-left p-3 rounded-md transition-colors",
                                    "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                                    "focus:outline-none focus:bg-zinc-100 dark:focus:bg-zinc-800",
                                    isSelected && "bg-zinc-100 dark:bg-zinc-800",
                                  )}
                                  onClick={() => handleSelect(component)}
                                  onMouseEnter={() => setSelectedIndex(globalIndex)}
                                >
                                  <Stack gap={1}>
                                    <Text className="font-medium">{component.name}</Text>
                                    <Text size="sm" className="text-zinc-600 dark:text-zinc-400">
                                      {component.description}
                                    </Text>
                                  </Stack>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
