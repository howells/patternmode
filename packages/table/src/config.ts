import type { ComponentConfig } from "@patternmode/config/component-types";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./component";
import { BasicTableExample } from "./examples";

export const tableConfig: ComponentConfig = {
  id: "table",
  name: "Table",
  description: "Semantic table with styled elements.",
  category: "data",
  featured: true,
  icon: undefined,
  importStatement: `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption, TableFooter } from "@patternmode/table";`,
  examples: [
    { id: "basic", title: "Basic", description: "Basic table example", component: BasicTableExample },
  ],
  components: [
    { name: "Table", description: "Table root", component: Table },
    { name: "TableHeader", description: "Table header", component: TableHeader },
    { name: "TableBody", description: "Table body", component: TableBody },
    { name: "TableRow", description: "Table row", component: TableRow },
    { name: "TableHead", description: "Header cell", component: TableHead },
    { name: "TableCell", description: "Body cell", component: TableCell },
    { name: "TableCaption", description: "Table caption", component: TableCaption },
    { name: "TableFooter", description: "Table footer", component: TableFooter },
  ],
};
