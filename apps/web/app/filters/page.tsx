import type { FilterKind } from "@patternmode/filters/state";

import type { ApiSection } from "@/components/docs-blocks";
import type { ReferenceRow } from "@/lib/catalogue";
import { FiltersDemo } from "@/components/filters-demo";
import { ReferenceRows } from "@/components/docs-blocks";
import { PackageDocs } from "@/components/package-docs";
import { filterOperators, operatorLabels } from "@patternmode/filters/state";
import { componentMetadata } from "@/lib/catalogue";

export const metadata = componentMetadata("filters");

const filtersApi: ApiSection[] = [
  {
    description: "The one-row bar above a list or grid.",
    name: "FilterToolbar & ToolbarControl",
    props: [
      {
        description: "SearchField, FilterChips and AddFilter on the left.",
        name: "children",
        type: "ReactNode",
      },
      {
        description: "Counts, Sort, Columns and ToolbarPages at the right end.",
        name: "end",
        type: "ReactNode",
      },
    ],
  },
  {
    description: "Sentence-reading filter chip with an operator/value popover editor.",
    name: "FilterChip & RuleEditor",
    props: [
      { description: "Field label: e.g. Status or Price.", name: "field", type: "string" },
      {
        description: "Human-readable operator: e.g. is any of, is between.",
        name: "operator",
        type: "string",
      },
      {
        description: "Formatted value summary shown inside the chip.",
        name: "value",
        type: "ReactNode",
      },
      {
        description:
          "Typed rule schema and evaluator for text, number, range, option and presence.",
        name: "matchesRule",
        type: "(cell: Cell, rule: FilterRule) => boolean",
      },
    ],
  },
  {
    description: "Debounced search input and searchable field picker with keyboard shortcuts.",
    name: "SearchField & AddFilter",
    props: [
      {
        defaultValue: "250",
        description: "Debounce delay in milliseconds; Enter commits immediately.",
        name: "delayMs",
        type: "number",
      },
      {
        defaultValue: "true",
        description: "Registers global / (search) and F (filter) shortcuts.",
        name: "shortcut",
        type: "boolean",
      },
    ],
  },
];

const kindNames: Record<FilterKind, string> = {
  boolean: "Yes or no",
  date: "Date",
  number: "Number",
  option: "Options",
  text: "Text",
};

/** Each kind of field beside the operators its rules offer, read from the package. */
const filterRules: ReferenceRow[] = (["text", "number", "date", "option", "boolean"] as const).map(
  (kind) => ({
    description: [
      ...new Set(filterOperators[kind].map((operator) => operatorLabels[operator])),
    ].join(", "),
    name: kindNames[kind],
  }),
);

const filtersExample = `import {
  AddFilter,
  FilterChip,
  FilterToolbar,
  RuleEditor,
  SearchField,
  operatorLabels,
  ruleSummary,
} from "@patternmode/filters";
import "@patternmode/filters/styles.css";`;

export default function FiltersPage() {
  return (
    <PackageDocs
      api={filtersApi}
      caption="Click the Status chip to edit its operator and options, press F to add a Price or Item filter, or press / to search."
      demo={<FiltersDemo />}
      example={filtersExample}
      installLead="Use standalone for any list, or let @patternmode/datagrid wire it up automatically."
      slug="filters"
      variants={
        <ReferenceRows
          id="rules-title"
          lead="A field filters as one kind, which decides what its rules can say."
          rows={filterRules}
          title="Rules"
        />
      }
    />
  );
}
