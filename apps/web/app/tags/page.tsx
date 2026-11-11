import type { ApiSection } from "@howells/site-ui";

import { TagsDemo } from "@/components/tags-demo";
import { PackageDocs } from "@/components/package-docs";
import { TagsVariants } from "@/components/tags-variants";
import { componentMetadata } from "@/lib/catalogue";

export const metadata = componentMetadata("tags");

const tagsApi: ApiSection[] = [
  {
    description: "Shadcn-compatible badge base with variant and render support.",
    name: "Badge",
    props: [
      {
        defaultValue: '"default"',
        description: "Matches the normal shadcn Badge variant names.",
        name: "variant",
        type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"',
      },
      {
        description: "Renders the badge styles through a provided element (Base UI render prop).",
        name: "render",
        type: "ReactElement | ((props, state) => ReactElement)",
      },
    ],
  },
  {
    description: "Badge extension for selected filters, labels, metadata, and removable tokens.",
    name: "Tag",
    props: [
      {
        defaultValue: '"secondary"',
        description: "Inherited from the Badge base.",
        name: "variant",
        type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"',
      },
      {
        defaultValue: '"base"',
        description: "Controls compact, default, or large sizing.",
        name: "size",
        type: '"sm" | "base" | "lg"',
      },
      {
        description: "Adds an accessible remove button inside the tag.",
        name: "onRemove",
        type: "() => void",
      },
      {
        defaultValue: "false",
        description: "Adds a selected treatment without changing semantics.",
        name: "selected",
        type: "boolean",
      },
    ],
  },
  {
    description:
      "Controlled object-based tag selector with Popover content, ScrollFrame selected tags, creation, keyboard navigation, paste parsing, and Stacksheet-style parts.",
    name: "TagSelector",
    props: [
      {
        description: "The selected items. Selection order follows this array order.",
        name: "value",
        type: "readonly TagItem[]",
      },
      {
        description: "Called with the next selected item objects.",
        name: "onChange",
        type: "(items: TagItem[]) => void",
      },
      {
        description:
          "The consumer-owned option catalog. Selected options stay visible and toggle off by id.",
        name: "options",
        type: "readonly TagItem[]",
      },
      {
        description:
          "Enables creation through the create option, Enter/comma, and paste. The consumer returns the new object.",
        name: "onCreateItem",
        type: "(label: string) => Promise<TagItem> | TagItem",
      },
      {
        description:
          "Renders selected items with any component. Patternmode provides Tag as the convenient default.",
        name: "renderTag",
        type: "(props: TagRenderProps) => ReactNode",
      },
      {
        description: "Renders command options while preserving provided props.",
        name: "renderOption",
        type: "(props: TagOptionRenderProps) => ReactNode",
      },
      {
        defaultValue: '"No tags found."',
        description: "Empty command-list state when no option can be shown.",
        name: "emptyMessage",
        type: "ReactNode",
      },
    ],
  },
  {
    description:
      "Composable selector parts for Stacksheet-style layouts: Root, Trigger, Content, Search, List, Option, and Empty.",
    name: "TagSelector parts",
    props: [
      {
        description: "Owns state wiring, filtering, creation, serialization, and Popover context.",
        name: "TagSelector.Root",
        type: "TagSelectorRootProps",
      },
      {
        description: "Renders selected tags in a horizontal ScrollFrame by default.",
        name: "TagSelector.Trigger",
        type: "TagSelectorTriggerProps",
      },
      {
        description: "Popover-backed command surface.",
        name: "TagSelector.Content",
        type: "TagSelectorContentProps",
      },
      {
        description: "Search input, option list, explicit option renderer, and empty state.",
        name: "TagSelector.Search | List | Option | Empty",
        type: "component parts",
      },
    ],
  },
];

const tagsExample = `import { TagSelector } from "@patternmode/tags";
import type { TagItem } from "@patternmode/tags";
import "@patternmode/tags/styles.css";

const options: TagItem[] = [
  { id: "accessible", label: "Accessible" },
  { id: "keyboard", label: "Keyboard first" },
];

export function Example() {
  const [value, setValue] = useState<TagItem[]>([]);
  return (
    <TagSelector
      aria-label="Project tags"
      onChange={setValue}
      options={options}
      placeholder="Select tags"
      value={value}
    />
  );
}`;

export default function TagsPage() {
  return (
    <PackageDocs
      api={tagsApi}
      caption="Open the list, type to filter, then press Enter or a comma to add a tag."
      demo={<TagsDemo />}
      example={tagsExample}
      installLead="Controlled. Pass onCreateItem to let people add tags that aren't in the list."
      slug="tags"
      variants={<TagsVariants />}
    />
  );
}
