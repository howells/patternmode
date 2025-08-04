"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { ComponentConfig, SearchFieldItem } from "@patternmode/ui";

import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  SearchField,
  Stack,
  Subheading,
  Text,
} from "@patternmode/ui";
import { getAllComponents } from "@patternmode/ui/components/registry";

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

  // Use controlled state if provided, otherwise use internal state
  const isOpen = open !== undefined ? open : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;

  // Get all components from all categories
  const allComponents = getAllComponents();

  // Convert components to SearchFieldItem format
  const searchItems: SearchFieldItem[] = allComponents.map(component => ({
    id: component.id,
    label: component.name,
    description: component.description,
    category: component.category,
    badge: component.badge || component.category.charAt(0).toUpperCase() + component.category.slice(1),
    data: component, // Store the full component data
  }));

  const handleSelect = (item: SearchFieldItem) => {
    const component = item.data as ComponentConfig;
    if (onSelectComponent) {
      onSelectComponent(component);
      setIsOpen(false);
    }
    else {
      const url = `/ui/${component.category}/${component.id}`;
      router.push(url);
      setIsOpen(false);
    }
  };

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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="sr-only">Search Components</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <SearchField
              placeholder={placeholder}
              value={searchTerm}
              onValueChange={setSearchTerm}
              items={searchItems}
              onItemSelect={handleSelect}
              groupByCategory={true}
              autoFocus
              className="w-full"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
