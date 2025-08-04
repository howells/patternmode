import type { ComponentConfig } from "../../lib/component-config-types";
import { Table } from "lucide-react";
import {
  TableBody,
  TableCaption,
  TableCell,
  Table as TableComponent,
  TableFoot,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "./component";
import {
  DefaultExample,
  InteractiveExample,
  NumericDataExample,
  WithCaptionExample,
  WithFooterExample,
} from "./examples";

export const tableConfig: ComponentConfig = {
  id: "table",
  name: "Table",
  description: "Comprehensive table components for displaying tabular data with professional styling and responsive behavior.",
  category: "display",
  featured: true,
  icon: Table,
  importStatement: `import { Table, TableRoot, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, TableFoot, TableCaption } from "@patternmode/ui/table";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic table with header and data rows",
      component: DefaultExample,
    },
    {
      id: "with-caption",
      title: "With Caption",
      description: "Table with accessibility caption",
      component: WithCaptionExample,
    },
    {
      id: "with-footer",
      title: "With Footer",
      description: "Table with footer summary row",
      component: WithFooterExample,
    },
    {
      id: "interactive",
      title: "Interactive",
      description: "Table with hover states and interactive elements",
      component: InteractiveExample,
    },
    {
      id: "numeric-data",
      title: "Numeric Data",
      description: "Table optimized for numeric data display",
      component: NumericDataExample,
    },
  ],
  components: [
    {
      name: "TableRoot",
      description: "Root container with responsive horizontal scrolling",
      component: TableRoot,
    },
    {
      name: "Table",
      description: "Main table element with professional styling",
      component: TableComponent,
      primary: true,
    },
    {
      name: "TableHead",
      description: "Table header section container",
      component: TableHead,
    },
    {
      name: "TableHeaderCell",
      description: "Header cell for table columns",
      component: TableHeaderCell,
    },
    {
      name: "TableBody",
      description: "Table body section with row dividers",
      component: TableBody,
    },
    {
      name: "TableRow",
      description: "Table row container with consistent padding",
      component: TableRow,
    },
    {
      name: "TableCell",
      description: "Individual data cell with muted styling",
      component: TableCell,
    },
    {
      name: "TableFoot",
      description: "Table footer section for summary rows",
      component: TableFoot,
    },
    {
      name: "TableCaption",
      description: "Table caption for accessibility and context",
      component: TableCaption,
    },
  ],
};
