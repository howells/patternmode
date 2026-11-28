import type { ApiSection } from "@/components/docs-blocks";
import type { ReferenceRow } from "@/lib/catalogue";
import { DataGridDemo } from "@/components/datagrid-demo";
import { ReferenceRows } from "@/components/docs-blocks";
import { PackageDocs } from "@/components/package-docs";
import { componentMetadata } from "@/lib/catalogue";

export const metadata = componentMetadata("datagrid");

const datagridApi: ApiSection[] = [
  {
    description:
      "Kitchen-sink table with search, typed filter rules, multi-sort, pinning and URL sync.",
    name: "DataGrid",
    props: [
      {
        description:
          "Rows to render. Sorting, filtering, tree expansion and paging run client-side.",
        name: "data",
        type: "readonly TData[]",
      },
      {
        description: "TanStack Table v9 column definitions typed with DataGridColumnMeta.",
        name: "columns",
        type: "DataGridColumnDef<TData>[]",
      },
      {
        defaultValue: '"full"',
        description: 'Use "inline" inside a card or bordered frame; "full" owns its page chrome.',
        name: "layout",
        type: '"full" | "inline"',
      },
      {
        defaultValue: "false",
        description:
          "Keeps search, filter rules, sorts, columns and page synced in the browser URL.",
        name: "urlState",
        type: "boolean",
      },
      {
        description: "Custom URL adapter (for nuqs or framework routers) overriding urlState.",
        name: "address",
        type: "GridAddress",
      },
      {
        description:
          "Returns child rows for foldable trees; pair with sectionOf for full-width section headings.",
        name: "getSubRows / sectionOf",
        type: "(row: TData) => readonly TData[] | undefined",
      },
      {
        description:
          "Stable record ID accessor; recommended for row selection, foldable trees, and async updates.",
        name: "getRowId",
        type: "(row: TData, index: number) => string",
      },
      {
        defaultValue: "false",
        description:
          "Opt-in pinned checkbox column, Shift+Click range select, and bulk action bar.",
        name: "selectable / selectionActions",
        type: "boolean / (ctx) => ReactNode",
      },
      {
        defaultValue: "false",
        description: "Opt-in interactive column resizing (drag, double-click reset, arrow keys).",
        name: "resizable",
        type: "boolean",
      },
      {
        defaultValue: '"auto"',
        description:
          'Row virtualisation via @tanstack/react-virtual ("auto" activates above 100 rendered rows).',
        name: "virtualize",
        type: 'boolean | "auto"',
      },
      {
        defaultValue: "false",
        description:
          "Server / manual mode with rowCount, onQueryChange, loading skeletons, fetching bar, and error/retry.",
        name: "manual / rowCount / onQueryChange",
        type: "boolean / number / (query) => void",
      },
      {
        description:
          "Turns each row into an accessible native <a> link without hijacking cell controls.",
        name: "getRowHref",
        type: "(row: TData) => string | null | undefined",
      },
    ],
  },
  {
    description: "Per-column metadata declared under column.meta.",
    name: "DataGridColumnMeta",
    props: [
      {
        description:
          "Text, number, date, or boolean inferred automatically; explicit option picker; or false to disable.",
        name: "filter",
        type: "DataGridFilter | false",
      },
      {
        description:
          "Pins the column to the start or end edge with a scroll shadow; pinned columns stay visible.",
        name: "pinned",
        type: '"left" | "right" | "start" | "end"',
      },
      {
        description: "Right-aligns headers, cells and footers with tabular figures.",
        name: "align",
        type: '"left" | "right"',
      },
      {
        description:
          "Fixed or minimum CSS widths; setting width on every column enables fixed table layout.",
        name: "width / minWidth",
        type: "string",
      },
      {
        description:
          "Starts hidden on narrow phones while remaining toggleable in the Columns picker.",
        name: "hideOnPhone",
        type: "boolean",
      },
    ],
  },
];

/** What the grid does, each with the prop that turns it on when it is off by default. */
const datagridFeatures: ReferenceRow[] = [
  { description: "Matches every column. Press / to jump to it.", name: "Search" },
  {
    description:
      "Each column filters by a rule that fits its data: text, number, date, yes or no, or a set of options. Press F to add one.",
    name: "Filters",
  },
  {
    description: "Click a header to sort by it. Sort adds more, and dragging sets their order.",
    name: "Sort",
  },
  {
    description: (
      <>
        Hide and reorder from Columns or a header&rsquo;s menu. Pin with <code>meta.pinned</code>,
        resize with <code>resizable</code>.
      </>
    ),
    name: "Columns",
  },
  {
    description: (
      <>
        <code>getSubRows</code> folds rows into groups; <code>sectionOf</code> heads each group with
        a full-width row.
      </>
    ),
    name: "Sections",
  },
  {
    description: (
      <>
        <code>selectable</code> adds checkboxes, Shift-click ranges and a bar for{" "}
        <code>selectionActions</code>.
      </>
    ),
    name: "Selection",
  },
  {
    description: (
      <>
        <code>getRowHref</code> makes each row a real link that opens in a new tab like any other.
      </>
    ),
    name: "Row links",
  },
  {
    description: (
      <>
        <code>urlState</code> keeps search, filters, sorts, columns and page in the address, so a
        view can be shared or bookmarked.
      </>
    ),
    name: "Address",
  },
  {
    description: "Past 100 rows, only the rows on screen are drawn.",
    name: "Long tables",
  },
  {
    description: (
      <>
        <code>manual</code> hands search, filters, sorting and paging to your server through{" "}
        <code>onQueryChange</code>, with loading and retry states.
      </>
    ),
    name: "Server data",
  },
  {
    description: (
      <>
        <code>useDataGrid</code> with <code>DataGridToolbar</code>, <code>DataGridTable</code> and{" "}
        <code>DataGridPaging</code> lays the parts out your own way.
      </>
    ),
    name: "Own layout",
  },
];

const datagridExample = `import { DataGrid, DataGridCellText } from "@patternmode/datagrid";
import type { DataGridColumnDef } from "@patternmode/datagrid";
import "@patternmode/filters/styles.css";
import "@patternmode/datagrid/styles.css";

interface Row {
  id: string;
  name: string;
  status: "ready" | "draft";
  price: number;
}

const columns: DataGridColumnDef<Row>[] = [
  { accessorKey: "name", header: "Item", meta: { pinned: "left", width: "200px" } },
  {
    accessorKey: "status",
    header: "Status",
    meta: {
      filter: {
        kind: "option",
        options: [
          { value: "ready", label: "Spec ready", tone: "positive" },
          { value: "draft", label: "Draft", tone: "warning" },
        ],
      },
    },
  },
  { accessorKey: "price", header: "Price", meta: { align: "right" } },
];

export function Example({ rows }: { rows: Row[] }) {
  return <DataGrid columns={columns} data={rows} urlState />;
}`;

export default function DataGridPage() {
  return (
    <PackageDocs
      api={datagridApi}
      caption="Press / to search, F to filter, click any column header for its menu, or drag columns and sorts to reorder."
      demo={<DataGridDemo />}
      example={datagridExample}
      installLead="Built on TanStack Table v9 and @patternmode/filters. Every column filters by a typed rule without wiring a form."
      slug="datagrid"
      variants={<ReferenceRows id="features-title" rows={datagridFeatures} title="Features" />}
    />
  );
}
