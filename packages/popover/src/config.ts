import type { ComponentConfig } from "@patternmode/config/component-types";
import { MessageSquare } from "lucide-react";
import {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBackdrop,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverPortal,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from "./component";
import { DefaultExample, WithArrowExample, WithBackdropExample } from "./examples";

export const popoverConfig: ComponentConfig = {
  id: "popover",
  name: "Popover",
  description:
    "A comprehensive popover system built on Base UI Popover for creating contextual overlays, tooltips, and dropdown content. Features smart positioning, collision detection, and smooth animations.",
  category: "overlay",
  featured: true,
  icon: MessageSquare,
  importStatement:
    `import { Popover, PopoverTrigger, PopoverContent, PopoverTitle, PopoverDescription, PopoverClose, PopoverArrow, PopoverBackdrop, PopoverPortal, PopoverPositioner } from "@patternmode/ui/popover";`,
  examples: [
    { id: "default", title: "Default", description: "Basic popover with title and description", component: DefaultExample },
    { id: "with-arrow", title: "With Arrow", description: "Popover with arrow pointing to trigger", component: WithArrowExample },
    { id: "with-backdrop", title: "With Backdrop", description: "Modal-like popover with backdrop overlay", component: WithBackdropExample },
  ],
  components: [
    { name: "Popover", description: "Root container for popover state management.", component: Popover, primary: true },
    { name: "Popover Trigger", description: "Interactive element that opens the popover.", component: PopoverTrigger },
    { name: "Popover Content", description: "Main content container with positioning.", component: PopoverContent },
    { name: "Popover Title", description: "Heading component for popover content.", component: PopoverTitle },
    { name: "Popover Description", description: "Description text with muted styling.", component: PopoverDescription },
    { name: "Popover Close", description: "Button to dismiss the popover.", component: PopoverClose },
    { name: "Popover Arrow", description: "Visual arrow pointing to trigger.", component: PopoverArrow },
    { name: "Popover Backdrop", description: "Optional backdrop for modal behavior.", component: PopoverBackdrop },
    { name: "Popover Portal", description: "Portal for rendering outside DOM tree.", component: PopoverPortal },
    { name: "Popover Positioner", description: "Smart positioning with collision detection.", component: PopoverPositioner },
    { name: "Popover Anchor", description: "Legacy alias for PopoverTrigger.", component: PopoverAnchor },
  ],
};
