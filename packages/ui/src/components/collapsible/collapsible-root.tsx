"use client";

import { Root as CollapsiblePrimitiveRoot } from "@radix-ui/react-collapsible";
import { useState } from "react";
import { CollapsibleContext } from "./collapsible-context";

/**
 * Collapsible UI component.
 * Import from "@patternmode/ui/components/collapsible".
 * Built on Radix UI primitives for accessible behavior.
 */
export function Collapsible({
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitiveRoot>) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = (open: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(open);
    }
    onOpenChange?.(open);
  };

  return (
    <CollapsibleContext.Provider
      value={{ isOpen, setIsOpen: handleOpenChange }}
    >
      <CollapsiblePrimitiveRoot
        data-component="collapsible"
        data-slot="collapsible"
        onOpenChange={handleOpenChange}
        open={isOpen}
        {...props}
      />
    </CollapsibleContext.Provider>
  );
}
