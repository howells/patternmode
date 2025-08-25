import type { ComponentConfig } from "@patternmode/config/component-types";
import { List } from "lucide-react";
import { SortableList } from "./component";
import {
  CheckboxOnlyExample,
  DefaultExample,
  FormFieldsExample,
  ReorderOnlyExample,
  SizesExample,
  WithDisabledItemsExample,
} from "./examples";

export const sortableListConfig: ComponentConfig = {
  id: "sortable-list",
  name: "Sortable List",
  description:
    "A list component with drag-and-drop reordering and checkbox selection for managing ordered collections of items.",
  category: "inputs",
  icon: List,
  importStatement: `import { SortableList } from "@patternmode/sortable-list";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Sortable list with checkboxes and drag handles",
      component: DefaultExample,
    },
    {
      id: "reorder-only",
      title: "Reorder Only",
      description: "List with drag-and-drop reordering but no checkboxes",
      component: ReorderOnlyExample,
    },
    {
      id: "checkbox-only",
      title: "Checkbox Only",
      description: "List with checkboxes but no drag-and-drop",
      component: CheckboxOnlyExample,
    },
    {
      id: "disabled-items",
      title: "With Disabled Items",
      description: "List with some items disabled",
      component: WithDisabledItemsExample,
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Different size variants",
      component: SizesExample,
    },
    {
      id: "form-fields",
      title: "Form Fields Example",
      description: "Managing form field visibility and order",
      component: FormFieldsExample,
    },
  ],
  components: [
    {
      name: "SortableList",
      description: "Sortable list with drag-and-drop and checkbox selection",
      component: SortableList,
    },
  ],
};
